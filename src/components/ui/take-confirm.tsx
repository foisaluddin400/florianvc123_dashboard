import React from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog"
import { Button } from "./button"

interface TakeConfirmProps {
  children: React.ReactNode
  title: string
  description?: string
  onConfirm: () => void
  onCancel?: () => void
  confirmText?: string
  cancelText?: string
  loading?: boolean
}

const TakeConfirm = ({
  children,
  title,
  description,
  onConfirm,
  onCancel,
  confirmText = "Continue",
  cancelText = "Cancel",
  loading = false,
}: TakeConfirmProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>

      <AlertDialogContent className='p-0' >
        <AlertDialogHeader className='p-4'>
          <AlertDialogTitle>{title}</AlertDialogTitle>

          {description && (
            <AlertDialogDescription>
              {description}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>

        <AlertDialogFooter className='bg-brand/20 p-4 relative'>
          <div className="h-[0.5px] w-full bg-brand/30 top-0 left-0 absolute"></div>
          <AlertDialogCancel onClick={onCancel} className='cursor-pointer'>
            {cancelText}
          </AlertDialogCancel>

          <AlertDialogAction className='bg-brand' asChild>
            <Button
              onClick={onConfirm}
              disabled={loading}
              className='hover:bg-brand cursor-pointer'
            >
              {loading ? "Loading..." : confirmText}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default TakeConfirm