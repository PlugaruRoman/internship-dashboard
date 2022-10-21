import React from 'react';

import axios from 'axios';

import { Link } from 'react-router-dom';

import { Form, Input } from 'ebs-design';

import styles from './LoginPage.module.scss';

const LoginPage: React.FC = () => {
  const [user, setUser] = React.useState<string | number>('');
  const [pwd, setPwd] = React.useState<string | number>('');

  const onChangeUser = (value: React.SetStateAction<string | number>) => {
    setUser(value);
  };

  const onChangePwd = (value: React.SetStateAction<string | number>) => {
    setPwd(value);
  };

  const onClickSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://tribes.devebs.net/users/login`,
        {
          email: user,
          password: pwd,
        }
      );

      if (response) {
        localStorage.setItem(
          'authorization',
          JSON.stringify(response.data.access)
        );
      }
      await axios.post(
        `https://tribes.devebs.net/users/all-admin`,
        localStorage.getItem('authorization')
      );
    } catch (err) {
      alert('error');
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
