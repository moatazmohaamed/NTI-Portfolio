export interface ContactForm {
  _id?: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  status?: 'New' | 'Read' | 'Replied' | 'Archived';
  createdAt?: Date;
  updatedAt?: Date;
}