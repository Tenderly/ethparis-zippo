package main

import "encoding/json"

type InitialMessage struct {
	Ok bool `json:"ok"`
	Data json.RawMessage `json:"data"`
}