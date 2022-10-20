import React from 'react';

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

  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwd('');
    setUser('');
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContent}>
        <Form
          onSubmitCapture={onSubmitForm}
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
          <Link to='/'>
            <button
              className={pwd && user ? styles.button : styles.disabled}
              type='submit'
              disabled={!pwd || !user ? true : false}
            >
              Sign-In
            </button>
          </Link>
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
