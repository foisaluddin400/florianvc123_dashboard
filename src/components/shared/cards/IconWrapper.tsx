import { cn } from '../../../lib/utils'


function IconWrapper({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className={cn("flex items-center justify-center p-4 rounded-lg cursor-pointer", className)}>
      {children}
    </div>
  )
}

export default IconWrapper
