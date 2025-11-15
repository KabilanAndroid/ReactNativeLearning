export type AppType = {
  userId1: () => void;
  userId2: () => void;
};

export interface MessageType {
  id: string;
  timestamp: Timestamp;
  text: string;
  senderId: string;
}

export interface Timestamp {
  seconds: number;
  nanoseconds: number;
}

export interface Rootofchathome {
  id: string;
  users: User[];
  createdAt: CreatedAt;
  lasttime: Lasttime;
  lastmessage: string;
  unreaduser: {
    [key: string]: {
      unreadcount: number;
    };
  };
}

export interface User {
  displayName: string;
  uid: string;
}

export interface CreatedAt {
  seconds: number;
  nanoseconds: number;
}

export interface Lasttime {
  toDate: any;
  seconds: number;
  nanoseconds: number;
}

export interface Q2o5nck0ZozyhjznX7nsFrkxJfx1 {
  unreadcount: number;
}

export interface F3akieJ7JeY4Gt2XmjtD0ozDmoi3 {
  unreadcount: number;
}

export type ScreenType = {
  signupscreen: undefined;
  loginscreen: undefined;
  chatscreen: {
    discussionid: string;
    chatnamescrn: string | undefined;
    oppositeid: string | undefined;
  };
  UsernameScreen: undefined;
  homescreen: undefined;
  searchscreen: undefined;
  roomcreation: undefined;
  chathomescreen: undefined;
  appstack: undefined;
  maintabnavigator: undefined;
  notificationscreen:undefined;
};

export interface SearchType {
  id: string
  email: string
  username: string
  createdAt: CreatedAt
}

export interface CreatedAt {
  seconds: number
  nanoseconds: number
}




export interface searchnewtype {
  id: string
  email: string
  username: string
  createdAt: CreatedAt
  dob?: string
  gender?: string
}

export interface CreatedAt {
  seconds: number
  nanoseconds: number
}



export interface notificationType {
  sendername: string;
  recievename: string;
  username: string;
  id: string
  timestamp: Timestamp
  type: string
  recieverid: string
  status: string
  senderid: string
}

export interface Timestamp {
  seconds: number
  nanoseconds: number
}



