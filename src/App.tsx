import React from 'react';

import { Routes, Route } from 'react-router-dom';

import { QueryClientProvider, QueryClient } from 'react-query';

import { PostProvider } from './context';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ControlPanel from './pages/ControlPanel';

import 'ebs-design/dist/styles/index.scss';
import styles from './styles/App.module.scss';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PostProvider>
        <div className={styles.app}>
          <Routes>
            <Route path='/*' element={<ControlPanel />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
          </Routes>
        </div>
      </PostProvider>
    </QueryClientProvider>
  );
};

export default App;
