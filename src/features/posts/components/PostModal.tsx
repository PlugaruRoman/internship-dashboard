import { Modal, Space, Button, Icon } from 'ebs-design';

const PostModal: React.FC = () => {
  return (
    <Modal closeOnClickOutside mask open size='regular' title='Example'>
      Sunteti siguri ca doriti sa stergeti postarea?
      <Space justify='space-between'>
        <Button>Cancel</Button>
        <Button prefix={<Icon type='check' />} type='primary'>
          Confirm
        </Button>
      </Space>
    </Modal>
  );
};

export default PostModal;
