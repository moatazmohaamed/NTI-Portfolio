export interface Section {
  _id?: string;
  title: string;
  subtitle?: string;
  content?: string;
  image?: string;
  type: string;
  isActive: boolean;
  order?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
