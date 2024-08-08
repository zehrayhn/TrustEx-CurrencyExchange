import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { MDBBtn } from 'mdb-react-ui-kit';

export default function MainPageHaberveDoviz() {
  return (
    <div className="custom-page"> {/* custom-page sınıfı eklendi */}
      <Container>
        <Grid container spacing={3} style={{ marginTop: '24px' }}>
          <Grid item xs={12} style={{ padding: '16px' }}>
            <div
              style={{
                position: 'absolute',
                top: '150px',
                left: '150px',
                width: '800px',
                height: '660px',
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
