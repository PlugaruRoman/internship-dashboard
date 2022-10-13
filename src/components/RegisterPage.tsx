import React from 'react';

import { Link } from 'react-router-dom';

import { Form, Input, Select, Checkbox, Button, Icon } from 'ebs-design';

import styles from './RegisterPage.module.scss';

const useInput = (initialValue: string | number) => {
  const [value, setValue] = React.useState(initialValue);
  const [isDirty, setDirty] = React.useState(false);

  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  const onBlur = (e: any) => {
    setDirty(true);
  };

  return { value, onChange, onBlur };
};

const RegisterPage: React.FC = () => {
  const email = useInput('');
  const password = useInput('');

  return (
    <div className={styles.registerPage}>
      <div className={styles.registerContent}>
        <Form className={styles.form}>
          <div className={styles.registerInfo}>
            <span className={styles.formTitle}>Sign Up</span>
            <span className={styles.titleText}>
              Already have an account?
              <Link to='/login'>
                <b className={styles.blueText}> Sign In</b>
              </Link>
            </span>
          </div>
          <Input
            className={styles.input}
            type='text'
            onChange={function noRefCheck() {}}
            placeholder='Nume'
            size='large'
          />
          <Input
            className={styles.input}
            type='text'
            onChange={function noRefCheck() {}}
            placeholder='Prenume'
            size='large'
          />
          <Input
            className={styles.input}
            type='email'
            placeholder='Email'
            size='large'
            value={email.value}
            onChange={(e) => email.onChange(e)}
            onBlur={(e) => email.onBlur(e)}
          />
          <Select
            className={styles.input}
            mode='single'
            onChange={function noRefCheck() {}}
            placeholder='Gender'
            size='large'
            valueMode='regular'
          ></Select>
          <Input
            className={styles.input}
            prefix={<Icon type='eye' />}
            type='password'
            placeholder='Parola'
            size='large'
            value={password.value}
            onChange={(e) => password.onChange(e)}
            onBlur={(e) => password.onBlur(e)}
          />
          <Input
            className={styles.input}
            prefix={<Icon type='eye' />}
            type='password'
            onChange={function noRefCheck() {}}
            placeholder='Confirmare parola'
            size='large'
          />
          <Checkbox
            className={styles.input}
            checkAlign='left'
            text='Sunt deacord cu prelucrarea datelor personale'
          />
          <Button className={styles.button} size='large' type='ghost'>
            Sign-Up
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
