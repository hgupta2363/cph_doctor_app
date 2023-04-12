import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import { useContext } from 'react';
import { AuthContex } from '../../contextProvider/authContextProvider';
import InfoIcon from '@mui/icons-material/Info';
import MailIcon from '@mui/icons-material/Mail';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import './AppDrawer.css';
import { getAuth, signOut } from 'firebase/auth';
import {
  showErrorMsg,
  msgPosition,
} from '../../contextProvider/toastMessegeProvider';
import { useHistory } from 'react-router-dom';
const anchor = 'left';
const auth = getAuth();
const AppDrawer = () => {
  const [state, setState] = React.useState(false);
  const { isLoggedIn, userData } = useContext(AuthContex);
  const history = useHistory();
  const handleLogOut = async () => {
    try {
      await signOut(auth);
      history.push('/login');
    } catch (err) {
      showErrorMsg({ position: msgPosition.BOTTOM_RIGHT, msg: err });
    }
  };
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState(open);
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 300 }}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {isLoggedIn ? (
        <>
          <div className='user_avatar_wrapper'>
            <div className='user_info_wrapper'>
              <Avatar
                sx={{
                  bgcolor: 'white',
                  width: '40px',
                  height: '40px',
                  color: '#246BFD',
                }}
                variant='circle'
              >
                {userData?.name && userData.name[0]}
              </Avatar>
              <div style={{ display: 'felx', flexDirection: 'column' }}>
                <p className='user_info_text'>{userData?.name}</p>
                <p className='user_info_text'>{userData?.age}</p>
              </div>
            </div>
          </div>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon
                  style={{ color: '#246BFD', width: '20px', height: '20px' }}
                />
              </ListItemIcon>
              <ListItemText
                primary={'Home'}
                primaryTypographyProps={{ fontSize: '16px' }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => history.push('/userInfoForm', { backScreen: '/' })}
            >
              <ListItemIcon>
                <EditIcon
                  style={{ color: '#246BFD', width: '20px', height: '20px' }}
                />
              </ListItemIcon>
              <ListItemText
                primary={'Edit Profile'}
                primaryTypographyProps={{ fontSize: '16px' }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => history.push('/appointments')}>
              <ListItemIcon>
                <CalendarMonthIcon
                  style={{ color: '#246BFD', width: '20px', height: '20px' }}
                />
              </ListItemIcon>
              <ListItemText
                primary={'My Appointments'}
                primaryTypographyProps={{ fontSize: '16px' }}
              />
            </ListItemButton>
          </ListItem>
        </>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '20px',
          }}
        >
          <p style={{ fontSize: '12px' }}>Please login for better experience</p>
          <button
            onClick={() => history.push('/login')}
            className='login_signup_button'
          >
            Login/signUp
          </button>
        </div>
      )}
      <List>
        {/* <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary={} />
          </ListItemButton>
        </ListItem> */}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <InfoIcon
                style={{ color: '#246BFD', width: '20px', height: '20px' }}
              />
            </ListItemIcon>
            <ListItemText
              primary={'About Us'}
              primaryTypographyProps={{ fontSize: '16px' }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <MailIcon
                style={{ color: '#246BFD', width: '20px', height: '20px' }}
              />
            </ListItemIcon>
            <ListItemText
              primary={'Contact Us'}
              primaryTypographyProps={{ fontSize: '16px' }}
            />
          </ListItemButton>
        </ListItem>
        {isLoggedIn ? (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogOut}>
                <ListItemIcon>
                  <LogoutIcon
                    style={{ color: '#246BFD', width: '20px', height: '20px' }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={'Logout'}
                  primaryTypographyProps={{ fontSize: '16px' }}
                />
              </ListItemButton>
            </ListItem>
          </>
        ) : null}
      </List>
    </Box>
  );
  return (
    <div>
      <React.Fragment key={anchor}>
        <Button onClick={toggleDrawer(true)}>
          <MenuIcon
            style={{ color: '#246BFD', width: '30px', height: '30px' }}
          />
        </Button>
        <Drawer anchor={anchor} open={state} onClose={toggleDrawer(false)}>
          {list(anchor)}
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default AppDrawer;
