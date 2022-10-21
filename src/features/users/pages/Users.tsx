import React from 'react';

import axios from 'axios';

import { useQuery } from 'react-query';

import { useLocation } from 'react-router-dom';

import { Button, Icon, Table } from 'ebs-design';

import { usePost } from 'context';

import UserModal from '../components/UserModal';

import { User } from 'types/usertype';

import styles from './Users.module.scss';

const Users: React.FC = () => {
  const { changeStateUserPopUp, userPopUp, user, getUser, setUser } = usePost();

  const location = useLocation();

  const onClickDeleteUser = async (user: User) => {
    await axios.delete(`http://localhost:3001/users/${user.id}`);
    setUser(user);
  };

  const { data } = useQuery(
    ['user', userPopUp, user],
    () => {
      return axios
        .get<User[]>(`http://localhost:3001/users`)
        .then((data) => data.data);
    },

    {
      onError: (error: any) => {
        alert(error);
      },
    }
  );

  return (
    <>
      {userPopUp && user ? (
        <UserModal mode='edit' user={user} />
      ) : userPopUp && !user ? (
        <UserModal mode='add' />
      ) : (
        ''
      )}
      {location.pathname === '/users' && (
        <Button
          onClick={changeStateUserPopUp}
          prefix={<Icon type='edit' />}
          size='large'
          type='primary'
        >
          Add new User
        </Button>
      )}
      <div className={styles.usersTable}>
        {data && (
          <Table
            columns={[
              {
                dataIndex: 'name',
                title: 'Nume și Prenume',
              },
              {
                dataIndex: 'id',
                title: 'ID',
              },
              {
                dataIndex: 'email',
                title: 'Email',
              },
              {
                dataIndex: 'gender',
                title: 'Gender',
              },
              {
                dataIndex: 'role',
                title: 'Role',
              },
              {
                dataIndex: 'edit',
                title: 'Edit',
              },
            ]}
            data={data.map((el) => {
              return {
                name: `${el.firstName} ${el.lastName}`,
                id: el.id,
                email: el.mail,
                gender: el.selectedGender,
                role: el.role,
                edit: (
                  <div className={styles.icons}>
                    <Icon
                      onClick={() => getUser(el)}
                      className={styles.image}
                      type='edit'
                    />
                    <Icon
                      onClick={() => onClickDeleteUser(el)}
                      className={styles.image}
                      type='close'
                    />
                  </div>
                ),
              };
            })}
            size='medium'
          />
        )}
      </div>
    </>
  );
};

export default Users;
