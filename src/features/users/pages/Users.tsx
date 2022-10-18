import React from 'react';

import axios from 'axios';

import { useQuery } from 'react-query';

import { Table } from 'ebs-design';

import { User } from '../../../types/usertype';

const Users: React.FC = () => {
  const { data } = useQuery(
    ['user'],
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
          ]}
          data={data.map((el) => {
            return {
              name: `${el.firstName} ${el.lastName}`,
              id: el.id,
              email: el.mail,
              gender: el.selectedGender,
            };
          })}
          size='medium'
        />
      )}
    </>
  );
};

export default Users;
