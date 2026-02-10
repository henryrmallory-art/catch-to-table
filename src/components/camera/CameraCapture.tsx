'use client'

import { useRef, useState, useEffect } from 'react'
import { Camera, FlipHorizontal2, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCatchStore } from '@/lib/stores/catchStore'
import { getCurrentPosition } from '@/lib/utils/geo'

export function CameraCapture() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment')
  const { setPhoto, setLocation, setStep } = useCatchStore()

  useEffect(() => {
    startCamera()
    getLocation()

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [facingMode])

  async function startCamera() {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode, width: { ideal: 1920 }, height: { ideal: 1080 } },
        audio: false,
      })

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
      setStream(mediaStream)
    } catch (error) {
      console.error('Camera error:', error)
      alert('Could not access camera. Please grant camera permissions.')
    }
  }

  async function getLocation() {
    try {
      const position = await getCurrentPosition()
      setLocation(position.coords.latitude, position.coords.longitude)
    } catch (error) {
      console.error('Location error:', error)
    }
  }

  async function capturePhoto() {
    if (!videoRef.current) return

    const canvas = document.createElement('canvas')
    canvas.width = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight
    const ctx = canvas.getContext('2d')

    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0)
      const base64 = canvas.toDataURL('image/jpeg', 0.8).split(',')[1]
      const dataUrl = canvas.toDataURL('image/jpeg', 0.8)

      setPhoto(base64, dataUrl)
      setStep('species')

      // Stop camera
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }

  function toggleCamera() {
    setFacingMode(prev => prev === 'environment' ? 'user' : 'environment')
  }

  return (
    <div className="relative h-screen w-full bg-black">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="h-full w-full object-cover"
      />

      {/* Camera Controls */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-8">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            className="h-14 w-14 rounded-full bg-white/20 text-white hover:bg-white/30"
            onClick={toggleCamera}
          >
            <FlipHorizontal2 className="h-6 w-6" />
          </Button>

          <Button
            size="icon"
            className="h-20 w-20 rounded-full border-4 border-white bg-white/20 hover:bg-white/30"
            onClick={capturePhoto}
          >
            <Camera className="h-10 w-10 text-white" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-14 w-14 rounded-full bg-white/20 text-white hover:bg-white/30"
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <ImageIcon className="h-6 w-6" />
          </Button>

          <input
            id="file-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0]
              if (file) {
                const reader = new FileReader()
                reader.onloadend = () => {
                  const base64 = (reader.result as string).split(',')[1]
                  setPhoto(base64, reader.result as string)
                  setStep('species')
                }
                reader.readAsDataURL(file)
              }
            }}
          />
        </div>

        <p className="mt-4 text-center text-sm text-white/80">
          Center the fish in frame and tap the camera button
        </p>
      </div>

      {/* Top Info */}
      <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/80 to-transparent p-6">
        <h1 className="text-2xl font-bold text-white">Catch-to-Table</h1>
        <p className="text-sm text-white/80">Take a photo to identify your catch</p>
      </div>
    </div>
  )
}
