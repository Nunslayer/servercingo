import React from 'react'

import type { model } from '@@/go/models'
import { GetGuiConfig } from '@@/go/core/CommandHandler'

const initialConfig: model.GuiConfig = {
  locale: 'en-GB',
  sidebarMinized: false
}

export const ConfigContext = React.createContext<
  [cfg: model.GuiConfig, setCfg: React.Dispatch<model.GuiConfig>]
>([
  initialConfig,
  () => {
    return
  }
])

export function ConfigProvider({ children }: React.PropsWithChildren) {
  const [cfg, setCfg] = React.useState(initialConfig)

  React.useEffect(() => {
    ;(async function () {
      const cfg = await GetGuiConfig()
      setCfg(cfg)
    })()
  }, [])

  return <ConfigContext.Provider value={[cfg, setCfg]}>{children}</ConfigContext.Provider>
}
