import React from 'react';

import { Routes, Route } from 'react-router-dom';

import { QueryClientProvider, QueryClient } from 'react-query';

import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ControlPanel from './components/ControlPanel';

import 'ebs-design/dist/styles/index.scss';
import styles from './styles/App.module.scss';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.app}>
        <div>
          <Routes>
            <Route path='/' element={<ControlPanel />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
          </Routes>
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default App;
