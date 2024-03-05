package sa

import (
	// "changeme/core/model"
	"context"
	"database/sql"
	"errors"
	"fmt"
	"log"
	"time"

	_ "github.com/denisenkom/go-mssqldb"
)

type ConnStatus struct {
    Progress int
    Err error
}

func (a *ConnStatus) WithProgress(progress int) *ConnStatus{
    a.Progress = progress
    return a
}

func (a *ConnStatus) WithError(err error) *ConnStatus{
    a.Err = err
    return a
}

func (m *SAManager) Connect(ctx context.Context,server,login,pass string,port int64)error {

    if m.isConnected{
        m.isConnected = true
        return errors.New("El engine esta conectado actualmente")
    }
    connString := fmt.Sprintf("server=%s;user id=%s;password=%s;port=%d", server, login, pass, port)
    conn, err := sql.Open("sqlserver", connString)
    if err != nil {
        return fmt.Errorf("Error conectar sqlserver: %w", err)
    }
    m.stopPolling = func()error{
        m.isConnected = false
        err := conn.Close()
        if err != nil {
            return err
        }
        return nil
    }
    log.Println(`Starting connection`)
    time.Sleep(time.Second * 1)
    m.DB = conn
    m.isConnected = true
    log.Println(`Connection is success`)
return nil
}
