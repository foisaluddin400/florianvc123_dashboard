import { ChevronLeft, ChevronRight, RotateCw, X, ZoomIn, ZoomOut } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Button } from './button'
import Modal from './modal'

interface ImageModalProps {
  images: string | string[]
  isOpen: boolean
  onClose: () => void
  initialIndex?: number
}

export default function ImageModal({ images, isOpen, onClose, initialIndex = 0 }: ImageModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [rotation, setRotation] = useState(0)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const imageRef = useRef<HTMLDivElement>(null)
  const [showControls, setShowControls] = useState<boolean>(true)

  const imageArray = Array.isArray(images) ? images : [images]
  const currentImage = imageArray[currentIndex]

  useEffect(() => {
    if (isOpen) {
      // Reset state when modal opens
      setRotation(0)
      setScale(1)
      setPosition({ x: 0, y: 0 })
      setCurrentIndex(initialIndex)
    }
  }, [isOpen, initialIndex])

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + imageArray.length) % imageArray.length)
    resetTransform()
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % imageArray.length)
    resetTransform()
  }

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360)
  }

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 3))
  }

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.5))
  }

  const resetTransform = () => {
    setRotation(0)
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
        handlePrevious()
        break
      case 'ArrowRight':
        handleNext()
        break
      case 'Escape':
        onClose()
        break
      case '+':
      case '=':
        handleZoomIn()
        break
      case '-':
        handleZoomOut()
        break
      case 'r':
      case 'R':
        handleRotate()
        break
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="p-0 bg-black/90 border-none max-w-[95vw] max-h-[95vh]">
      <div className="relative w-full h-full flex items-center justify-center" onKeyDown={handleKeyDown}>
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
        >
          <X className="h-6 w-6" />
        </Button>

        {/* Image Container */}
        <div
          ref={imageRef}
          className="relative overflow-hidden cursor-move"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ width: '100%', height: '100%' }}
        >
          <img
            src={currentImage}
            alt={`Image ${currentIndex + 1}`}
            className="max-w-full max-h-full object-contain transition-transform duration-200"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg) scale(${scale})`,
              cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
            }}
            draggable={false}
          />
          <div className={`
            absolute text-xs left-1/2 -translate-x-1/2 z-50
            ${!showControls ? 'bottom-4' : 'top-4 left-4 translate-x-1/2'}
          `}>
            <h1 className="text-white uppercase hover:underline cursor-pointer" onClick={() => setShowControls(!showControls)}>
              {!showControls ? "show controll" : "hide controll"}
            </h1>
          </div>
        </div>

        {/* Navigation Buttons */}
        {imageArray.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20"
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20"
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
          </>
        )}


        {/* Image Counter */}
        {imageArray.length > 1 && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1">
            <span className="text-white text-sm">
              {currentIndex + 1} / {imageArray.length}
            </span>
          </div>
        )}


        {/* Control Panel */}
        {showControls && (
          <>
            <div className="absolute  bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-black/70 backdrop-blur-sm rounded-lg p-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleZoomOut}
                disabled={scale <= 0.5}
                className="text-white hover:bg-white/20 disabled:opacity-50"
              >
                <ZoomOut className="h-5 w-5" />
              </Button>
              <span className="text-white text-sm min-w-12 text-center">
                {Math.round(scale * 100)}%
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleZoomIn}
                disabled={scale >= 3}
                className="text-white hover:bg-white/20 disabled:opacity-50"
              >
                <ZoomIn className="h-5 w-5" />
              </Button>
              <div className="w-px h-6 bg-white/30 mx-1" />
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRotate}
                className="text-white hover:bg-white/20"
              >
                <RotateCw className="h-5 w-5" />
              </Button>
              <div className="w-px h-6 bg-white/30 mx-1" />
              <Button
                variant="ghost"
                size="icon"
                onClick={resetTransform}
                className="text-white hover:bg-white/20"
              >
                <span className="text-xs">Reset</span>
              </Button>
            </div>

            {/* Thumbnail Strip */}
            {imageArray.length > 1 && (
              <div className="absolute opacity-50 bottom-20 left-1/2 -translate-x-1/2 z-50 flex gap-1 bg-black/70 backdrop-blur-sm rounded-lg p-2">
                {imageArray.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index)
                      resetTransform()
                    }}
                    className={`w-12 h-12 rounded overflow-hidden border-2 transition-all ${index === currentIndex
                      ? 'border-white scale-110'
                      : 'border-transparent hover:border-white/50'
                      }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </>
        )
        }
      </div>
    </Modal >
  )
}
