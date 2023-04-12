import React from 'react';
import AppBar from './AppDrawer';
import './HomePage.css';
import AppDrawer from './AppDrawer';
import home1 from '../../assets/home1.PNG';
import home2 from '../../assets/home2.PNG';
import home3 from '../../assets/home3.PNG';
import Carousel from 'react-material-ui-carousel';
import { Container, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import doctor_appointment from '../../assets/doctor_appointment.jpg';
import { useHistory } from 'react-router-dom';
const HomePage = () => {
  const history = useHistory();
  return (
    <>
      <div className='app_bar_wrapper'>
        <div className='app_drawer_wrapper'>
          <AppDrawer />
        </div>
        <div style={logoImageWrapper}>
          <img
            src='https://cphospital.in/wp-content/uploads/2023/02/Picture1-removebg-preview.png'
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>
      <div className='images_wrapper'>
        <Carousel>
          <div style={hospitalImageWrapper}>
            <img
              src={home1}
              style={{
                width: '100%',
                height: '100%',
                padding: '10px 0 10px 0px',
                borderRadius: '20px',
              }}
            />
          </div>
          <div style={hospitalImageWrapper}>
            <img
              src={home2}
              style={{
                width: '100%',
                height: '100%',
                padding: '10px 0px 10px 0px',
                borderRadius: '20px',
              }}
            />
          </div>
          <div style={hospitalImageWrapper}>
            <img
              src={home3}
              style={{
                width: '100%',
                height: '100%',
                padding: '10px 0px 10px 0px',
                borderRadius: '20px',
              }}
            />
          </div>
        </Carousel>
      </div>

      <Container sx={{ mt: 4 }}>
        <Grid container justify='space-between' sx={{ px: 0.3 }}>
          <Grid xs={4} sm={12}>
            <Card
              className='card'
              onClick={() => history.push('/opdBooking')}
              sx={{
                maxWidth: 100,
                mt: '10px',
                padding: 0.3,
                borderRadius: '10px',
                boxShadow: ' 0 0 50px #ccc',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardActionArea>
                <CardMedia
                  component='img'
                  height='50px'
                  sx={{
                    width: '50px',
                    marginLeft: '24px',
                    borderRadius: '20px',
                  }}
                  image={doctor_appointment}
                  alt={'dd'}
                />

                <CardContent sx={{ mb: -2 }}>
                  <Typography gutterBottom variant='h6' component='div'>
                    {'Book Appointment'}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid xs={4} sm={12}>
            <Card
              className='card'
              sx={{
                maxWidth: 100,
                mt: '10px',
                padding: 0.3,
                borderRadius: '10px',
                boxShadow: ' 0 0 50px #ccc',
                display: 'flex',
                flexDirection: 'column',
              }}
              onClick={() => history.push('/allDoctors')}
            >
              <CardActionArea>
                <CardMedia
                  component='img'
                  height='50px'
                  sx={{
                    width: '50px',
                    marginLeft: '24px',
                    borderRadius: '30px',
                  }}
                  image={
                    'https://img.freepik.com/premium-vector/doctor-icon-avatar-white_136162-58.jpg'
                  }
                  alt={'dd'}
                />
                <CardContent sx={{ mb: -2 }}>
                  <Typography gutterBottom variant='h6' component='div'>
                    {'Find A Doctor'}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid xs={4} sm={12}>
            <Card
              className='card'
              sx={{
                maxWidth: 100,
                mt: '10px',
                padding: 0.3,
                borderRadius: '10px',
                boxShadow: ' 0 0 50px #ccc',
                display: 'flex',
                flexDirection: 'column',
              }}
              onClick={() => history.push('/appointments')}
            >
              <CardActionArea>
                <CardMedia
                  component='img'
                  height='50px'
                  sx={{
                    width: '50px',
                    marginLeft: '24px',
                    borderRadius: '20px',
                  }}
                  image={
                    '	https://cdn-icons-png.flaticon.com/512/2764/2764430.png'
                  }
                  alt={'dd'}
                />
                <CardContent sx={{ mb: -2 }}>
                  <Typography gutterBottom variant='h6' component='div'>
                    {'My Appointments'}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid xs={4} sm={12}>
            <Card
              className='card'
              sx={{
                maxWidth: 100,
                mt: '10px',
                padding: 0.3,
                borderRadius: '10px',
                boxShadow: ' 0 0 50px #ccc',
                display: 'flex',
                flexDirection: 'column',
              }}
              onClick={() => history.push('/allSpeciallity')}
            >
              <CardActionArea>
                <CardMedia
                  component='img'
                  height='50px'
                  sx={{
                    width: '50px',
                    marginLeft: '24px',
                    borderRadius: '20px',
                  }}
                  image={
                    'https://cdn-icons-png.flaticon.com/512/9493/9493285.png'
                  }
                  alt={'dd'}
                />
                <CardContent sx={{ mb: -2 }}>
                  <Typography gutterBottom variant='h6' component='div'>
                    {'Doctor Speciality'}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid xs={4} sm={12}>
            <Card
              className='card'
              sx={{
                maxWidth: 100,
                mt: '10px',
                padding: 0.3,
                borderRadius: '10px',
                boxShadow: ' 0 0 50px #ccc',
                display: 'flex',
                flexDirection: 'column',
              }}
              onClick={() => history.push('/feedback')}
            >
              <CardActionArea>
                <CardMedia
                  component='img'
                  height='50px'
                  sx={{
                    width: '50px',
                    marginLeft: '24px',
                    borderRadius: '20px',
                  }}
                  image={
                    'https://cdn-icons-png.flaticon.com/512/8862/8862785.png'
                  }
                  alt={'dd'}
                />
                <CardContent>
                  <Typography gutterBottom variant='h6' component='div'>
                    {'Feedback'}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid xs={4} sm={12}>
            <Card
              className='card'
              sx={{
                maxWidth: 100,
                mt: '10px',
                padding: 0.3,
                borderRadius: '10px',
                boxShadow: ' 0 0 50px #ccc',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardActionArea>
                <CardMedia
                  component='img'
                  height='50px'
                  sx={{
                    width: '50px',
                    marginLeft: '24px',
                    borderRadius: '20px',
                  }}
                  image={
                    'https://cdn-icons-png.flaticon.com/512/8748/8748086.png'
                  }
                  alt={'dd'}
                />
                <CardContent>
                  <Typography gutterBottom variant='h6' component='div'>
                    {'Contact Us'}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
const logoImageWrapper = {
  width: '70%',
  height: '60px',
};
const hospitalImageWrapper = {
  width: '90%',
  height: '200px',
  marginLeft: '5%',
  objectFit: 'fit',
  zIndex: 100,
  boxShadow: '3px 3px 3px 3px white',
};
export default HomePage;
