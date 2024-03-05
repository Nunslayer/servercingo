import { Navigate, RouterProvider as ReactRouterProvider, createHashRouter } from 'react-router-dom'

import { OutputPage } from '@/pages/output/output-page'
// import { MatchesListPage } from '@/pages/stats/matches-list-page'
// import { SessionsListPage } from '@/pages/stats/sessions-list-page'
// import { TrackingPage } from '@/pages/tracking/tracking-page'

import { AppWrapper } from './app-layout/app-wrapper'
import { AppErrorBoundary, PageErrorBoundary } from './app-layout/app-error'
import { HomeWrapper } from '@/pages/home/home-page'
import { GetUsersByEngineId } from '@@/go/core/CommandHandler'
// import { DbPage } from '@/pages/db/db'
import { DatabasesWrapper } from '@/pages/databases/databasesWrapper'
import { LoginsAndUsers } from '@/pages/databases/loginsAndUsers'
import { TablesAndSchemas } from '@/pages/databases/tablesAndSchemas'
import { CreateEngineForm } from '@/pages/home/engineForm'
import { LoginEngineForm } from '@/pages/home/loginForm'

// import { GetUsers } from '@@/go/core/CommandHandler'

const router = createHashRouter([
  {
    element: <AppWrapper />,
    errorElement: <AppErrorBoundary />,
    children: [
      {
        errorElement: <PageErrorBoundary />,
        children: [
          {
            element: <Navigate to='Inicio' />,
            index: true
          },
          {
            element: <OutputPage />,
            path: '/Tablas'
          },
          {
            element: <HomeWrapper />,
            path: '/Inicio/',
            children: [
                {
                    element: <CreateEngineForm />,
                    path: 'crear'
                },
                {
                    element: <LoginEngineForm />,
                    path: ':engineId',
                    loader: ({ params }) =>
                        GetUsersByEngineId(
                            Number(params.engineId)
                        )
                }
            ]
          },
          {
            element: <DatabasesWrapper />,
            path: '/Databases/',
            children: [
                {
                    element: <LoginsAndUsers />,
                    path: 'logins'
                },
                {
                    element: <TablesAndSchemas />,
                    path: 'tables'
                }
            ],
          },
        ]
      }
    ]
  }
])

export const RouterProvider = () => <ReactRouterProvider router={router} />
