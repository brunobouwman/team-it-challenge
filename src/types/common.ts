export enum LayoutEnum {
  LIST = "LIST",
  GRID = "GRID",
}

export interface IPost {
  author: string;
  content: string;
  description: string;
  id: number;
  publish_date: string;
  slug: string;
  title: string;
}

export interface IComment {
  content: string;
  date: string;
  id: number;
  parent_id: number | null;
  postID: number;
  user: string;
}

export interface ILocation {
  post: IPost;
}
