import React from 'react';

import axios from 'axios';

import { Link } from 'react-router-dom';

import { Form, Input, Select, Checkbox, Button } from 'ebs-design';

import { USER_REGEX, MAIL_REGEX, PWD_REGEX } from '../utils/validation';

import styles from './RegisterPage.module.scss';

const RegisterPage: React.FC = () => {
  const userRef = React.useRef<HTMLInputElement>(null);

  const [firstName, setFirstName] = React.useState<string | number>('');
  const [validFirstName, setValidFirstName] = React.useState<boolean>(false);

  const [lastName, setLastName] = React.useState<string | number>('');
  const [validLastName, setValidLastName] = React.useState<boolean>(false);

  const [mail, setMail] = React.useState<string | number>('');
  const [validMail, setValidMail] = React.useState<boolean>(false);

  const [pwd, setPwd] = React.useState<string | number>('');
  const [validPwd, setValidPwd] = React.useState<boolean>(false);

  const [matchPwd, setMatchPwd] = React.useState<string | number>('');
  const [validMatch, setValidMatch] = React.useState<boolean>(false);

  const [isChecked, setIsChecked] = React.useState(false);

  const [selectedGender, setSelectedGender] = React.useState<string>('');

  const [success, setSuccess] = React.useState<boolean>(false);

  const onChangeFirstName = React.useCallback(
    (value: React.SetStateAction<string | number>) => {
      setFirstName(value);
    },
    []
  );

  const onChangeLastName = React.useCallback(
    (value: React.SetStateAction<string | number>) => {
      setLastName(value);
    },
    []
  );

  const onChangeMail = React.useCallback(
    (value: React.SetStateAction<string | number>) => {
      setMail(value);
    },
    []
  );

  const onChangeSelectInput = React.useCallback((event: any) => {
    setSelectedGender(event);
  }, []);

  const onChangePwd = React.useCallback(
    (value: React.SetStateAction<string | number>) => {
      setPwd(value);
    },
    []
  );

  const onChangeMatchPwd = React.useCallback(
    (value: React.SetStateAction<string | number>) => {
      setMatchPwd(value);
    },
    []
  );

  const changeCheckedBox = React.useCallback(
    (value: React.SetStateAction<boolean>) => {
      setIsChecked(value);
    },
    []
  );

  const onClickSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3001/users`, {
        id: Date.now(),
        firstName,
        lastName,
        mail,
        selectedGender,
        pwd,
        isChecked,
      });
      setSuccess(true);
    } catch (err) {
      alert('error');
    }
  };

  React.useEffect(() => {
    const result = USER_REGEX.test(String(firstName));
    setValidFirstName(result);
  }, [firstName]);

  React.useEffect(() => {
    const result = USER_REGEX.test(String(lastName));
    setValidLastName(result);
  }, [lastName]);

  React.useEffect(() => {
    const result = MAIL_REGEX.test(String(mail));
    setValidMail(result);
  }, [mail]);

  React.useEffect(() => {
    const result = PWD_REGEX.test(String(pwd));
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  return (
    <div className={styles.registerPage}>
      <div className={styles.registerContent}>
        {success ? (
          <div className={styles.onSuccesForm}>
            <span className={styles.succes}>Successfully ! </span>
            <div>
              <Link to='/login'>
                <Button type='ghost' size='large'>
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <Form onSubmitCapture={onClickSubmitForm} className={styles.form}>
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
              id='username'
              ref={userRef}
              autoComplete='off'
              onChange={onChangeFirstName}
              required
              aria-invalid={validFirstName ? 'false' : 'true'}
              aria-describedby='uidnote'
              placeholder='Nume'
              size='large'
            />
            <p
              id='uidnote'
              className={
                firstName && !validFirstName
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
              onChange={onChangeLastName}
              required
              aria-invalid={validLastName ? 'false' : 'true'}
              aria-describedby='uidnotesecond'
              placeholder='Prenume'
              size='large'
            />
            <p
              id='uidnotesecond'
              className={
                lastName && !validLastName
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
              onChange={onChangeMail}
              required
              aria-invalid={validMail ? 'false' : 'true'}
              aria-describedby='uidnotemail'
              placeholder='Email'
              size='large'
            />
            <p
              id='uidnotemail'
              className={
                mail && !validMail ? styles.instructions : styles.offscreen
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
              onChange={onChangePwd}
              required
              aria-invalid={validPwd ? 'false' : 'true'}
              aria-describedby='pwdnote'
              placeholder='Parola'
              size='large'
            />
            <p
              id='pwdnote'
              className={
                pwd && !validPwd ? styles.instructions : styles.offscreen
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
              onChange={onChangeMatchPwd}
              required
              aria-invalid={validMatch ? 'false' : 'true'}
              aria-describedby='confirmnote'
              placeholder='Confirmare parola'
              size='large'
            />
            <p
              id='confirmnote'
              className={
                matchPwd && !validMatch ? styles.instructions : styles.offscreen
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
                  validFirstName &&
                  validLastName &&
                  validMail &&
                  validPwd &&
                  validMatch &&
                  isChecked
                    ? styles.button
                    : styles.disabled
                }
                type='submit'
                disabled={
                  !validFirstName ||
                  !validLastName ||
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
