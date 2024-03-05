package model

type Engine struct {
	Id     int8    `db:"id"     json:"id"`
	Server string  `db:"server" json:"server"`
	Users  []*User `            json:"users"`
	Port   int     `db:"port"   json:"port"`
	// IsConnected bool    `db:"is_connected" json:"isConnected"`
}
