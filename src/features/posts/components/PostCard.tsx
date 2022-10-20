import React from 'react';

import { Link } from 'react-router-dom';

import { Button, Card, Row, Space, Col } from 'ebs-design';

import PostModal from './PostModal';

import { usePost } from 'context';

import { PostCardProps } from 'types/postCardProps';

import styles from './PostCard.module.scss';

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { postPopUp, getPostId } = usePost();

  return (
    <>
      {postPopUp && <PostModal />}

      <div className={styles.card}>
        <Card collapsible size='small'>
          <Space align='center' justify='space-between'>
            <Space align='center'>
              <h2 className={styles.title}>Title: {post.title}</h2>
            </Space>
            <div>
              <Link to={`/posts/${post.id}/edit`}>
                <Button
                  onClick={() => getPostId(post.id)}
                  className={styles.button}
                  type='primary'
                >
                  Edit
                </Button>
              </Link>
              <Button
                className={styles.button}
                onClick={() => getPostId(post.id)}
              >
                Delete
              </Button>
            </div>
          </Space>
          <Row className='mb-16'>
            <Col size={8}>
              <div className={styles.postDescription}>{post.description}</div>
            </Col>
            <Col>{<img src={post.img} alt='post img' />}</Col>
          </Row>
          <Col size={3}>
            <div className={styles.postDate}>Post date : {post.date}</div>
          </Col>
        </Card>
      </div>
    </>
  );
};

export default PostCard;
