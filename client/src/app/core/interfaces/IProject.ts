export interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  summary?: string;
  image: string;
  link?: string;
  technologies: string[];
  category: Category;
  client?: {
    name?: string;
    industry?: string;
  };
  featured: boolean;
  completionDate?: Date;
  status: 'Completed' | 'In Progress' | 'Planned';
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectsResponse {
  results: number;
  pagination: {
    page: number;
    limit: number;
  };
  data: Project[];
}

export interface CategoriesResponse {
  status: string;
  results: number;
  data: Category[];
}
