import React from 'react';

import { PostContext } from './PostContext';

interface PostProviderProps {
  children: React.ReactNode;
}

export const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
  const value = React.useMemo(() => ({}), []);

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};
