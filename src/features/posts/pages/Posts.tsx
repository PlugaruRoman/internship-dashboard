import React from 'react';

import axios from 'axios';

import { Link, Route, Routes, useLocation } from 'react-router-dom';

import { useQuery } from 'react-query';

import { Button, Icon } from 'ebs-design';

import { usePost } from 'context';

import PostCard from '../components/PostCard';

import CreatePosts from './CreatePosts';
import EditPost from './EditPost';

import { Post } from 'types/postCardProps';

const Posts: React.FC = () => {
  const { postPopUp } = usePost();
  const location = useLocation();

  const { data } = useQuery(
    ['post', location.pathname, postPopUp],
    () => {
      return axios
        .get<Post[]>(`http://localhost:3001/posts`)
        .then((data) => data.data);
    },

    {
      onError: (error: any) => {
        alert(error);
      },
    }
  );

  return (
    <>
      {location.pathname === '/posts' && (
        <Link to={'/posts/create'}>
          <Button prefix={<Icon type='edit' />} size='large' type='primary'>
            Create new Post
          </Button>
        </Link>
      )}

      {location.pathname === '/posts' &&
        data?.map((post) => <PostCard key={post.id} post={post} />)}

      <Routes>
        <Route path='/create' element={<CreatePosts />} />
        <Route path='/:id/edit' element={<EditPost />} />
      </Routes>
    </>
  );
};

export default Posts;
