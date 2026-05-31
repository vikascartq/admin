export interface ICaseStudyItem {
  order: number;
  title: string;
  description: string;
  list?: string[];
}

export interface ICaseStudyForm {
  _id?: string;
  title: string;
  subHeading: string;
  challenge: string;
  description: string;
  content: ICaseStudyItem[];
}
