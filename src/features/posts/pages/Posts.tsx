import axios from 'axios';

import { useQuery } from 'react-query';

import { Button, Icon } from 'ebs-design';

import PostCard from '../components/PostCard';

import { Link, Route, Routes, useLocation } from 'react-router-dom';

import styles from './Posts.module.scss';
import CreatePosts from './CreatePosts';
import { Post } from '../../../types/postCardProps';
import { usePost } from '../../../context';
import EditPost from './EditPost';

const Posts: React.FC = () => {
  const { popUp } = usePost();
  const location = useLocation();

  const { data } = useQuery(
    ['post', location.pathname, popUp],
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
        <Link className={styles.link} to={'/posts/create'}>
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
