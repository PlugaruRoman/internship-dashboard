import React from 'react';

import {
  Routes,
  Route,
  Link,
  useLocation,
  Navigate,
  useNavigate,
} from 'react-router-dom';

import { Layout, Button, AvatarInline, Sidebar, Icon } from 'ebs-design';

import Users from 'features/users/pages/Users';
import Posts from 'features/posts/pages/Posts';
import Dashboard from 'features/dashboard/Dashboard';

import styles from './ControlPanel.module.scss';

const ControlPanel: React.FC = () => {
  const location = useLocation();
  const token = localStorage.getItem('Token');
  const navigate = useNavigate();
  let name: any = React.useRef();

  if (localStorage.getItem('user')) {
    name = Object.values(JSON.parse(localStorage.getItem('user') || ''))[0];
  }

  const onClickLockButton = React.useCallback(() => {
    localStorage.removeItem('Token');
    localStorage.removeItem('user');
    navigate('/login');
  }, [navigate]);

  if (!token) {
    return <Navigate to={'/login'} replace />;
  } else {
    return (
      <Layout>
        <Layout.Topbar>
          <Layout.Topbar.Toggler />
          <Layout.Topbar.Title>Control Panel</Layout.Topbar.Title>
          <Layout.Topbar.RightSide>
            <Button type='ghost' icon='lock' onClick={onClickLockButton} />
            <AvatarInline alt={name} status='active' reversed />
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
            <Route path='/posts/*' element={<Posts />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Routes>
        </Layout.Content>
        <Layout.Footer />
      </Layout>
    );
  }
};

export default ControlPanel;
