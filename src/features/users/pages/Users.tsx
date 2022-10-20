import React from 'react';

import axios from 'axios';

import { useQuery } from 'react-query';

import { useLocation } from 'react-router-dom';

import { Button, Icon, Table } from 'ebs-design';

import { usePost } from 'context';

import EditUserModal from '../components/EditUserModal';
import AddUserModal from '../components/AddUserModal';

import { User } from 'types/usertype';

import styles from './Users.module.scss';

const Users: React.FC = () => {
  const {
    changeStateUserAddPopUp,
    userAddPopUp,
    changeStateUserEditPopUp,
    userEditPopUp,
  } = usePost();

  const [user, setUser] = React.useState<User>();

  const location = useLocation();

  const getUser = (user: User) => {
    setUser(user);
    changeStateUserEditPopUp();
  };

  const onClickDeleteUser = (user: User) => {
    setUser(user);
    axios.delete(`http://localhost:3001/users/${user.id}`);
  };

  const { data } = useQuery(
    ['user', userAddPopUp, userEditPopUp, user],
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
      {userAddPopUp && <AddUserModal />}
      {userEditPopUp && user && <EditUserModal user={user} />}
      {location.pathname === '/users' && (
        <Button
          onClick={changeStateUserAddPopUp}
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
