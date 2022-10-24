import React from 'react';

import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom';

import { Form, Input } from 'ebs-design';

import styles from './LoginPage.module.scss';

const LoginPage: React.FC = () => {
  const [user, setUser] = React.useState<string | number>('');
  const [pwd, setPwd] = React.useState<string | number>('');

  const navigate = useNavigate();

  const onChangeUser = (value: React.SetStateAction<string | number>) => {
    setUser(value);
  };

  const onChangePwd = (value: React.SetStateAction<string | number>) => {
    setPwd(value);
  };

  const onClickSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios
        .post(`https://tribes.devebs.net/users/login`, {
          email: user,
          password: pwd,
        })
        .then((res) => {
          localStorage.setItem('user', res.config.data);
          localStorage.setItem('Token', res.data.access);
        });

      await axios
        .get(`https://tribes.devebs.net/users/all-admin`, {
          headers: {
            Authorization: 'Token ' + localStorage.getItem('Token'),
          },
        })
        .then((res) => navigate('/'));
    } catch (err) {
      alert('incorrect username or  password');
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContent}>
        <Form
          onSubmitCapture={onClickSubmitForm}
          className={styles.form}
          type='vertical'
        >
          <h2 className={styles.formTitle}>Sign In</h2>
          <Input
            className={styles.input}
            type='text'
            id='email'
            autoComplete='off'
            onChange={onChangeUser}
            value={user}
            required
            placeholder='E-mail'
            size='large'
          />
          <Input
            className={styles.input}
            type='password'
            id='password'
            onChange={onChangePwd}
            value={pwd}
            placeholder='Password'
            size='large'
          />

          <button
            className={pwd && user ? styles.button : styles.disabled}
            type='submit'
            disabled={!pwd || !user ? true : false}
          >
            Sign-In
          </button>

          <div className={styles.bottomText}>
            Need an Account ?
            <Link to='/register'>
              <b className={styles.bottomTextBlue}>Sign-Up</b>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
