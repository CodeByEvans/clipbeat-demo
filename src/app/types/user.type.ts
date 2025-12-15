// src/app/types/user.type.ts

export interface User {
  name: string;
  lastname: string;
  username: string;
  city: string;
  biography: string;
  profilePhoto?: string; // opcional, si quieres permitir que no siempre haya foto
  reviews?: number; // opcional
  rating?: number; // opcional
  email: string;
  birthdate?: string;
  phone?: string;
  socialLinks?: {
    name: string;
    url: string;
    icon: string;
  }[];
  posts?: {
    title: string;
    description: string;
    img: string;
    likes: number;
    comments: number;
  }[];
}
