export type AppType = {
  userId1: () => void;
  userId2: () => void;
};

export interface notifiType {
  id: string;
  timestamp: Timestamp;
  recieverid: string;
  senderid: string;
  type: string;
  status: string;
  sendername: string;
}

export interface Timestamp {
  seconds: number;
  nanoseconds: number;
}

export interface MessageType {
  id: string;
  timestamp: Timestamp;
  recieverId: string;
  text: string;
  status: string;
  senderId: string;
  deleted:boolean;
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
      lasttimestamp: any;
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
  [x: string]: any;
  
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
  commentscreen:undefined;
  postscreen :undefined;
  signupscreen: undefined;
  loginscreen: undefined;
  chatscreen: {
    discussionid: string;
    chatnamescrn: string | undefined;
    oppositeid: string | undefined;
    currlastime: string;
  };
  UsernameScreen: undefined;
  homescreen: undefined;
  searchscreen: undefined;
  roomcreation: undefined;
  chathomescreen: undefined;
  appstack: undefined;
  maintabnavigator: undefined;
  notificationscreen: undefined;
};

export interface SearchType {
  id: string;
  email: string;
  username: string;
  createdAt: CreatedAt;
}

export interface CreatedAt {
  seconds: number;
  nanoseconds: number;
}

export interface searchnewtype {
  id: string;
  email: string;
  username: string;
  createdAt: CreatedAt;
  dob?: string;
  gender?: string;
}

export interface CreatedAt {
  seconds: number;
  nanoseconds: number;
}

export interface notificationType {
  receiverstatus: number;
  senderstatus: number;
  receiver: any;
  sendername: string;
  recievename: string;
  username: string;
  id: string;
  requeststatus: number;
  timestamp: Timestamp;
  type: string;
  recieverid: string;
  status: number;
  senderid: string;
}

export interface Timestamp {
  seconds: number;
  nanoseconds: number;
}

export interface readsType {
  id: string;
  users: User[];
  lasttime: Lasttime;
  unreaduser: Unreaduser;
  createdAt: CreatedAt;
  lastmessage: string;
}

export interface User {
  displayName: string;
  uid: string;
}

export interface Lasttime {
  seconds: number;
  nanoseconds: number;
}

export interface Unreaduser {
  F3akieJ7JeY4Gt2XmjtD0ozDMOI3: F3akieJ7JeY4Gt2XmjtD0ozDmoi3;
  EycuRSeh21QhvL1ueMbnQIAhqNm2: EycuRseh21QhvL1ueMbnQiahqNm2;
}

export interface F3akieJ7JeY4Gt2XmjtD0ozDmoi3 {
  unreadcount: number;
}

export interface EycuRseh21QhvL1ueMbnQiahqNm2 {
  unreadcount: number;
}

export interface CreatedAt {
  seconds: number;
  nanoseconds: number;
}

export interface MessageseenType {
  id: string;
  timestamp: Timestamp;
  recieverId: string;
  text: string;
  status: string;
  deleted:boolean;
  senderId: string;
}

export interface Timestamp {
  seconds: number;
  nanoseconds: number;
}




export interface RenderPost {
  id: string
  SenderId: string
  Text: string
  PostTime: PostTime
  likedBy: string[]
  SenderName: string
  comments: Comment[]
}

export interface PostTime {
  seconds: number
  nanoseconds: number
}

export interface Comment {
  text: string
  commentbyid: string
  commentname: string
  commenttime: Commenttime
}

export interface Commenttime {
  seconds: number
  nanoseconds: number
}



export interface RenderComment {
  id: string
  text: string
  commentbyid: string
  commentname: string
  commenttime: Commenttime
}

export interface Commenttime {
  seconds: number
  nanoseconds: number
}