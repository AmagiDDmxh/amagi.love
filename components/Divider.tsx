import { FC } from 'react'

export type Placement = 'center' | 'left' | 'right'

export interface DividerProps {
  placement?: Placement
}

const Divider: FC<DividerProps> = ({ placement = 'center', children }) => {
  const placements = {
    center: 'justify-center',
    left: 'justify-start',
    right: 'justify-end',
  }

  const itemClasses = `relative flex ${placements[placement]}`

  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300" />
      </div>
      {children && <div className={itemClasses}>{children}</div>}
    </div>
  )
}

export default Divider
