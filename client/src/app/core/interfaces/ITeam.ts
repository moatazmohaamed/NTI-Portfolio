export interface TeamMember {
  _id?: string;
  name: string;
  position: string;
  bio?: string;
  photo: string;
  role: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    website?: string;
  };
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
