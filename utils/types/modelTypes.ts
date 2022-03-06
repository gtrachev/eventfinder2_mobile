import { ObjectId } from "mongoose";
import { InterestEnum } from "./interestTypes";
import { UserTiersEnum } from "./userTiers";

export enum AgeGroupEnum {
  all = "all",
  over = "over",
}

export interface UserType {
  _id: string;
  username: string;
  email: string;
  password: string;
  userTier: UserTiersEnum;
  age: number;
  profileImage: ProfileImage;
  date?: Date;
  attending: EventType[];
  following: UserType[];
  followers: UserType[];
  country: string;
  city: string;
  interests: InterestEnum[];
  savedEvents: EventType[];
  inChats: ChatType[];
  likedNotes: NoteType[];
  lastPosted?: Date;
}

export interface UserInputType {
  username: string;
  email: string;
  password: string;
  age: number | string;
  country: string;
  city: string;
  interests: string[];
  userTier: string;
  profileImage?: ImageType;
}

export interface EditUserInputType {
  age: number | string;
  country: string;
  city: string;
  interests: string[];
  userTier?: string;
  profileImage?: ImageType;
}

export interface EventType {
  _id: string;
  name: string;
  price: number;
  description: string;
  geometry: {
    type: "Point";
    coordinates: number[];
  };
  images: ImageType[];
  reviews: ReviewType[];
  attenders: UserType[];
  address: string;
  country: string;
  city: string;
  author: UserType;
  date: Date;
  time: string;
  created_at: Date;
  interestCategories: InterestEnum[];
  ageGroup: AgeGroupEnum;
  chat: ChatType;
}

export interface EventInputType {
  name: string;
  price: number;
  description: string;
  country: string;
  city: string;
  address: string;
  date: Date;
  time: string;
  interestCategories: string[];
  ageGroup: string;
  images: ImageType[];
}

export interface NoteType {
  _id: string;
  body: string;
  author: UserType;
  shared_event?: EventType;
  created_at: Date;
  likedBy: UserType[];
}
export interface NoteInputType {
  body: string;
  shared_event?: EventType;
}

export interface ChatType {
  _id: string;
  members: UserType[];
  messages: MessageType[];
  type: string;
  event: EventType;
  createdAt: Date;
  updatedAt: Date;
}

export interface MessageType {
  _id: string;
  chat: ChatType;
  text: string;
  author: UserType;
  createdAt: Date;
  updatedAt: Date;
}

export interface MessageInputType {
  text: string;
}

export interface ReviewType {
  _id: string;
  text: string;
  author: UserType;
  postedDate?: Date;
}

export interface ReviewInputType {
  text: string;
  //   time: string;
}

export interface ProfileImage {
  path: string;
  filename: string;
}

export interface ImageType {
  filename: string;
  path: string;
}
