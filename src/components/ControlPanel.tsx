import React from 'react';

import { Layout, Button, AvatarInline, Sidebar, Icon, Table } from 'ebs-design';

import styles from './ControlPanel.module.scss';

const ControlPanel: React.FC = () => {
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
          data={[
            {
              name: 'afwa gawgag',
              id: '44',
              email: 'afagawg@gmail.com',
              gender: 'Masculin',
            },
            {
              name: 'afffasfasfwa gaaawgag',
              id: '4',
              email: '1231412412@gmail.com',
              gender: 'Masculin',
            },
            {
              name: 'aaaaaa bbbbbbbbb',
              id: '454',
              email: 'awfawf2222g@gmail.com',
              gender: 'Masculin',
            },
            {
              name: 'awgawga gawfawag',
              id: '414',
              email: 'afagagawgawgwg@gmail.com',
              gender: 'Masculin',
            },
          ]}
          size='medium'
        />
      </Layout.Content>
      <Layout.Footer />
    </Layout>
  );
};

export default ControlPanel;
