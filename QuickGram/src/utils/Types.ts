export type AppType ={
    userId1 :()=> void;
    userId2: ()=> void;
}

export interface MessageType {
  id: string
  timestamp: Timestamp
  text: string
  senderId: string
}

export interface Timestamp {
  seconds: number
  nanoseconds: number
}
