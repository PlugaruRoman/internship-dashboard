import React from 'react';

import axios from 'axios';

import { Modal, Space, Button, Icon } from 'ebs-design';

import { usePost } from '../../../context';

import styles from './PostModal.module.scss';

const PostModal: React.FC = () => {
  const { changeStatePopUp, postId } = usePost();

  const onClickDeletePost = () => {
    axios.delete(`http://localhost:3001/posts/${postId}`);
    changeStatePopUp();
  };

  return (
    <Modal closeOnClickOutside mask open size='small' title='Delete Post'>
      <div className={styles.text}>Are you sure you want to delete post?</div>
      <Space justify='space-between'>
        <Button className={styles.button} onClick={changeStatePopUp}>
          Cancel
        </Button>
        <Button
          className={styles.button}
          onClick={onClickDeletePost}
          prefix={<Icon type='check' />}
          type='primary'
        >
          Confirm
        </Button>
      </Space>
    </Modal>
  );
};

export default PostModal;
