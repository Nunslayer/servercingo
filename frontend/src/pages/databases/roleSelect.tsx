import { Checkbox } from "flowbite-react"
import { RolesAvailable } from "./userForm"

export function RoleSelect(props: {
  roles:  RolesAvailable
  onSelect: (option: string, checked: boolean) => void
}) {
  return (
        <ul className='mt-4 overflow-y-scroll'>
          {Object.entries(props.roles).map(([opt, checked]) => {
            return (
              <li key={opt}>
                <button
                  className='flex w-full cursor-pointer items-center px-2 py-1 text-md hover:bg-[rgba(255,255,255,0.075)]'
                  onClick={() => props.onSelect(opt, !checked)}
                >
                  <Checkbox checked={props.roles[opt] === true} readOnly />
                  <span className='ml-2 cursor-pointer text-center '>{opt}</span>
                </button>
              </li>
            )
          })}
        </ul>
  )
}
