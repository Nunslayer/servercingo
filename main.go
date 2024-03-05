package main

import (
	"bytes"
	"context"
	"embed"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/joho/godotenv"
	"github.com/kelseyhightower/envconfig"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/logger"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"github.com/wailsapp/wails/v2/pkg/options/mac"
	"github.com/wailsapp/wails/v2/pkg/options/windows"
	"github.com/wailsapp/wails/v2/pkg/runtime"

	"changeme/core"
	"changeme/core/config"
	"changeme/core/data"
	"changeme/core/data/nosql"
	"changeme/core/data/sql"
	"changeme/core/data/txt"
	"changeme/core/errorsx"
)

var (
	steamUsername string = ``
	steamPassword string = ``
	capIDEmail    string = ``
	capIDPassword string = ``
	appVersion    string = ``
	isProduction  string = ``
)

//go:embed all:frontend/dist
var assets embed.FS

//go:embed frontend/error/error.html
var errorTmpl []byte

//go:embed build/appicon.png
var icon []byte

var (
	cfg     config.Config
	logFile *os.File
)

func logToFile() {
	file, err := os.OpenFile(`cfn-upds.log`, os.O_APPEND|os.O_RDWR|os.O_CREATE, 0644)
	if err != nil {
		log.Panic(err)
	}

	logFile = file
	log.SetOutput(file)
	log.SetFlags(log.Ldate | log.LstdFlags | log.Lshortfile)
}

func init() {
	if isProduction == `true` {
		logToFile()
	}

	err := godotenv.Load(`.env`)
	if err != nil {
		log.Println(fmt.Errorf(`missing .env file: %w`, err))
		cfg = config.Config{
			AppVersion: appVersion,
			Headless:   isProduction == `true`,
			// SteamUsername:     steamUsername,
			// SteamPassword:     steamPassword,
			// CapIDEmail:        capIDEmail,
			// CapIDPassword:     capIDPassword,
			BrowserSourcePort: 4242,
		}
		return
	}
	err = envconfig.Process("", &cfg)
	if err != nil {
		log.Fatalf(`failed to process envconfig: %v`, err)
	}
}

