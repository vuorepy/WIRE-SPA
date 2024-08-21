export interface IThread {
  id: string;
  createdBy: string;
  title: string;
  category: string;
  createdDate: string;
}

export interface ICreateThread {
  title: string;
  category: string;
}
