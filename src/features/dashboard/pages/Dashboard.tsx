import React from 'react';

import axios from 'axios';

import { useQuery } from 'react-query';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { User } from '../../../types/usertype';

const Dashboard: React.FC = () => {
  const user = useQuery(
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

  const post = useQuery(
    ['post'],
    () => {
      return axios
        .get<User[]>(`http://localhost:3001/posts`)
        .then((data) => data.data);
    },

    {
      onError: (error: any) => {
        alert(error);
      },
    }
  );

  const data = [
    {
      name: 'Page A',
      users: user.data?.length,
      posts: post.data?.length,
      amt: 100,
    },
  ];
  return (
    <ResponsiveContainer width='100%' aspect={2}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='posts' fill='#8884d8' />
        <Bar dataKey='users' fill='#82ca9d' />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Dashboard;
