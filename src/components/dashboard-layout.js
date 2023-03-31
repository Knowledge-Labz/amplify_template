import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DashboardSidebar } from './dashboard-sidebar';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%'
}));

export const DashboardLayout = (props) => {
  const { children } = props;
  return (
    <>
      <DashboardLayoutRoot>
        <Box
          style={{ backgroundColor: '#f4f6f8',  }}
          sx={{
            display: 'flex',
            flex: 'auto',
            flexDirection: 'column',
            width: '100%'
          }}
        >
          <DashboardSidebar/>
          {children}
        </Box>
      </DashboardLayoutRoot>
    </>
  );
};
