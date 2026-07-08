import { cn } from '../../lib/utils'


function Space({ size = 12 }: { size?: number }) {
  return (
    <div className={cn("h-12", `h-${size}`)} />
  )
}

export default Space

