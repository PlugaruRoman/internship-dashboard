import React from 'react';

import { Link } from 'react-router-dom';

import { Form, Input, Select, Checkbox, Button } from 'ebs-design';

import styles from './RegisterPage.module.scss';
import axios from 'axios';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const MAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const RegisterPage: React.FC = () => {
  const userRef = React.useRef<HTMLInputElement>(null);
  const errRef = React.useRef();

  const [user, setUser] = React.useState('');
  const [validName, setValidName] = React.useState(false);
  const [userFocus, setUserFocus] = React.useState(false);

  const [userSecondName, setUserSecondName] = React.useState('');
  const [validSecondName, setValidSecondName] = React.useState(false);
  const [userFocusSecond, setUserFocusSecond] = React.useState(false);

  const [userMail, setUserMail] = React.useState('');
  const [validMail, setValidMail] = React.useState(false);
  const [userFocusMail, setUserFocusMail] = React.useState(false);

  const [pwd, setPwd] = React.useState('');
  const [validPwd, setValidPwd] = React.useState(false);
  const [pwdFocus, setPwdFocus] = React.useState(false);

  const [matchPwd, setMatchPwd] = React.useState('');
  const [validMatch, setValidMatch] = React.useState(false);
  const [matchFocus, setMatchFocus] = React.useState(false);

  const [isChecked, setIsChecked] = React.useState(false);

  const [selectedGender, setSelectedGender] = React.useState('');

  const [errMsg, setErrMsg] = React.useState('');
  const [success, setSuccess] = React.useState(false);

  const changeCheckedBox = () => {
    setIsChecked((prev) => !prev);
  };

  const onSubmitForm = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/users`, {
        user,
        userSecondName,
        userMail,
        selectedGender,
        pwd,
        isChecked,
      });
      setSuccess(true);
      console.log(response.data);
    } catch (err) {
      alert('error');
    }
  };

  const onChangeSelectInput = (event: any) => {
    setSelectedGender(event);
  };

  React.useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  React.useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  React.useEffect(() => {
    const result = USER_REGEX.test(userSecondName);
    setValidSecondName(result);
  }, [userSecondName]);

  React.useEffect(() => {
    const result = MAIL_REGEX.test(userMail);
    setValidMail(result);
  }, [userMail]);

  React.useEffect(() => {
    const result = PWD_REGEX.test(pwd);
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
        {success ? (
          <div className={styles.onSuccesForm}>
            <span className={styles.succes}>Succes ! </span>
            <div>
              <Link to='/login'>
                <Button type='ghost' size='large'>
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <Form onSubmitCapture={onSubmitForm} className={styles.form}>
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
                className={errMsg ? styles.errmsg : styles.offscreen}
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
              aria-invalid={validName ? 'false' : 'true'}
              aria-describedby='uidnote'
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              placeholder='Nume'
              size='large'
            />
            <p
              id='uidnote'
              className={
                userFocus && user && !validName
                  ? styles.instructions
                  : styles.offscreen
              }
            >
              4 to 24 characters . Must begin with a letter. Letters , numbers ,
              underscores , hyphens allowed .
            </p>
            <Input
              className={styles.input}
              type='text'
              id='usersecondname'
              ref={userRef}
              autoComplete='off'
              onChange={(e) => setUserSecondName(String(e))}
              required
              aria-invalid={validSecondName ? 'false' : 'true'}
              aria-describedby='uidnotesecond'
              onFocus={() => setUserFocusSecond(true)}
              onBlur={() => setUserFocusSecond(false)}
              placeholder='Prenume'
              size='large'
            />
            <p
              id='uidnotesecond'
              className={
                userFocusSecond && userSecondName && !validSecondName
                  ? styles.instructions
                  : styles.offscreen
              }
            >
              4 to 24 characters . Must begin with a letter. Letters , numbers ,
              underscores , hyphens allowed .
            </p>
            <Input
              className={styles.input}
              type='email'
              id='usermail'
              ref={userRef}
              autoComplete='off'
              onChange={(e) => setUserMail(String(e))}
              required
              aria-invalid={validMail ? 'false' : 'true'}
              aria-describedby='uidnotemail'
              onFocus={() => setUserFocusMail(true)}
              onBlur={() => setUserFocusMail(false)}
              placeholder='Email'
              size='large'
            />
            <p
              id='uidnotemail'
              className={
                userFocusMail && userMail && !validMail
                  ? styles.instructions
                  : styles.offscreen
              }
            >
              Please enter a valid email address.
            </p>
            <Select
              className={styles.input}
              onChange={onChangeSelectInput}
              placeholder='Select Gender'
              size='large'
              value={selectedGender?.valueOf()}
              options={[
                {
                  text: 'Masculin',
                  value: 'masculin',
                },
                {
                  text: 'Feminin',
                  value: 'feminin',
                },
                {
                  text: 'Ma abtin',
                  value: '---',
                },
              ]}
            />
            <Input
              className={styles.input}
              type='password'
              id='password'
              onChange={(e) => setPwd(String(e))}
              required
              aria-invalid={validPwd ? 'false' : 'true'}
              aria-describedby='pwdnote'
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              placeholder='Parola'
              size='large'
            />
            <p
              id='pwdnote'
              className={
                pwdFocus && !validPwd ? styles.instructions : styles.offscreen
              }
            >
              8 to 24 characters. Must include uppercase and lowercase letters ,
              a number and a special characters.
              <b> Allowed special characters: ! @ # $ %</b>
            </p>
            <Input
              className={styles.input}
              type='password'
              id='confirmpassword'
              onChange={(e) => setMatchPwd(String(e))}
              required
              aria-invalid={validMatch ? 'false' : 'true'}
              aria-describedby='confirmnote'
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
              placeholder='Confirmare parola'
              size='large'
            />
            <p
              id='confirmnote'
              className={
                matchFocus && !validMatch
                  ? styles.instructions
                  : styles.offscreen
              }
            >
              Must match the first password input field.
            </p>
            <Checkbox
              className={styles.input}
              checkAlign='left'
              id='check'
              checked={isChecked}
              onChange={changeCheckedBox}
              text='Sunt deacord cu prelucrarea datelor personale'
            />
            <div className={styles.submitButton}>
              <button
                className={
                  validName &&
                  validSecondName &&
                  validMail &&
                  validPwd &&
                  validMatch &&
                  isChecked
                    ? styles.button
                    : styles.disabled
                }
                type='submit'
                disabled={
                  !validName ||
                  !validSecondName ||
                  !validMail ||
                  !validPwd ||
                  !validMatch ||
                  !isChecked
                    ? true
                    : false
                }
              >
                Sign-Up
              </button>
            </div>
          </Form>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
