import React, { useState } from 'react';
import { Container, Grid, Typography, Button } from '@mui/material';
import { MDBBtn, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CountrySelect from 'react-bootstrap-country-select';
import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';


export default function MainPageBMOL() {
  const [checked, setChecked] = useState(false);
  const [startDate, setStartDate] = useState(new Date()); 
  const [selectedCountry, setSelectedCountry] = useState(null);
  const minDate = new Date('1900-01-01');
  const maxDate = new Date('2024-12-31');

  return (
    <div>
      <Container>
        <Grid container spacing={3} style={{ marginTop: '24px'}}>
          <Grid item xs={12} style={{ padding: '16px' }}>
            <Button
              color="inherit"
              variant="contained"
              sx={{ position: 'absolute', top: '800px', left: '1700px', width: '150px', height: '50px', 
              backgroundColor: "#ffffff", color: '#000000', '&:hover': { backgroundColor: '#f0f0f0' } }} >
              Canlı Destek
            </Button>
            <div
              style={{ position: 'absolute', top: '150px', left: '250px', width: '650px', height: '675px', 
              backgroundColor: '#031a55', color: 'white', padding: '50px', borderRadius: '4px' }}>      
              <Typography variant="h4" style={{ position: 'absolute', marginTop: '-15px', marginLeft: '125px', whiteSpace: 'nowrap', color: 'white' }}>
                Bireysel Müşteri Ol
              </Typography>
              <div className="absolute w-[300px] h-[50px] bg-darkblue text-white p-[50px] rounded-lg" style={{ top: '-20px', left: '40px' }}>
                <MDBInput label="Ad" id="form1" type="ad" className="w-1/2 h-10 mt-20 ml-0 bg-white text-black" />
              </div>
              <div className="absolute w-[300px] h-[50px] bg-darkblue text-white p-[50px] rounded-lg" style={{ top: '-20px', left: '305px' }}>
                <MDBInput label="Soyad" id="form1" type="soyad" className="w-1/2 h-10 mt-20 ml-0 bg-white text-black" />
              </div>
              <div className="absolute w-[300px] h-[50px] bg-darkblue text-white p-[50px] rounded-lg" style={{ top: '50px', left: '40px' }}>
                <MDBInput label="Kimlik No" id="form1" type="KN" className="w-1/2 h-10 mt-20 ml-0 bg-white text-black" />
              </div>
              <div className="absolute w-[300px] h-[50px] bg-darkblue text-white p-[50px] rounded-lg" style={{ top: '120px', left: '40px' }}>
                <MDBInput label="Cep Telefonu" id="form1" type="CT" className="w-1/2 h-10 mt-20 ml-0 bg-white text-black" />
              </div>
              <div className="absolute w-[300px] h-[50px] bg-darkblue text-white p-[50px] rounded-lg" style={{ top: '120px', left: '305px' }}>
                <MDBInput label="E-posta" id="form1" type="EP" className="w-1/2 h-10 mt-20 ml-0 bg-white text-black" />
              </div>
              <div className="absolute w-[300px] h-[50px] bg-darkblue text-white p-[50px] rounded-lg" style={{ top: '190px', left: '40px' }}>
                <MDBInput label="Şifre" id="form1" type="ŞifreBMOL" className="w-1/2 h-10 mt-20 ml-0 bg-white text-black" />
              </div>
              <div className="absolute w-[300px] h-[50px] bg-darkblue text-white p-[50px] rounded-lg" style={{ top: '260px', left: '40px' }}>
                <MDBInput label="Şifre Onay" id="form1" type="ŞifreBMOLO" className="w-1/2 h-10 mt-20 ml-0 bg-white text-black" />
              </div>
              <div className="absolute w-[300px] h-[50px] bg-darkblue text-white p-[50px] rounded-lg" style={{ top: '247px', left: '305px' }}>
                <label style={{ color: 'white' }}>Doğum Tarihi</label>
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="dd.MM.yyyy"
                  showYearDropdown
                  scrollableYearDropdown
                  className="form-control"
                  minDate={minDate}
                  maxDate={maxDate}
                  yearDropdownItemNumber={125}
                />
              </div>
              <div className="absolute w-[300px] h-[50px] bg-darkblue text-white p-[50px] rounded-lg" style={{ top: '110px', left: '305px' }}>
                <label style={{ color: 'white' }}>Ülke</label>
                <CountrySelect
                  value={selectedCountry}
                  onChange={(country) => setSelectedCountry(country)}
                  classes="form-control"
                />
              </div>
              
            </div>
            <div style={{ position: 'relative', marginTop: '575px', marginLeft: '-75px' }}>
              <MDBCheckbox
                id='controlledCheckbox'
                label={<span className="text-white">Kişisel Verilerin Korunması Kanunu <br />ve Aydınlatma Metnini Onaylıyorum</span>}
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
            </div>
            <Button
              color="inherit"
              variant="contained"
              sx={{ position: 'absolute', top: '540px', left: '605px', width: '200px', height: '40px', 
              backgroundColor: "#4169e1", color: '#000000', '&:hover': { backgroundColor: '#f0f0f0' } }}>
              Kaydol
            </Button>
            <Typography variant="h10" style={{ position: 'absolute', top: '695px', left: '300px', color: 'white', width: '600px' }}>
              6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında kişisel verilerinizin işlenmesinden doğan haklarınıza ve bu konudaki detaylı bilgiye
              <span style={{ display: 'inline-block', width: '5px' }}></span> 
              <a href="#" style={{ color: 'grey', textDecoration: 'underline' }}>aydınlatma metnimizden</a> ulaşabilirsiniz.
            </Typography>
            <Typography variant="h10" style={{ position: 'absolute', top: '613px', left: '620px', color: 'white', width: '600px' }}>
              TrustEx Müşterisi Misiniz?<br /> Hemen
              <span style={{ display: 'inline-block', width: '5px' }}></span> 
              <a href="#" style={{ color: 'grey', textDecoration: 'underline' }}>giriş yapın!</a> 
            </Typography>
            <div
              style={{position: 'absolute',  top: '150px',  left: '950px',  width: '650px', height: '675px',
              backgroundColor: '#031a55', color: 'white',padding: '50px',borderRadius: '4px',
              }}>
              <Typography variant="h5" style={{ marginTop: '-30px', marginLeft: '-10px'  }}>Günün Haberleri</Typography>
              <MDBBtn color='link' rippleColor='light' style={{ marginTop: '10px', marginLeft: '120px' }}>
                Panel Link
              </MDBBtn>
              <img src="https://via.placeholder.com/150" alt="Örnek Resim" style={{ width: '100px', height: '75px', marginLeft: '-10px',marginTop: '-30px' }} />
              <MDBBtn color='link' rippleColor='light' style={{position: 'absolute', marginTop: '10px', marginLeft: '120px' }}>
                Panel Link
              </MDBBtn>
              <img src="https://via.placeholder.com/150" alt="Örnek Resim" style={{  width: '100px', height: '75px', marginLeft: '-10px',marginTop: '10px' }} />
              <MDBBtn color='link' rippleColor='light' style={{position: 'absolute', marginTop: '10px', marginLeft: '120px' }}>
                Panel Link
              </MDBBtn>
              <img src="https://via.placeholder.com/150" alt="Örnek Resim" style={{  width: '100px', height: '75px', marginLeft: '-10px',marginTop: '10px' }} />
              <MDBBtn color='link' rippleColor='light' style={{position: 'absolute', marginTop: '10px', marginLeft: '120px' }}>
                Panel Link
              </MDBBtn>
              <img src="https://via.placeholder.com/150" alt="Örnek Resim" style={{  width: '100px', height: '75px', marginLeft: '-10px',marginTop: '10px' }} />
              <MDBBtn color='link' rippleColor='light' style={{position: 'absolute', marginTop: '10px', marginLeft: '120px' }}>
                Panel Link
              </MDBBtn>
              <img src="https://via.placeholder.com/150" alt="Örnek Resim" style={{  width: '100px', height: '75px', marginLeft: '-10px',marginTop: '10px' }} />
              <MDBBtn color='link' rippleColor='light' style={{position: 'absolute', marginTop: '10px', marginLeft: '120px' }}>
                Panel Link
              </MDBBtn>
              <img src="https://via.placeholder.com/150" alt="Örnek Resim" style={{  width: '100px', height: '75px', marginLeft: '-10px',marginTop: '10px' }} />
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
