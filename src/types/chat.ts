export interface Message {
  id: string | number
  text: string
  sender: 'me' | 'other'
  time: string
  attachments?: string[] // Optional attachments (e.g., file URLs)
}