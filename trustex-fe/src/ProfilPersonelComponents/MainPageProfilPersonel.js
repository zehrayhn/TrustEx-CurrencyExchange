import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Button } from '@mui/material';
import { MDBInput } from 'mdb-react-ui-kit';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CountrySelect from 'react-bootstrap-country-select';
import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';
import { useNavigate } from 'react-router-dom';

export default function MainPageProfilBirey() {
  const [isEditable, setIsEditable] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [firstname, setFirstname] = useState("Eray");
  const [lastname, setLastname] = useState("Yılmaz");
  const [country, setCountry] = useState("Turkey");
  const [mobilePhone, setMobilePhone] = useState("5555555555");
  const [idNumber, setIdNumber] = useState("12345678901");
  const [email, setEmail] = useState("eray@example.com");

  const navigate = useNavigate();

  useEffect(() => {
    setFirstname("Eray");
    setLastname("Yılmaz");
    setCountry("Turkey");
    setMobilePhone("5555555555");
    setIdNumber("12345678901");
    setEmail("eray@example.com");
    setStartDate(new Date("1990-01-01"));
    setSelectedCountry({ value: "TR", label: "Turkey" });
  }, []);

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleSaveClick = () => {
    setIsEditable(false);
    localStorage.setItem("firstname", firstname);
    localStorage.setItem("lastname", lastname);
    localStorage.setItem("country", country);
    localStorage.setItem("mobilePhone", mobilePhone);
    localStorage.setItem("idNumber", idNumber);
    localStorage.setItem("email", email);
    localStorage.setItem("dateOfBirth", startDate.toISOString());
    localStorage.setItem("selectedCountry", JSON.stringify(selectedCountry));
  };

  return (
    <div>
      <Container>
        <Grid container spacing={3} style={{ position: 'relative' }}>
          <Grid item xs={12} style={{  position: 'absolute' }}>
            <div
              style={{ position: 'absolute', top: '120px', left: '300px', width: '600px', height: '750px', 
              backgroundColor: '#031a55', color: 'white', padding: '50px', borderRadius: '4px' }}>
              <Typography variant="h4" style={{ position:'absolute',textAlign: 'center', marginTop: '-20px', color: 'white', left:'240px' }}>
                Profilim
              </Typography>
              <Typography variant="subtitle1" style={{ color: 'white', marginBottom: '5px' }}>
                Ad
              </Typography>
              <MDBInput
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                disabled={!isEditable}
                style={{ marginTop: '20px' }}
              />

              <Typography variant="subtitle1" style={{ color: 'white', marginBottom: '5px' }}>
                Soyad
              </Typography>
              <MDBInput
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                disabled={!isEditable}
                style={{ marginBottom: '10px'}}
              />

              <Typography variant="subtitle1" style={{ color: 'white', marginBottom: '5px' }}>
                Kimlik No
              </Typography>
              <MDBInput
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                disabled={!isEditable}
                style={{ marginBottom: '10px' }}
              />

              <Typography variant="subtitle1" style={{ color: 'white', marginBottom: '5px' }}>
                Telefon No
              </Typography>
              <MDBInput
                value={mobilePhone}
                onChange={(e) => setMobilePhone(e.target.value)}
                disabled={!isEditable}
                style={{ marginBottom: '10px' }}
              />

              <Typography variant="subtitle1" style={{ color: 'white', marginBottom: '5px' }}>
                E-Posta
              </Typography>
              <MDBInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditable}
                style={{ marginBottom: '10px' }}
              />

             
              <Typography variant="subtitle1" style={{ color: 'white', marginBottom: '5px' }}>
                Doğum Tarihi
              </Typography>
              <DatePicker 
                selected={startDate} 
                onChange={(date) => setStartDate(date)} 
                dateFormat="dd.MM.yyyy"
                showYearDropdown
                scrollableYearDropdown
                style={{ 
                    width: '90%', 
                    marginBottom: '20px',
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                }}
                disabled={!isEditable}
              />

           
              <Typography variant="subtitle1" style={{ color: 'white', marginBottom: '5px' }}>
                Ülke
              </Typography>
              <CountrySelect
                value={selectedCountry}
                onChange={(country) => setSelectedCountry(country)}
                style={{ 
                    width: '90%', 
                    marginBottom: '20px',
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                }}
                disabled={!isEditable}
              />
              
              <Button
                color="inherit"
                variant="contained"
                sx={{position: 'absolute', top: '680px', left: '50px', backgroundColor: '#0033a8', color: 'white', '&:hover': { backgroundColor: '#35aaff' } }} 
                onClick={isEditable ? handleSaveClick : handleEditClick}
              >
                {isEditable ? "Kaydet" : "Düzenle"}
              </Button>
              <Button
                color="inherit"
                variant="contained"
                sx={{position: 'absolute', top: '680px', left: '300px', backgroundColor: '#35aaff', color: 'white', '&:hover': { backgroundColor: '#b8dfff' } }} >
                Şifre Değiştir
              </Button>
              <Button
                color="inherit"
                variant="contained"
                sx={{position: 'absolute', top: '680px', left: '450px', backgroundColor: '#e40014', color: 'white', '&:hover': { backgroundColor: '#ff8d97' } }} >
               Çıkış Yap
              </Button>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
