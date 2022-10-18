import { Modal, Space, Button, Icon } from 'ebs-design';

import axios from 'axios';

import styles from './PostModal.module.scss';
import { Post } from '../../../types/usertype';

type PostCardProsp = {
  post: Post;
  popUp: boolean;
};

const PostModal: React.FC<PostCardProsp> = ({ post, popUp }) => {
  const deletePost = (id: Post['id']) => {
    axios.delete(`http://localhost:3001/posts/${id}`);
  };

  return (
    <Modal
      closeOnClickOutside
      mask
      open
      size='small'
      title='Are you sure you want to delete this post?'
    >
      <div className={styles.text}>
        Sunteti siguri ca doriti sa stergeti postarea?
      </div>
      <Space justify='space-between'>
        <Button>Cancel</Button>
        <Button
          prefix={<Icon type='check' />}
          type='primary'
          onClick={() => deletePost(post['id'])}
        >
          Confirm
        </Button>
      </Space>
    </Modal>
  );
};

export default PostModal;
