export interface ITrendItem {
  order: number;
  heading: string;
  description: string;
  list?: string[];
}

export interface ITrendsForm {
    _id?: string;
  title: string;
  subHeading: string;
  description: string;
  content: ITrendItem[];
}