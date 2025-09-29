export interface Testimonial {
  _id: string;
  name: string;
  role?: string;
  company?: string;
  message: string;
  photo?: string;
  rating: number;
  approved: boolean;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}