import React from 'react';

import axios from 'axios';

import { useQuery } from 'react-query';

import { Link, useParams } from 'react-router-dom';

import { Button, Form, Input, Textarea } from 'ebs-design';

import styles from './EditPost.module.scss';
import { Post } from '../../../types/postCardProps';
import { usePost } from '../../../context';

const EditPost: React.FC = () => {
  const { changeStatePopUp } = usePost();
  const userRef = React.useRef<HTMLInputElement>(null);

  const { id } = useParams();

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

  const { data } = useQuery(
    ['post', id],
    () => {
      return axios
        .get<Post>(`http://localhost:3001/posts/${id}`)
        .then((data) => data.data);
    },
    {
      onError: (error: any) => {
        alert(error);
      },
    }
  );

  const onClickSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/posts/${id}`, {
        title: title ? title : data?.title,
        description: description ? description : data?.description,
        img: img ? img : data?.img,
        date: date ? date : data?.date,
        id: data?.id,
      });
      setSuccess(true);
    } catch (err) {
      alert('error');
    }
  };

  return (
    <>
      {success ? (
        <div className={styles.onSuccesForm}>
          <span className={styles.succes}>Successfully ! </span>
          <div>
            <Link to='/posts'>
              <Button onClick={changeStatePopUp} type='ghost' size='large'>
                Move to posts
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        data && (
          <Form onSubmitCapture={onClickSubmitForm} className={styles.form}>
            <div className={styles.createPostInfo}>
              <span className={styles.formTitle}>Edit Post</span>
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
              value={title ? title : data.title}
            />

            <Textarea
              className={styles.input}
              id='description'
              onChange={onChangeDescription}
              placeholder='Description'
              value={description ? description : data.description}
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
              value={img ? img : data.img}
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
              value={date ? date : data.date}
            />

            <div className={styles.submitButton}>
              <button
                className={'a' ? styles.button : styles.disabled}
                type='submit'
                disabled={!'a' ? true : false}
              >
                EDIT POST
              </button>
            </div>
          </Form>
        )
      )}
    </>
  );
};

export default EditPost;
