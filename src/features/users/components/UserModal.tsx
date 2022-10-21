import React from 'react';

import axios from 'axios';

import { Button, Modal, Form, Input, Select } from 'ebs-design';

import { usePost } from 'context';

import { UserModalProps } from 'types/usertype';

import { MAIL_REGEX, USER_REGEX } from 'utils/validation';

import styles from './UserModal.module.scss';

const EditUserModal: React.FC<UserModalProps> = (props) => {
  const isEdit = props.mode === 'edit';

  const { changeStateUserPopUp } = usePost();

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
      isEdit
        ? await axios.put(
            `http://localhost:3001/users/${
              isEdit ? props.user.id : Date.now()
            }`,
            {
              id: isEdit ? props.user.id : Date.now(),
              firstName: firstName ? firstName : isEdit && props.user.firstName,
              lastName: lastName ? lastName : isEdit && props.user.lastName,
              mail: mail ? mail : isEdit && props.user.mail,
              selectedGender: selectedGender
                ? selectedGender
                : isEdit && props.user.selectedGender,
              pwd: isEdit && props.user.pwd,
              isChecked: isEdit ? props.user.isChecked : true,
              role: role ? role : isEdit && props.user.role,
            }
          )
        : await axios.post(`http://localhost:3001/users`, {
            id: Date.now(),
            firstName,
            lastName,
            mail,
            selectedGender,
            pwd: 1234,
            isChecked: true,
            role,
          });

      changeStateUserPopUp();
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
    <Modal
      closeOnClickOutside={false}
      mask
      open
      size='small'
      title={isEdit ? 'Edit User' : 'Add User'}
    >
      <Form onSubmitCapture={onClickSubmitForm} className={styles.form}>
        <Input
          className={styles.input}
          type='text'
          id='firstname'
          autoComplete='off'
          onChange={onChangeFirstName}
          value={firstName ? firstName : isEdit ? props.user.firstName : ''}
          required
          placeholder='First Name'
          aria-invalid={validFirstName ? 'false' : 'true'}
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
          id='lastname'
          autoComplete='off'
          onChange={onChangeLastName}
          value={lastName ? lastName : isEdit ? props.user.lastName : ''}
          required
          placeholder='Last Name'
          aria-invalid={validLastName ? 'false' : 'true'}
          size='large'
        />
        <p
          id='uidnotesecond'
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
          value={mail ? mail : isEdit ? props.user.mail : ''}
          required
          placeholder='E-mail'
          aria-invalid={validMail ? 'false' : 'true'}
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
          onChange={onChangeSelectInput}
          value={
            selectedGender
              ? selectedGender
              : isEdit
              ? props.user.selectedGender
              : ''
          }
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
          value={role ? role : isEdit ? props.user.role : ''}
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
              isEdit
                ? styles.button
                : firstName && lastName && mail && selectedGender && role
                ? styles.button
                : styles.disabled
            }
            type='submit'
            disabled={
              isEdit
                ? false
                : !firstName || !lastName || !mail || !selectedGender || !role
                ? true
                : false
            }
          >
            {isEdit ? 'Edit-User' : 'Add-User'}
          </button>
        </div>
      </Form>

      <Button className={styles.buttons} onClick={changeStateUserPopUp}>
        Cancel
      </Button>
    </Modal>
  );
};

export default EditUserModal;
