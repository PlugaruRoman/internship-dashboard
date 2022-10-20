import React from 'react';

import axios from 'axios';

import { useQuery } from 'react-query';

import { Link, useParams } from 'react-router-dom';

import { Button, Form, Input, Textarea } from 'ebs-design';

import { usePost } from 'context';

import { Post } from 'types/postCardProps';

import styles from './EditPost.module.scss';

const EditPost: React.FC = () => {
  const { changeStatePostPopUp } = usePost();

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
          <span className={styles.succesTitle}>Successfully ! </span>
          <Link to='/posts'>
            <Button onClick={changeStatePostPopUp} type='ghost' size='large'>
              Move to posts
            </Button>
          </Link>
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
              value={title ? title : data.title}
              required
              placeholder='Title'
              size='large'
            />

            <Textarea
              className={styles.input}
              id='description'
              onChange={onChangeDescription}
              value={description ? description : data.description}
              placeholder='Description'
            />

            <Input
              className={styles.input}
              id='img'
              type='text'
              onChange={onChangeImg}
              value={img ? img : data.img}
              required
              placeholder='Image link (https://example.com/photos/1@2$3%4)'
              size='large'
            />

            <Input
              className={styles.input}
              id='date'
              type='date'
              onChange={onChangeDate}
              value={date ? date : data.date}
              required
              placeholder='Date'
              size='large'
            />

            <div className={styles.submitButton}>
              <button className={styles.button} type='submit'>
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
