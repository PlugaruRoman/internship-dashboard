import React from 'react';

import { Button, Form, Input } from 'ebs-design';

import styles from './LoginModal.module.scss';

const LoginPage: React.FC = () => {
  return (
    <div className={styles.loginContent}>
      <Form
        className={styles.form}
        controlOptions={{
          col: {
            size: 6,
          },
        }}
        labelOptions={{
          col: {
            size: 2,
          },
        }}
        type='vertical'
      >
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
        <div>
          Nu ai parola?
          <b className={styles.blueText}>Înregistrează-te</b>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
