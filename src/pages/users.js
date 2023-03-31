import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { UsersList } from '../components/users/users-list';
import { DashboardLayout } from '../components/dashboard-layout';

const Cases = () => (
  <>
    <Head>
      <title>
        Users from pages/users.js
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container >
        <Box>
            <UsersList />
        </Box>
      </Container>
    </Box>
  </>
);
Cases.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Cases;
