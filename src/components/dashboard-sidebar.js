import { useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Drawer, useMediaQuery } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { NavItem } from './nav-item';

const items = [
  {
    href: '/',
    icon: (<AutoFixHighIcon fontSize="small" />),
    title: 'Wizard'
  },
  {
    href: '/users',
    icon: (<GroupIcon fontSize="small" />),
    title: 'Users'
  }
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
   defaultMatches: true,
   noSsr: false
  });
  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item, idx) => (
            <NavItem
              key={idx}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
      </Box>
    </>
  );

    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 72
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
