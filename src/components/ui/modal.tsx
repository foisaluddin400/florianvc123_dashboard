import { type ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  className?: string
}

export default function Modal({ isOpen, onClose, children, className = "" }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className={`relative z-50 rounded-lg shadow-xl max-w-[95vw] max-h-[95vh] overflow-hidden ${className}`}>
        {/* Content */}
        <div className="w-full h-full">
          {children}
        </div>
      </div>
    </div>
  )
}
