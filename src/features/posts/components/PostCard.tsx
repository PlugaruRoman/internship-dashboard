import React from 'react';

import { Button, Card, Space, Table } from 'ebs-design';
import { Post } from '../../../types/usertype';

import styles from './PostCard.module.scss';
import axios from 'axios';

type PostCardProsp = {
  post: Post;
};

const PostCard: React.FC<PostCardProsp> = ({ post }) => {
  const deletePost = (id: Post['id']) => {
    axios.delete(`http://localhost:3001/posts/${id}`);
  };

  return (
    <div className={styles.card}>
      <Card className='' collapsible size='small'>
        <Space align='center' justify='space-between'>
          <Space align='center'>
            <h2 className={styles.title}>Titlu: {post.title}</h2>
          </Space>
          <div>
            <Button className={styles.button} type='primary'>
              Edit
            </Button>
            <Button
              onClick={() => deletePost(post['id'])}
              className={styles.button}
            >
              Delete
            </Button>
          </div>
        </Space>

        <Table
          columns={[
            {
              dataIndex: 'desc',
              key: 'desc',
              title: 'Descriere',
            },
            {
              dataIndex: 'img',
              key: 'img',
              title: 'Imagine',
            },
            {
              dataIndex: 'date',
              key: 'date',
              title: 'Data',
            },
          ]}
          data={[
            {
              date: post.time,
              desc: post.description,
              img: post.img,
            },
          ]}
        />
      </Card>
    </div>
  );
};

export default PostCard;