func main() {
	defer func() {
		if logFile != nil {
			logFile.Close()
		}
	}()

    closeWithError:= func(err error) {
        log.Println("close with error", err)
wails.Run(&options.App{
			Title:                    `CFN Tracker - Error`,
			Width:                    400,
			Height:                   148,
			DisableResize:            true,
			Frameless:                true,
			EnableDefaultContextMenu: false,
			AssetServer: &assetserver.Options{
				Middleware: assetserver.ChainMiddleware(func(next http.Handler) http.Handler {
					return http.HandlerFunc(func(w http.ResponseWriter, _ *http.Request) {
						var b bytes.Buffer
						tmpl := template.Must(template.New("errorPage").Parse(string(errorTmpl)))
						params := struct {
							Error string
						}{
							Error: err.Error(),
						}
						tmpl.Execute(&b, params)
						w.Write(b.Bytes())
					})
				}),
			},
		})
    }

	sqlDb, err := sql.NewStorage()
	if err != nil {
		log.Fatal(err)
		return
	}

	noSqlDb, err := nosql.NewStorage()
	if err != nil {
		log.Fatal(err)
		return
	}

	txtDb, err := txt.NewStorage()
	if err != nil {
		log.Fatal(err)
		return
	}

	trackerRepo := data.NewCFNTrackerRepository(sqlDb, noSqlDb, txtDb)
	cmdHandler := core.NewCommandHandler(trackerRepo, &cfg)
    var wailsCtx context.Context
	err = wails.Run(&options.App{
		Title:              fmt.Sprintf(`SQL ServerCingo v%s`, appVersion),
		Assets:             assets,
		Width:              1080,
		Height:             700,
		MinWidth:           800,
		MinHeight:          450,
		DisableResize:      true,
		Fullscreen:         false,
		Frameless:          true,
		StartHidden:        false,
		HideWindowOnClose:  false,
		LogLevel:           logger.WARNING,
		LogLevelProduction: logger.ERROR,
		ErrorFormatter:     errorsx.FormatError,
		BackgroundColour:   options.NewRGBA(0, 0, 0, 1),
		CSSDragProperty:    `--draggable`,
		Windows: &windows.Options{
			WebviewIsTransparent:              false,
			WindowIsTranslucent:               false,
			Theme:                             windows.Theme(windows.Dark),
			DisableFramelessWindowDecorations: true,
		},
		Mac: &mac.Options{
			TitleBar: mac.TitleBarHiddenInset(),
			About: &mac.AboutInfo{
				Title:   fmt.Sprintf(`SQL ServerCingo v%s`, appVersion),
				Message: fmt.Sprintf(`SQL ServerCingo version %s © 2024 Grupo 4 Administracion de Base de Dato I, UPDS - Santa Cruz`, appVersion),
			},
		},
		OnStartup: func(ctx context.Context) {
			wailsCtx = ctx
			cmdHandler.SetContext(ctx)
			// go server.Start(ctx, &cfg)
		},
		OnShutdown: func(_ context.Context) {
			// appBrowser.Page.Browser().Close()
		},
		OnBeforeClose: func(_ context.Context) (prevent bool) {
			// appBrowser.Page.Browser().Close()
			return false
		},
		SingleInstanceLock: &options.SingleInstanceLock{
			UniqueId: "d0ef6612-49f7-437a-9ffc-2076ec9e37db",
			OnSecondInstanceLaunch: func(secondInstanceData options.SecondInstanceData) {
				log.Println("user opened second instance", strings.Join(secondInstanceData.Args, ","))
				log.Println("user opened second from", secondInstanceData.WorkingDirectory)
				runtime.WindowUnminimise(wailsCtx)
				runtime.Show(wailsCtx)
				go runtime.EventsEmit(wailsCtx, "launchArgs", secondInstanceData.Args)
			},
		},
		Bind: []interface{}{
			cmdHandler,
		},
	})
	if err != nil {
		closeWithError(fmt.Errorf(`failed to launch app: %w`, err))
	}
	// Create application with options
	// err = wails.Run(&options.App{
	// 	Title:             "admindb-project",
	// 	Width:             1024,
	// 	Height:            768,
	// 	MinWidth:          1024,
	// 	MinHeight:         768,
	// 	MaxWidth:          1280,
	// 	MaxHeight:         800,
	// 	DisableResize:     false,
	// 	Fullscreen:        false,
	// 	Frameless:         false,
	// 	StartHidden:       false,
	// 	HideWindowOnClose: false,
	// 	BackgroundColour:  &options.RGBA{R: 255, G: 255, B: 255, A: 255},
	// 	AssetServer: &assetserver.Options{
	// 		Assets: assets,
	// 	},
	// 	Menu:             nil,
	// 	Logger:           nil,
	// 	LogLevel:         logger.DEBUG,
	// 	OnStartup: func(ctx context.Context) {
 //            cmdHandler.SetContext(ctx)
 //        },
	// 	OnDomReady:       app.domReady,
	// 	OnBeforeClose:    app.beforeClose,
	// 	OnShutdown:       app.shutdown,
	// 	WindowStartState: options.Normal,
	// 	Bind: []interface{}{
	// 		cmdHandler,
	// 	},
	// 	// Windows platform specific options
	// 	Windows: &windows.Options{
	// 		WebviewIsTransparent: false,
	// 		WindowIsTranslucent:  false,
	// 		DisableWindowIcon:    false,
	// 		// DisableFramelessWindowDecorations: false,
	// 		WebviewUserDataPath: "",
	// 		ZoomFactor:          1.0,
	// 	},
	// 	// Mac platform specific options
	// 	Mac: &mac.Options{
	// 		TitleBar: &mac.TitleBar{
	// 			TitlebarAppearsTransparent: true,
	// 			HideTitle:                  false,
	// 			HideTitleBar:               false,
	// 			FullSizeContent:            false,
	// 			UseToolbar:                 false,
	// 			HideToolbarSeparator:       true,
	// 		},
	// 		Appearance:           mac.NSAppearanceNameDarkAqua,
	// 		WebviewIsTransparent: true,
	// 		WindowIsTranslucent:  true,
	// 		About: &mac.AboutInfo{
	// 			Title:   "admindb-project",
	// 			Message: "",
	// 			Icon:    icon,
	// 		},
	// 	},
	// })
	// if err != nil {
	// 	log.Fatal(err)
	// }
}
