export interface IServices {
  status: string;
  results: number;
  data: Data[];
}

export interface Data {
  isActive: boolean;
  _id: string;
  icon: string;
  title: string;
  description: string;
}
