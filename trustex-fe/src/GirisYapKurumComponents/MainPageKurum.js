import React, { useState } from 'react';
import { Container, Grid, Typography, Button } from '@mui/material';
import { MDBBtn, MDBInput, MDBCheckbox, MDBBtnGroup } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

export default function MainPageKurum() {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const handleBireyselClick = () => {
    navigate('/bireysel-giris');
  };

  const handleKurumsalClick = () => {
    navigate('/kurumsal-giris');
  };

  return (
    <div>
      <Container>
        <Grid container spacing={3} style={{ marginTop: '24px' }}>
          <Grid item xs={12} style={{ padding: '16px' }}>
            <Button
              color="inherit"
              variant="contained"
              sx={{ position: 'absolute', top: '800px', left: '200px', width: '150px', height: '50px', backgroundColor: "#ffffff", color: '#000000', '&:hover': { backgroundColor: '#f0f0f0' } }}
            >
              Canlı Destek
            </Button>
            <div
              style={{ position: 'absolute', top: '175px', left: '1152px', width: '575px', height: '540px', backgroundColor: 'lightskyblue', color: 'white', padding: '50px', borderRadius: '4px' }}
            >
             <MDBBtnGroup aria-label='Basic example' style={{ position: 'relative', top: '80px', left: '78px', width: '300px', height: '60px', }}>
                <MDBBtn  href='#' active onClick={handleBireyselClick}
                  style={{ backgroundColor: 'white', color: 'black',  borderRight: '1px solid black', 
                     display: 'flex',  alignItems: 'center',justifyContent: 'center'}}>
                  Bireysel
                </MDBBtn>
                <MDBBtn href='#' active onClick={handleKurumsalClick}
                style={{ backgroundColor: 'white', color: 'black',  borderLeft: '1px solid black', 
                  display: 'flex',  alignItems: 'center',justifyContent: 'center'}}>
                  Kurumsal
                </MDBBtn>
              </MDBBtnGroup>
              <Typography variant="h4" style={{ marginTop: '-60px', marginLeft: '40px', whiteSpace: 'nowrap', color: 'black' }}>
                Hızlı Ve Güvenilir İşlemler
              </Typography>
              <div className="absolute w-[400px] h-[50px] bg-darkblue text-white p-[50px] rounded-lg" style={{ top: '70px', left: '80px' }}>
                <MDBInput label="Kurumsal Müşteri No" id="KMN" type="text" className="w-1/2 h-10 mt-20 ml-0 bg-white text-black" />
              </div>
              <div className="absolute w-[400px] h-[50px] bg-darkblue text-white p-[50px] rounded-lg" style={{ top: '120px', left: '80px' }}>
                <MDBInput label="Bireysel Müşteri No" id="BMN" type="text" className="w-1/2 h-10 mt-20 ml-0 bg-white text-black" />
              </div>
              <div className="absolute w-[400px] h-[50px] bg-darkblue text-white p-[50px] rounded-lg" style={{ top: '170px', left: '80px' }}>
                <MDBInput label="Şifre" id="form1" type="ŞifreK" className="w-1/2 h-10 mt-20 ml-0 bg-white text-black" />
              </div>
            </div>
            <div style={{ position: 'relative', marginTop: '490px', marginLeft: '920px' }}>
              <MDBCheckbox
                id='controlledCheckbox'
                label={<span className="text-white">Beni Hatırla</span>}
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
            </div>
            <Button
              color="inherit"
              variant="contained"
              sx={{ position: 'absolute', top: '570px', left: '1350px', width: '150px', height: '50px', backgroundColor: "#ffffff", color: '#000000', '&:hover': { backgroundColor: '#f0f0f0' } }}
            >
              Giriş Yap
            </Button>
            <Typography variant="h8" style={{ position: 'absolute', top: '635px', left: '1270px', whiteSpace: 'nowrap', color: 'black' }}>
              Üye Değil Misin?
            </Typography>
            <a href="#" className="stretched-link" style={{ position: 'absolute', top: '635px', left: '1390px', color: 'black',textDecoration: 'underline' }}>Müşterimiz Ol</a>
            <a href="#" className="stretched-link" style={{ position: 'absolute', top: '635px', left: '1500px', color: 'white',textDecoration: 'underline' }}>Şifremi Unuttum</a>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
