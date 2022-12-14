import React from 'react';

import axios from 'axios';

import { Link } from 'react-router-dom';

import { Form, Input, Select, Checkbox, Button } from 'ebs-design';

import { USER_REGEX, MAIL_REGEX, PWD_REGEX } from 'utils/validation';

import styles from './RegisterPage.module.scss';

const RegisterPage: React.FC = () => {
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

  const [selectedGender, setSelectedGender] = React.useState<string | number>(
    ''
  );

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
        role: 'User',
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
            <span className={styles.message}>Successfully ! </span>
            <Link to='/login'>
              <Button type='ghost' size='large'>
                Sign In
              </Button>
            </Link>
          </div>
        ) : (
          <Form onSubmitCapture={onClickSubmitForm} className={styles.form}>
            <div className={styles.registerInfo}>
              <span className={styles.formTitle}>Sign Up</span>
              <span className={styles.titleText}>
                Already have an account?
                <Link to='/login'>
                  <b className={styles.titleTextBlue}> Sign In</b>
                </Link>
              </span>
            </div>
            <Input
              className={styles.input}
              type='text'
              id='firstname'
              autoComplete='off'
              onChange={onChangeFirstName}
              value={firstName}
              aria-invalid={validFirstName ? 'false' : 'true'}
              required
              placeholder='First Name'
              size='large'
            />
            <p
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
              id='userlastname'
              autoComplete='off'
              onChange={onChangeLastName}
              value={lastName}
              aria-invalid={validLastName ? 'false' : 'true'}
              required
              placeholder='Last Name'
              size='large'
            />
            <p
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
              autoComplete='off'
              onChange={onChangeMail}
              value={mail}
              aria-invalid={validMail ? 'false' : 'true'}
              required
              placeholder='E-mail'
              size='large'
            />
            <p
              className={
                mail && !validMail ? styles.instructions : styles.offscreen
              }
            >
              Please enter a valid email address.
            </p>
            <Select
              className={styles.input}
              valueMode='regular'
              id='selectgender'
              onChange={onChangeSelectInput}
              value={selectedGender}
              placeholder='Select Gender'
              size='large'
              options={[
                {
                  text: 'Male',
                  value: 'Male',
                },
                {
                  text: 'Female',
                  value: 'Female',
                },
                {
                  text: 'hide',
                  value: 'hiden',
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
              placeholder='Password'
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
              placeholder='Confirm Password'
              size='large'
            />
            <p
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
              onChange={changeCheckedBox}
              checked={isChecked}
              text='I agree with the processing of personal data'
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
