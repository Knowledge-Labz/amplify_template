import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import SyncIcon from '@mui/icons-material/Sync';
import AddIcon from '@mui/icons-material/Add';
import WiggleWrapper from 'src/utils/wiggle-wrapper';
import RefreshingWrapper from 'src/utils/refreshing-wrapper';

function EnhancedTableToolbar(props) {
    const { numSelected, 
            fetchAllUsers, 
            createUser, 
            userName, 
            setUserName,
            isLoading } = props;
    const [showDrawer, setShowDrawer] = React.useState(false);
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Users
          </Typography>
        )}    
          <WiggleWrapper>
          <Tooltip title="Stop">
            <IconButton disabled={true}>
              <StopIcon />
            </IconButton>
          </Tooltip>
          </WiggleWrapper>
          <WiggleWrapper>
            <Tooltip title="Start">
              <IconButton disabled={true}>
                <PlayArrowIcon />
              </IconButton>
            </Tooltip>
          </WiggleWrapper>
          <WiggleWrapper>
            <Tooltip title="Terminate">
              <IconButton disabled={true}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </WiggleWrapper>
          {!isLoading ? // if
          <WiggleWrapper>
            <Tooltip title="Refresh">
              <IconButton disabled={false} 
                          onClick={() => fetchAllUsers()}>
                <SyncIcon />
              </IconButton>
            </Tooltip>
          </WiggleWrapper> 
          : // else 
          <RefreshingWrapper
            >
          <Tooltip title="Refresh">
            <IconButton disabled={true}>
                <SyncIcon/>
              </IconButton>
            </Tooltip>
          </RefreshingWrapper>}
          <WiggleWrapper>
          <Tooltip title="Create">
            <IconButton onClick={setShowDrawer} 
                        disabled={isLoading}>
              <AddIcon />
            </IconButton>
          </Tooltip>
          </WiggleWrapper>
      <Drawer
            anchor="top"
            open={showDrawer}
            onClose={() => setShowDrawer(false)}
            >
              <br />
      <Grid 
        container 
        spacing={3}>
          <Grid item
                xs={1}>
          </Grid>
          <Grid item 
                xs={2}>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              fullWidth
              value={userName}
              onChange={(e) => setUserName(e.target.value)}

            />
            </Grid>
        <Grid item 
              xs={2}>
            <Button
              variant="contained"
              onClick={() => {
                createUser(userName)
                setShowDrawer(false)}}
              >
              Create
            </Button>
        </Grid>
      </Grid>
        <br />
    </Drawer>
      </Toolbar>
    );
  }
  
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

export default EnhancedTableToolbar;   