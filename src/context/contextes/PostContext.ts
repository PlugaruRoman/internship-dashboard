import React from 'react';

export interface PostContextProps {
  popUp: boolean;
  changeStatePopUp: () => void;
  postId: number;
  getPostId: (id: number) => void;
}

export const PostContext = React.createContext<PostContextProps>({
  popUp: false,
  changeStatePopUp: () => {},
  postId: 0,
  getPostId: () => {},
});
