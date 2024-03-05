package model

type User struct {
	Id       int8   `db:"id"        json:"id"`
	EngineId int8   `db:"engine_id" json:"engineId"`
	Name     string `db:"name"      json:"name"`
	Password string `db:"password"  json:"password"`
	IsSA     bool   `db:"is_sa"     json:"isSA"`
}
