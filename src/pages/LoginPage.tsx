import React from 'react';

import { Link } from 'react-router-dom';

import { Form, Input } from 'ebs-design';

import styles from './LoginPage.module.scss';

const LoginPage: React.FC = () => {
  const userRef = React.useRef<HTMLInputElement>(null);
  const errRef = React.useRef();

  const [user, setUser] = React.useState<string | number>('');
  const [pwd, setPwd] = React.useState<string | number>('');
  const [errMsg, setErrMsg] = React.useState<string>('');

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

  React.useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  React.useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  return (
    <div className={styles.loginPage}>
      <h2 className={styles.loginTitle}>Panoul de administrare</h2>
      <div className={styles.loginContent}>
        <Form
          onSubmitCapture={onSubmitForm}
          className={styles.form}
          type='vertical'
        >
          <h2 className={styles.formTitle}>Sign In</h2>

          <p
            ref={errRef.current}
            className={errMsg ? styles.errMsg : styles.offscreen}
            aria-live='assertive'
          >
            {errMsg}
          </p>

          <Input
            className={styles.input}
            type='text'
            id='email'
            autoComplete='off'
            ref={userRef}
            onChange={onChangeUser}
            required
            value={user}
            placeholder='E-mail'
            size='large'
          />
          <Input
            className={styles.input}
            type='password'
            id='password'
            ref={userRef}
            onChange={onChangePwd}
            value={pwd}
            placeholder='Parola'
            size='large'
          />
          <Link to='/'>
            <button
              className={pwd && user ? styles.button : styles.disabled}
              type='submit'
              disabled={!pwd || !user ? true : false}
            >
              Conectează-te
            </button>
          </Link>

          <div className={styles.bottomText}>
            Nu ai parola?
            <Link to='/register'>
              <b className={styles.blueText}>Înregistrează-te</b>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
