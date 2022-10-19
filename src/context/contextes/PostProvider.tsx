import React from 'react';

import PostProviderProps from '../../types/postProviderProps';

import { PostContext } from './PostContext';

export const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
  const [popUp, setPopUp] = React.useState(false);
  const [postId, setPostId] = React.useState<number>(0);

  const getPostId = (id: number) => {
    setPostId(id);
    setPopUp((prev) => !prev);
  };

  const changeStatePopUp = () => {
    setPopUp((prev) => !prev);
  };

  const value = React.useMemo(
    () => ({ popUp, changeStatePopUp, postId, getPostId }),
    [popUp, postId]
  );

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};
