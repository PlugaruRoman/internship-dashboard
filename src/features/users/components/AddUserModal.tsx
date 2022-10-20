import React from 'react';

import axios from 'axios';

import { Button, Modal, Form, Input, Select } from 'ebs-design';

import { usePost } from 'context';

import { MAIL_REGEX, USER_REGEX } from 'utils/validation';

import styles from './UserModal.module.scss';

const AddUserModal: React.FC = () => {
  const { changeStateUserAddPopUp } = usePost();

  const [firstName, setFirstName] = React.useState<string | number>('');
  const [validFirstName, setValidFirstName] = React.useState<boolean>(false);

  const [lastName, setLastName] = React.useState<string | number>('');
  const [validLastName, setValidLastName] = React.useState<boolean>(false);

  const [mail, setMail] = React.useState<string | number>('');
  const [validMail, setValidMail] = React.useState<boolean>(false);

  const [selectedGender, setSelectedGender] = React.useState<string>('');

  const [role, setSelectedRole] = React.useState<string>('');

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

  const onChangeSelectRole = React.useCallback((event: any) => {
    setSelectedRole(event);
  }, []);

  const onClickSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3001/users`, {
        id: Date.now(),
        firstName,
        lastName,
        mail,
        selectedGender,
        role,
      });
      changeStateUserAddPopUp();
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

  return (
    <Modal closeOnClickOutside={false} mask open size='small' title='Add User'>
      <Form onSubmitCapture={onClickSubmitForm} className={styles.form}>
        <Input
          className={styles.input}
          type='text'
          id='firstname'
          autoComplete='off'
          onChange={onChangeFirstName}
          value={firstName}
          required
          aria-invalid={validFirstName ? 'false' : 'true'}
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
          required
          aria-invalid={validLastName ? 'false' : 'true'}
          placeholder='Last Name'
          size='large'
        />
        <p
          className={
            lastName && !validLastName ? styles.instructions : styles.offscreen
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
          required
          aria-invalid={validMail ? 'false' : 'true'}
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
          id='selectgender'
          onChange={onChangeSelectInput}
          value={selectedGender?.valueOf()}
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

        <Select
          className={styles.input}
          onChange={onChangeSelectRole}
          value={role?.valueOf()}
          placeholder='Account Role'
          size='large'
          options={[
            {
              text: 'Moderator',
              value: 'Moderator',
            },
            {
              text: 'Administrator',
              value: 'Administrator',
            },
          ]}
        />

        <div className={styles.submitButton}>
          <button
            className={
              firstName && lastName && mail && selectedGender && role
                ? styles.button
                : styles.disabled
            }
            type='submit'
            disabled={
              !firstName || !lastName || !mail || !selectedGender || !role
                ? true
                : false
            }
          >
            Add-User
          </button>
        </div>
      </Form>

      <Button className={styles.buttons} onClick={changeStateUserAddPopUp}>
        Cancel
      </Button>
    </Modal>
  );
};

export default AddUserModal;
