import { format, formatDistanceToNow } from 'date-fns'

export function formatDate(date: string | Date): string {
  return format(new Date(date), 'MMM d, yyyy')
}

export function formatTime(date: string | Date): string {
  return format(new Date(date), 'h:mm a')
}

export function formatDateTime(date: string | Date): string {
  return format(new Date(date), 'MMM d, yyyy • h:mm a')
}

export function formatTimeAgo(date: string | Date): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export function formatLength(inches: number): string {
  return `${inches.toFixed(1)}"`
}

export function formatConfidence(confidence: number): string {
  return `${Math.round(confidence * 100)}%`
}
