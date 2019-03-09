package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/gorilla/websocket"
	"github.com/tenderly/solidity-hmr/truffle"
	"log"
	"net/http"
	"path/filepath"
)

var (
	newline = []byte{'\n'}
	space   = []byte{' '}
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type Server struct {
	// The websocket connection.
	conn *websocket.Conn

	// Buffered channel of outbound messages.
	send chan []byte
}

var server *Server

func serveWs(w http.ResponseWriter, r *http.Request) {
	// Upgrade this HTTP connection to a WS connection:
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
	}

	// And register a client for this connection with the uptimeServer:
	server = &Server{
		conn:  conn,
		send:  make(chan []byte, 256),
	}

	// Allow collection of memory referenced by the caller by doing all work in goroutines
	go server.writePump()
	go server.readPump()

	contracts, err := truffle.GetTruffleContracts(filepath.Join(config.ProjectDirectory, config.BuildDirectory), "1337")
	if err != nil {
		panic(fmt.Sprintf("unable to fetch contracts from build directory: %s", err))
	}

	if err != nil {
		data, _ := json.Marshal(InitialMessage{
			Ok: false,
		})

		server.send <- data
	} else {
		contractsJson, _ := json.Marshal(contracts)

		data, _ := json.Marshal(InitialMessage{
			Ok: true,
			Data: contractsJson,
		})

		server.send <- data
	}
}

// readPump pumps messages from the websocket connection to the hub.
//
// The application runs readPump in assets per-connection goroutine. The application
// ensures that there is at most one reader on assets connection by executing all
// reads from this goroutine.
func (s *Server) readPump() {
	defer func() {
		s.conn.Close()
	}()
	for {
		_, message, err := s.conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error: %v", err)
			}
			break
		}
		message = bytes.TrimSpace(bytes.Replace(message, newline, space, -1))
	}
}

// writePump pumps messages from the hub to the websocket connection.
//
// A goroutine running writePump is started for each connection. The
// application ensures that there is at most one writer to assets connection by
// executing all writes from this goroutine.
func (s *Server) writePump() {
	defer func() {
		s.conn.Close()
	}()
	for {
		select {
		case message := <-s.send:
			s.conn.WriteMessage(websocket.TextMessage, message)
		}
	}
}

