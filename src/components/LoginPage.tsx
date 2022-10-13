import React from 'react';

import { Link } from 'react-router-dom';

import { Button, Form, Input } from 'ebs-design';

import styles from './LoginPage.module.scss';

const LoginPage: React.FC = () => {
  return (
    <div className={styles.loginPage}>
      <h2 className={styles.loginTitle}>Panoul de administrare</h2>
      <div className={styles.loginContent}>
        <Form className={styles.form} type='vertical'>
          <h2 className={styles.formTitle}>Sign In</h2>

          <Input
            className={styles.input}
            type='text'
            onChange={function noRefCheck() {}}
            placeholder='E-mail'
            size='large'
          />
          <Input
            className={styles.input}
            type='password'
            onChange={function noRefCheck() {}}
            placeholder='Parola'
            size='large'
          />
          <Button className={styles.button} size='large' type='ghost'>
            Conectează-te
          </Button>
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
