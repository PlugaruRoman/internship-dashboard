import React from 'react';

import axios from 'axios';

import { useQuery } from 'react-query';

import { Layout, Button, AvatarInline, Sidebar, Icon, Table } from 'ebs-design';

import { Users } from '../types/usertype';

import styles from './ControlPanel.module.scss';

const ControlPanel: React.FC = () => {
  const { data } = useQuery(
    ['user'],
    () => {
      return axios
        .get<Users[]>(`http://localhost:3001/users`)
        .then((data) => data.data);
    },

    {
      onError: (error: any) => {
        alert(error);
      },
    }
  );

  return (
    <Layout>
      <Layout.Topbar>
        <Layout.Topbar.Toggler />

        <Layout.Topbar.Title>Control Panel</Layout.Topbar.Title>

        <Layout.Topbar.RightSide>
          <Button type='ghost' icon='bell' />
          <AvatarInline alt='Plugaru Roman' status='active' reversed />
        </Layout.Topbar.RightSide>
      </Layout.Topbar>

      <Sidebar>
        <Sidebar.TopMenu>
          <Sidebar.Item
            prefix={<Icon type='users' />}
            text='Users'
            active={true}
          />
          <Sidebar.Item prefix={<Icon type='message' />} text='Posts' />
          <Sidebar.Item prefix={<Icon type='chart' />} text='Dashboard' />
        </Sidebar.TopMenu>

        <div className={styles.displayNone}>
          <Sidebar.Options></Sidebar.Options>
        </div>
      </Sidebar>

      {data && (
        <Layout.Content>
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
                name: `${el.user} ${el.userSecondName}`,
                id: el.id,
                email: el.userMail,
                gender: el.selectedGender,
              };
            })}
            size='medium'
          />
        </Layout.Content>
      )}

      <Layout.Footer />
    </Layout>
  );
};

export default ControlPanel;
