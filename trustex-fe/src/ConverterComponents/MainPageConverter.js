import React from 'react';
import { Container, Grid, Typography, Button } from '@mui/material';
import { MDBBtn } from 'mdb-react-ui-kit';


export default function MainPageConverter() {
  return (
    <div
    >
      <Container>
        <Grid container spacing={3} style={{ marginTop: '24px' }}>
          <Grid item xs={12} style={{ padding: '16px' }}>
          <Typography
            variant="h3"
            style={{
              position: 'relative', 
              top: '110px', 
              left: '700px',
              transform: 'translateX(-50%)', 
              color: 'Black',
              zIndex: 10, 
              width: '1400px'
            }}>
            Güvenilir, Global, Döviz Kuru Çeviricisi & Para Transferi
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
                backgroundColor: 'beyaz',
                color: '#000000',
                '&:hover': { backgroundColor: '#f0f0f0' },
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
              }}
            >
              Canlı Destek
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
