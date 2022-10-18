import axios from 'axios';

import { useQuery } from 'react-query';

import { Post } from '../../../types/usertype';
import PostCard from '../components/PostCard';

const Posts: React.FC = () => {
  const { data } = useQuery(
    ['post'],
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
      <div>
        {data?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
};

export default Posts;
