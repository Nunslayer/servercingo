import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/hooks";

export function AppStatusBar() {
    const { name, port } = useAppSelector((state) => state.engine)
    return (

        <div
            className={cn(
                'flex items-center justify-between',
                'group flex items-center justify-between',
                'transition-colors hover:bg-slate-50 hover:bg-opacity-5 hover:!text-white active:bg-[rgba(255,255,255,.075)]',
                'rounded px-1 py-2 text-lg text-[#bfbcff] text-opacity-80'
            )}
            style={{
                fontWeight: '200',
                color: '#bfbcff',
            }}
        >
            <div
                className={cn(
                    'flex items-center justify-between pl-1 pr-1',
                    'border-r-[1px] border-solid border-r-[rgba(234,179,8,.5)]'
                )}
            >
                <span>{name}</span>
            </div>
            <div
                className={cn(
                    'flex items-center justify-between pl-1 pr-1',
                    'border-r-[1px] border-solid border-r-[rgba(234,179,8,.5)]'
                )}
            >
                <span>{port}</span>
            </div>
        </div>
    )
}
