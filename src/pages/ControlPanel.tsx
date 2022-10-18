import React from 'react';

import { Routes, Route, Link, useLocation } from 'react-router-dom';

import { Layout, Button, AvatarInline, Sidebar, Icon } from 'ebs-design';

import styles from './ControlPanel.module.scss';
import Users from '../features/users/pages/Users';
import Posts from '../features/posts/pages/Posts';
import Dashboard from '../features/dashboard/pages/Dashboard';

const ControlPanel: React.FC = () => {
  const location = useLocation();

  return (
    <Layout>
      <Layout.Topbar>
        <Layout.Topbar.Toggler />
        <Layout.Topbar.Title>
          <Link to={'/login'}>Control Panel</Link>
        </Layout.Topbar.Title>
        <Layout.Topbar.RightSide>
          <Button type='ghost' icon='bell' />
          <AvatarInline alt='Plugaru Roman' status='active' reversed />
        </Layout.Topbar.RightSide>
      </Layout.Topbar>
      <Sidebar>
        <Sidebar.TopMenu>
          <Link to={'/users'}>
            <Sidebar.Item
              prefix={<Icon type='users' />}
              text='Users'
              active={location.pathname === '/users' ? true : false}
            />
          </Link>
          <Link to={'/posts'}>
            <Sidebar.Item
              prefix={<Icon type='message' />}
              text='Posts'
              active={location.pathname === '/posts' ? true : false}
            />
          </Link>
          <Link to={'/dashboard'}>
            <Sidebar.Item
              prefix={<Icon type='chart' />}
              text='Dashboard'
              active={location.pathname === '/dashboard' ? true : false}
            />
          </Link>
        </Sidebar.TopMenu>
        <div className={styles.displayNone}>
          <Sidebar.Options></Sidebar.Options>
        </div>
      </Sidebar>
      <Layout.Content>
        <Routes>
          <Route path='/users' element={<Users />} />
          <Route path='/posts' element={<Posts />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </Layout.Content>
      <Layout.Footer />
    </Layout>
  );
};

export default ControlPanel;
