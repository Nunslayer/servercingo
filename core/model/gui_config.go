package model

type GuiConfig struct {
	Locale         string `json:"locale"`
	SideBarMinized bool   `json:"sidebarMinized"`
}

func NewGuiConfig() *GuiConfig {
	return &GuiConfig{
		Locale:         "en-GB",
		SideBarMinized: false,
	}
}
