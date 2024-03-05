package sql

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/jmoiron/sqlx"

	"changeme/core/model"
)

type DatabaseStorage interface {
	GetDatabaseById(ctx context.Context, id int8) (*model.DatabaseRes, error)
	GetDatabasesByEngineId(ctx context.Context, id int8) ([]*model.DatabaseRes, error)
	GetDatabases(ctx context.Context) ([]*model.DatabaseRes, error)
	SaveDatabase(ctx context.Context, arg *model.DatabaseRes) error
	RemoveDatabase(ctx context.Context, id int8) error
}

func (s *Storage) GetDatabaseById(ctx context.Context, id int8) (*model.DatabaseRes, error) {
	query, args, err := sqlx.In(`
		SELECT * FROM databases
		WHERE id = (?)
		LIMIT 1
	`, id)
	if err != nil {
		return nil, fmt.Errorf("prepare get database clause: %w", err)
	}
	var database model.Database
	err = s.db.GetContext(ctx, &database, query, args...)
	if err != nil {
		return nil, fmt.Errorf("get database by id: %w", err)
	}
	// var dataOpt []map[string]interface{}
	// var logOpt []map[string]interface{}
	var dataOpt []*model.KeyValue
	var logOpt []*model.KeyValue

	err = json.Unmarshal([]byte(database.DataOpt), &dataOpt)
	if err != nil {
		return nil, fmt.Errorf("unmarshal dataopt : %w", err)
	}
	err = json.Unmarshal([]byte(database.LogOpt), &logOpt)
	if err != nil {
		return nil, fmt.Errorf("unmarshal dataopt : %w", err)
	}
	res := &model.DatabaseRes{
		Id:        database.Id,
		EngineId:  database.EngineId,
		Name:      database.Name,
		IsDefault: database.IsDefault,
		DataOpt:   dataOpt,
		LogOpt:    logOpt,
	}

	return res, nil
}

func (s *Storage) GetDatabases(ctx context.Context) ([]*model.DatabaseRes, error) {
	var databases []*model.Database
	err := s.db.SelectContext(ctx, &databases, "SELECT * FROM databases")
	if err != nil {
		return nil, fmt.Errorf("select sql users: %w", err)
	}
	var res []*model.DatabaseRes
	for _, db := range databases {
		// var dataOpt []map[string]interface{}
		// var logOpt []map[string]interface{}
		var dataOpt []*model.KeyValue
		var logOpt []*model.KeyValue
		var err error
		err = json.Unmarshal([]byte(db.DataOpt), &dataOpt)
		if err != nil {
			return nil, fmt.Errorf("unmarshal dataopt : %w", err)
		}
		err = json.Unmarshal([]byte(db.LogOpt), &logOpt)
		if err != nil {
			return nil, fmt.Errorf("unmarshal dataopt : %w", err)
		}
		r := &model.DatabaseRes{
			Id:        db.Id,
			EngineId:  db.EngineId,
			Name:      db.Name,
			IsDefault: db.IsDefault,
			DataOpt:   dataOpt,
			LogOpt:    logOpt,
		}
		res = append(res, r)
	}
	return res, nil
}

func (s *Storage) GetDatabasesByEngineId(
	ctx context.Context,
	id int8,
) ([]*model.DatabaseRes, error) {
	query, args, err := sqlx.In(`
		SELECT * FROM databases
		WHERE engine_id = (?)
	`, id)
	if err != nil {
		return nil, fmt.Errorf("prepare get databases of engine id clause: %w", err)
	}
	var databases []*model.Database
	err = s.db.SelectContext(ctx, &databases, query, args...)
	if err != nil {
		return nil, fmt.Errorf("select sql users: %w", err)
	}
	var res []*model.DatabaseRes
	for _, db := range databases {
		// var dataOpt []map[string]interface{}
		// var logOpt []map[string]interface{}
		var dataOpt []*model.KeyValue
		var logOpt []*model.KeyValue
		var err error
		err = json.Unmarshal([]byte(db.DataOpt), &dataOpt)
		if err != nil {
			return nil, fmt.Errorf("unmarshal dataopt : %w", err)
		}
		err = json.Unmarshal([]byte(db.LogOpt), &logOpt)
		if err != nil {
			return nil, fmt.Errorf("unmarshal dataopt : %w", err)
		}
		r := &model.DatabaseRes{
			Id:        db.Id,
			EngineId:  db.EngineId,
			Name:      db.Name,
			IsDefault: db.IsDefault,
			DataOpt:   dataOpt,
			LogOpt:    logOpt,
		}
		res = append(res, r)
	}
	return res, nil
}

func (s *Storage) SaveDatabase(ctx context.Context, arg *model.DatabaseRes) error {
	dataOpt, err := json.Marshal(arg.DataOpt)
	if err != nil {
		return fmt.Errorf("marshal dataOpt: %w", err)
	}
	logOpt, err := json.Marshal(arg.LogOpt)
	if err != nil {
		return fmt.Errorf("marshal logOpt: %w", err)
	}
	db := model.Database{
		EngineId:  arg.EngineId,
		Name:      arg.Name,
		IsDefault: arg.IsDefault,
		DataOpt:   string(dataOpt),
		LogOpt:    string(logOpt),
	}
	query := `
		INSERT OR IGNORE INTO engines (engine_id, name, is_default, data_opt, log_opt)
        VALUES (:engine_id, :name, :is_default, :data_opt, :log_opt)
	`
	_, err = s.db.NamedExecContext(ctx, query, db)
	if err != nil {
		return fmt.Errorf("create database exec query: %w", err)
	}
	return nil
}

func (s *Storage) RemoveDatabase(ctx context.Context, id int8) error {
	query, args, err := sqlx.In(`
		DELETE * FROM databases
		WHERE id = (?)
	`, id)
	if err != nil {
		return fmt.Errorf("prepare delete database clause: %w", err)
	}
	_, err = s.db.NamedExecContext(ctx, query, args)
	if err != nil {
		return fmt.Errorf("remove database: %w", err)
	}
	return nil
}

func (s *Storage) createDatabasesTable() error {
	_, err := s.db.Exec(`
	CREATE TABLE IF NOT EXISTS databases (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		engine_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        is_default BOOLEAN NOT NULL,
        data_opt TEXT,
        log_opt TEXT,
		FOREIGN KEY (engine_id) REFERENCES engines(id)
	)`)
	if err != nil {
		return fmt.Errorf("create databases table: %w", err)
	}
	return nil
}
