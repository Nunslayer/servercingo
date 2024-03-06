import React from 'react'
import * as Portal from '@radix-ui/react-portal';
// import { useSelector } from '@xstate/react'
import { Outlet } from 'react-router-dom'
// import { Icon } from '@iconify/react'

// import { BrowserOpenURL } from '@@/runtime/runtime'

// import { useErrorPopup } from '../error-popup'
import { AppSidebar } from './app-sidebar'
import { AppLoader } from './app-loader';
import { useAppSelector } from '@/store/hooks';

export function AppWrapper() {
    const { isLoading } = useAppSelector((state) => state.auth)
    return (
        <>
                <AppSidebar />
                {isLoading ? <LoadingBar /> : null}
                <div className='flex-[1]'>
                    <React.StrictMode>
                        <Outlet />
                    </React.StrictMode>
                </div>
        </>
    )
}

export function LoadingBar() {
    return (
        <Portal.Root >

            <div
                className='fixed flex flex-col top-[53px] h-full w-full bg-black bg-opacity-[0.6] text-white text-xl z-50 items-center content-center justify-center'
                style={{
                    backdropFilter: 'blur(3px)',
                }}
            >
                <AppLoader />
            </div>
        </Portal.Root>
    )
}

// function UpdatePrompt() {
//   const [hasUpdate, setHasUpdate] = React.useState(false)
//   const setError = useErrorPopup()
//
//   React.useEffect(() => {
//     CheckForUpdate().then(setHasUpdate).catch(setError)
//   }, [])
//
//   if (hasUpdate === false) {
//     return null
//   }
//
//   return (
//     <a
//       className={cn(
//         'group absolute bottom-2 left-0 z-50',
//         'cursor-pointer text-base leading-5',
//         'bg-[rgba(0,0,0,.625)] text-[#bfbcff] backdrop-blur transition-colors hover:bg-[rgba(0,0,0,.525)] hover:text-white',
//         'ml-2 rounded-lg px-3 py-2'
//       )}
//       onClick={() => {
//         BrowserOpenURL('https://cfn.williamsjokvist.se/')
//         setHasUpdate(false)
//       }}
//     >
//       <Icon
//         icon='radix-icons:update'
//         className='mr-2 inline h-4 w-4 text-[#49b3f5] transition-colors group-hover:text-white'
//       />
//       {t('newVersionAvailable')}
//     </a>
//   )
// }
