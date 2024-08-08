import React from 'react';
import { Container, Grid, Typography, Button } from '@mui/material';
import { MDBBtn } from 'mdb-react-ui-kit';


export default function MainPage() {
  return (
    <div
    >
      <Container>
        <Grid container spacing={3} style={{ marginTop: '24px' }}>
          <Grid item xs={12} style={{ padding: '16px' }}>
          <Typography
            variant="h4"
            style={{
              position: 'relative', 
              top: '52px', 
              left: '963px',
              transform: 'translateX(-50%)', 
              color: 'white',
              zIndex: 10 
            }}
          >
            Hızlı Ve Güvenilir İşlemler
          </Typography>
            <Button
              color="inherit"
              variant="contained"
              sx={{
                position: 'fixed',
                top: '800px',
                left: '1650px',
                width: '150px',
                height: '50px',
                backgroundColor: '#ffffff',
                color: '#000000',
                '&:hover': { backgroundColor: '#f0f0f0' },
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.4)'
              }}
            >
              Canlı Destek
            </Button>
            <Button
              color="inherit"
              variant="contained"
              sx={{
                position: 'fixed',  
                top: '800px',
                left: '150px',
                width: '150px',
                height: '50px',
                backgroundColor: '#ffffff',
                color: '#000000',
                '&:hover': { backgroundColor: '#f0f0f0' },
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.4)'
              }}
            >
              Anlık Döviz Kurları
            </Button>
            <div
              style={{
                position: 'absolute',
                top: '740px',
                left: '450px',
                width: '1000px',
                height: '600px',
                backgroundColor: '#062065',
                color: 'white',
                padding: '50px',
                borderRadius: '4px',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 1)'
              }}
            >
              <Typography
                variant="h5"
                style={{ marginTop: '-30px', marginLeft: '-10px' }}
              >
                Haberler
              </Typography>
              <MDBBtn
                color="link"
                rippleColor="light"
                style={{ marginTop: '10px', marginLeft: '120px' }}
              >
                Panel Link
              </MDBBtn>
              <img
                src="https://via.placeholder.com/150"
                alt="Örnek Resim"
                style={{
                  width: '100px',
                  height: '75px',
                  marginLeft: '-10px',
                  marginTop: '-30px',
                }}
              />
              <MDBBtn
                color="link"
                rippleColor="light"
                style={{
                  position: 'absolute',
                  marginTop: '10px',
                  marginLeft: '120px',
                }}
              >
                Panel Link
              </MDBBtn>
              <img
                src="https://via.placeholder.com/150"
                alt="Örnek Resim"
                style={{
                  position: 'absolute',
                  width: '100px',
                  height: '75px',
                  marginLeft: '-10px',
                  marginTop: '10px',
                }}
              />
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
