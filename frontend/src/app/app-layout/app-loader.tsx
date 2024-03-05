import { useLottie } from 'lottie-react'
import lottieLoading from '../../assets/loading.json'
export function AppLoader() {
    const options = {
        animationData: lottieLoading,
        loop: true,
    }
    const style = {
        height: 200,
    }
    const { View } = useLottie(options, style)

    return (
        <>
            {View}
        </>
    )
}
