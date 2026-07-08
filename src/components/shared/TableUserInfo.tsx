
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

function TableUserInfo({ name, email, phone, img }: { name?: string, email?: string, phone?: string, img?: string }) {
  return (
    <div className="flex items-center gap-3">
      <Avatar className="w-8 h-8">
        <AvatarImage src={img} alt={name} />
        <AvatarFallback>{name?.charAt(0)?.toUpperCase()}</AvatarFallback>
      </Avatar>
      <div>
        {name && <h1 className="font-medium text-sm">{name}</h1>}
        {email && <p className="text-xs text-muted-foreground">{email}</p>}
        {phone && <p className="text-xs text-muted-foreground">{phone}</p>}
      </div>
    </div>
  )
}

export default TableUserInfo
