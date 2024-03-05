import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { AppLoader } from './app/app-layout/app-loader.tsx'
import { ErrorPopupProvider } from './app/error-popup'
import { ConfigProvider } from './app/config'
import { RouterProvider } from './app/router'
import { Provider } from 'react-redux';
import { store } from './store'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
                <Provider store={store}>
                    <React.Suspense fallback={<AppLoader />}>
                        <ErrorPopupProvider>
                            <ConfigProvider>
                                <RouterProvider />
                            </ConfigProvider>
                        </ErrorPopupProvider>
                    </React.Suspense>
                </Provider>
    </React.StrictMode>,
)
