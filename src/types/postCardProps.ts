export interface Post {
  title: string;
  description: string;
  img: string;
  date: string;
  id: number;
}

export type PostCardProps = {
  post: Post;
};
