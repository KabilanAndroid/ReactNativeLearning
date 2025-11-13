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


export interface Rootofchathome {
  id: string
  users: User[]
  createdAt: CreatedAt
  lasttime: Lasttime
  lastmessage: string
  unreaduser: {
    [key:string]:{
      unreadcount:number
    }
  }
}

export interface User {
  displayName: string
  uid: string
}

export interface CreatedAt {
  seconds: number
  nanoseconds: number
}

export interface Lasttime {
  seconds: number
  nanoseconds: number
}



export interface Q2o5nck0ZozyhjznX7nsFrkxJfx1 {
  unreadcount: number
}

export interface F3akieJ7JeY4Gt2XmjtD0ozDmoi3 {
  unreadcount: number
}
