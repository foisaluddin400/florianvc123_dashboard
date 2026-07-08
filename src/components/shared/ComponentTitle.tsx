import { Button } from '../ui/button'

function ComponentTitle({ title, buttonLabel, onButtonClick }: { title: string, buttonLabel: string, onButtonClick: () => void }) {
  return (
    <div className='flex items-center justify-between'>
      <h2 className='text-lg text-muted-foreground font-nunito-semibold-italic'>{title}</h2>
      <Button variant="link" className='text-brand/70 cursor-pointer' onClick={onButtonClick}>{buttonLabel}</Button>
    </div>
  )
}

export default ComponentTitle
