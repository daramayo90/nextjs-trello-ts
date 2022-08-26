import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import { Layout } from '../components/layout';

const Home: NextPage = () => {
  return (
    <>
      <Layout title='Hello world'>
        <Typography variant='h1' color='primary'>
          Hello World
        </Typography>
      </Layout>
    </>
  );
};

export default Home;
