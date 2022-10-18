import React from 'react';

import { PostContext } from './PostContext';

export const usePost = () => React.useContext(PostContext);
