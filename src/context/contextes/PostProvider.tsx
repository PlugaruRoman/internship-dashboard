import React from 'react';

import { PostContext } from './PostContext';

import PostProviderProps from 'types/postProviderProps';
import { User } from 'types/usertype';

export const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
  const [postPopUp, setPostPopUp] = React.useState<boolean>(false);
  const [postId, setPostId] = React.useState<number>(0);

  const [userPopUp, setUserPopUp] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<User | undefined>();

  const getPostId = (id: number) => {
    setPostId(id);
    setPostPopUp((prev) => !prev);
  };

  const getUser = (user: User) => {
    setUser(user);
    setUserPopUp((prev) => !prev);
  };

  const changeStatePostPopUp = () => {
    setPostPopUp((prev) => !prev);
  };

  const changeStateUserPopUp = React.useCallback(() => {
    setUserPopUp((prev) => !prev);
    if (user) {
      setUser(undefined);
    }
  }, [user]);

  const value = React.useMemo(
    () => ({
      postPopUp,
      changeStatePostPopUp,
      postId,
      getPostId,
      userPopUp,
      changeStateUserPopUp,
      getUser,
      user,
      setUser,
    }),
    [postPopUp, postId, userPopUp, user, changeStateUserPopUp, setUser]
  );

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};
