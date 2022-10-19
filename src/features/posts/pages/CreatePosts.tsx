import React from 'react';

import axios from 'axios';

import { Button, Form, Input, Textarea } from 'ebs-design';

import styles from './CreatePosts.module.scss';
import { Link } from 'react-router-dom';

const CreatePosts: React.FC = () => {
  const userRef = React.useRef<HTMLInputElement>(null);

  const [title, setTitle] = React.useState<string | number>('');

  const [description, setDescription] = React.useState<string | number>('');

  const [img, setImg] = React.useState<string | number>('');

  const [date, setDate] = React.useState<string | number>('');

  const [success, setSuccess] = React.useState<boolean>(false);

  const onChangeTitle = React.useCallback(
    (value: React.SetStateAction<string | number>) => {
      setTitle(value);
    },
    []
  );

  const onChangeDescription = React.useCallback(
    (value: React.SetStateAction<string | number>) => {
      setDescription(value);
    },
    []
  );

  const onChangeImg = React.useCallback(
    (value: React.SetStateAction<string | number>) => {
      setImg(value);
    },
    []
  );

  const onChangeDate = React.useCallback(
    (value: React.SetStateAction<string | number>) => {
      setDate(value);
    },
    []
  );

  const onClickSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3001/posts`, {
        title,
        description,
        img,
        date,
        id: Date.now(),
      });
      setSuccess(true);
    } catch (err) {
      alert('error');
    }
  };

  return (
    <div>
      {success ? (
        <div className={styles.onSuccesForm}>
          <span className={styles.succes}>Successfully ! </span>
          <div>
            <Link to='/posts'>
              <Button type='ghost' size='large'>
                Move to posts
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <Form onSubmitCapture={onClickSubmitForm} className={styles.form}>
          <div className={styles.createPostInfo}>
            <span className={styles.formTitle}>Create new Post</span>
          </div>
          <Input
            className={styles.input}
            type='text'
            id='title'
            onChange={onChangeTitle}
            ref={userRef}
            required
            placeholder='Title'
            size='large'
            value={title}
          />

          <Textarea
            className={styles.input}
            id='description'
            onChange={onChangeDescription}
            placeholder='Description'
            value={description}
          />

          <Input
            className={styles.input}
            id='img'
            type='text'
            onChange={onChangeImg}
            ref={userRef}
            required
            placeholder='Image link (https://example.com/photos/1@2$3%4)'
            size='large'
            value={img}
          />

          <Input
            className={styles.input}
            id='date'
            type='date'
            onChange={onChangeDate}
            ref={userRef}
            required
            placeholder='Date'
            size='large'
            value={date}
          />

          <div className={styles.submitButton}>
            <button
              className={
                title && description && date ? styles.button : styles.disabled
              }
              type='submit'
              disabled={!title || !description || !date ? true : false}
            >
              ADD POST
            </button>
          </div>
        </Form>
      )}
    </div>
  );
};

export default CreatePosts;
