import React from 'react';

import { Link } from 'react-router-dom';

import { Form, Input, Select, Checkbox, Button, Icon } from 'ebs-design';

import styles from './RegisterPage.module.scss';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const RegisterPage: React.FC = () => {
  const userRef = React.useRef<HTMLInputElement>(null);
  const errRef = React.useRef();

  const [user, setUser] = React.useState<string>('');
  const [validName, setValidName] = React.useState(false);
  const [userFocus, setUserFocus] = React.useState(false);

  const [pwd, setPwd] = React.useState('');
  const [validPwd, setValidPwd] = React.useState(false);
  const [pwdFocus, setPwdFocus] = React.useState(false);

  const [matchPwd, setMatchPwd] = React.useState('');
  const [validMatch, setValidMatch] = React.useState(false);
  const [matchFocus, setMatchFocus] = React.useState(false);

  const [errMsg, setErrMsg] = React.useState('');
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  React.useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  React.useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  React.useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd]);

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
            <p
              ref={errRef.current}
              className={errMsg ? 'errmsg' : 'offscreen'}
              aria-live='assertive'
            >
              {errMsg}
            </p>
          </div>
          <Input
            className={styles.input}
            type='text'
            id='username'
            ref={userRef}
            autoComplete='off'
            onChange={(e) => setUser(String(e))}
            required
            aria-invalid={validName ? 'false' : true}
            aria-describedby='uidnote'
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
            placeholder='Nume'
            size='large'
          />
          <p
            id='uidnote'
            className={
              userFocus && user && !validName ? 'instructions' : 'offscreen'
            }
          >
            4 to 24 characters . Must begin with a letter. Letters , numbers ,
            underscores , hyphens allowed .
          </p>
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
