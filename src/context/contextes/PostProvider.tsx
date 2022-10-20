import React from 'react';

import { PostContext } from './PostContext';

import PostProviderProps from 'types/postProviderProps';

export const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
  const [postPopUp, setPostPopUp] = React.useState<boolean>(false);
  const [postId, setPostId] = React.useState<number>(0);
  const [userAddPopUp, setUserAddPopUp] = React.useState<boolean>(false);
  const [userEditPopUp, setUserEditPopUp] = React.useState<boolean>(false);

  const getPostId = (id: number) => {
    setPostId(id);
    setPostPopUp((prev) => !prev);
  };

  const changeStatePostPopUp = () => {
    setPostPopUp((prev) => !prev);
  };

  const changeStateUserAddPopUp = () => {
    setUserAddPopUp((prev) => !prev);
  };

  const changeStateUserEditPopUp = () => {
    setUserEditPopUp((prev) => !prev);
  };

  const value = React.useMemo(
    () => ({
      postPopUp,
      changeStatePostPopUp,
      postId,
      getPostId,
      userAddPopUp,
      changeStateUserAddPopUp,
      userEditPopUp,
      changeStateUserEditPopUp,
    }),
    [postPopUp, postId, userAddPopUp, userEditPopUp]
  );

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};
