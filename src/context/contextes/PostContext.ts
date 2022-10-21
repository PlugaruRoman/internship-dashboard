import React from 'react';
import { User } from 'types/usertype';

export interface PostContextProps {
  postPopUp: boolean;
  changeStatePostPopUp: () => void;
  postId: number;
  getPostId: (id: number) => void;
  userPopUp: boolean;
  changeStateUserPopUp: () => void;
  user: User | undefined;
  getUser: (user: User) => void;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

export const PostContext = React.createContext<PostContextProps>({
  postPopUp: false,
  changeStatePostPopUp: () => {},
  postId: 0,
  getPostId: () => {},
  userPopUp: false,
  changeStateUserPopUp: () => {},
  user: undefined,
  getUser: () => {},
  setUser: () => {},
});
