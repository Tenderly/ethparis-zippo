package main

import "encoding/json"

type InitialMessage struct {
	Type string          `json:"type"`
	Ok   bool            `json:"ok"`
	Data json.RawMessage `json:"data"`
}

func NewInitialMessage(ok bool, data ...json.RawMessage) InitialMessage {
	return InitialMessage{
		Type: "initial_message",
		Ok: ok,
		Data: data[0],
	}
}

type NewVersion struct {
	Type string          `json:"type"`
	Data json.RawMessage `json:"data"`
}

func NewNewVersion(data json.RawMessage) NewVersion {
	return NewVersion{
		Type: "new_version",
		Data: data,
	}
}

type CompileFailed struct {
	Type string `json:"type"`
	Err  string `json:"err"`
}

func NewCompileFailed(err error) CompileFailed {
	return CompileFailed{
		Type: "compile_failed",
		Err: err.Error(),
	}
}

type ServerError struct {
	Type string `json:"type"`
	Err  string `json:"err"`
}

func NewServerError(err error) ServerError {
	return ServerError{
		Type: "server_error",
		Err: err.Error(),
	}
}