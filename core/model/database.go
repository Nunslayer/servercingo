package model

type KeyValue struct {
    Key   string `json:"key"`
    Value interface{} `json:"value"`
}

type Table struct{}
type Database struct {
	Id        int8     `db:"id"         json:"id"`
	EngineId  int8     `db:"engine_id"  json:"engineId"`
	Name      string   `db:"name"       json:"name"`
	IsDefault bool     `db:"is_default" json:"isDefault"`
	DataOpt   string   `db:"data_opt"   json:"dataOpt"`
	LogOpt    string   `db:"log_opt"    json:"logOpt"`
}
type DatabaseRes struct {
	Id        int8        `json:"id"`
	EngineId  int8        `json:"engineId"`
	Name      string      `json:"name"`
	IsDefault bool        `json:"isDefault"`
	DataOpt   []*KeyValue `json:"dataOpt"`
	LogOpt    []*KeyValue `json:"logOpt"`
}
