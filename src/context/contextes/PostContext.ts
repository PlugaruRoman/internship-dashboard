import React from 'react';

export interface PostContextProps {
  postPopUp: boolean;
  changeStatePostPopUp: () => void;
  postId: number;
  getPostId: (id: number) => void;
  userAddPopUp: boolean;
  changeStateUserAddPopUp: () => void;
  userEditPopUp: boolean;
  changeStateUserEditPopUp: () => void;
}

export const PostContext = React.createContext<PostContextProps>({
  postPopUp: false,
  changeStatePostPopUp: () => {},
  postId: 0,
  getPostId: () => {},
  userAddPopUp: false,
  changeStateUserAddPopUp: () => {},
  userEditPopUp: false,
  changeStateUserEditPopUp: () => {},
});
