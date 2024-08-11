import React, { useState } from 'react';
import { Container, Grid, Typography, Button, TextField } from '@mui/material';
import { MDBBtn, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CountrySelect from 'react-bootstrap-country-select';
import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import haber1 from '../images/haber1.jpg';
import haber2 from '../images/haber2.jpg';
import haber3 from '../images/haber3.jpg';
import haber4 from '../images/haber4.jpg';
import haber5 from '../images/haber5.jpg';


export default function MainPageMüsteriEkle() {
  const [checked, setChecked] = useState(false);
  const [startDate, setStartDate] = useState(new Date()); 
  const [selectedCountry, setSelectedCountry] = useState(null);
  const minDate = new Date('1900-01-01');
  const maxDate = new Date('2024-12-31');
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [country, setCountry] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [email, setEmail]=useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    country: "",
    mobilePhone: "",
    idNumber: "",
    email: "",
    dateOfBirth: "",
    confirmPassword: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleFetchError = (res) => {
    return res.json().then((json) => {
      if (json.errors && Array.isArray(json.errors)) {
        setErrorMessages([json.errors[0]]);
      } else {
        setErrorMessages(["Bir hata oluştu"]);
      }
    }).catch(() => {
      setErrorMessages(["Hata mesajı alınamadı."]);
       setSnackbarOpen(true);
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendRegisterRequest = () => {
    const body = {
      idNumber: idNumber,
      lastname: lastname,
      firstname: firstname,
      password: password,
      country: country,
      mobilePhone: mobilePhone,
      dateOfBirth: dateOfBirth,
      email: email,
      confirmPassword: confirmPassword,
      userType: "INDIVIDUAL"}
    

    fetch("http://localhost:9090/auth/register", {
      
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
    .then((res) => {
      if (!res.ok) {
        return handleFetchError(res);
      }
      return res.json();
    })
    .then((result) => {
      if (result && result.token) {
        localStorage.setItem("tokenKey", result.token);
        localStorage.setItem("currentUser", result.userId);
        localStorage.setItem("userName", idNumber);
        localStorage.setItem("userPassword", password);
        setSuccessMessage("Kullanıcı başarılı bir şekilde kaydedildi");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000); 
        setSnackbarOpen(true)
        Navigate("/auth");
      }
    });
  };

  const handleRegisterButton = () => {
    console.log("ID Number:", idNumber);
    setErrorMessages([]);
    sendRegisterRequest();

     {
      setIdNumber("");
      setFirstname("");
      setLastname("");
      setCountry("");
      setDateOfBirth("");
      setMobilePhone("");
      setEmail("");
      setConfirmPassword("");
    } 
  };

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
              style={{ position: 'absolute', top: '150px', left: '650px', width: '650px', height: '600px', 
              backgroundColor: '#031a55', color: 'white', padding: '50px', borderRadius: '4px'}}>      
              <Typography variant="h4" style={{ position: 'absolute', marginTop: '-15px', marginLeft: '125px', whiteSpace: 'nowrap', color: 'white' }}>
                Bireysel Müşteri Ekle
              </Typography>
              <div className="absolute w-[300px]h-[50px] bg-darkblue text-white rounded-lg" style={{ top: '100px', left: '70px', zIndex: 10 }} >
                <MDBInput label="Ad" id="firstname" type="text" className="w-1/2 h-10 mt-2 ml-0 bg-white text-black" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
              </div>

              <div className="absolute w-[200px] h-[50px] bg-darkblue text-white rounded-lg" style={{ top: '100px', left: '355px', zIndex: 10 }} >
                <MDBInput label="Soyad" id="form1" type="soyad" className="w-1/2 h-10 mt-2 ml-0 bg-white text-black" value={lastname} onChange={(e) => setLastname(e.target.value)} />
              </div>

              <div className="absolute w-[210px] h-[50px] bg-darkblue text-white rounded-lg" style={{ top: '175px', left: '70px', zIndex: 10 }} >
                <MDBInput label="Kimlik No" id="form6" type="KN" className="w-1/2 h-10 mt-2 ml-0 bg-white text-black" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} />
              </div>

              <div className="absolute w-[300px]h-[50px] bg-darkblue text-white rounded-lg" style={{ top: '250px', left: '70px', zIndex: 10 }}>
                <MDBInput label="Cep Telefonu" id="form2" type="CT" className="w-1/2 h-10 mt-2 ml-0 bg-white text-black" value={mobilePhone} onChange={(e) => setMobilePhone(e.target.value)} />
              </div>
              <div className="absolute w-[200px] h-[50px] bg-darkblue text-white  rounded-lg" style={{ top: '175px', left: '355px', zIndex: 1 }} >
              <MDBInput label="E-posta" id="form3" type="EP" className="w-1/2 h-10 mt-2 ml-0 bg-white text-black" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="absolute w-[220px] h-[50px] bg-darkblue text-white rounded-lg" style={{ top: '325px', left: '65px', zIndex: 10, padding: '5px' }}>
                <MDBInput label="Personel No" id="form7" type="password" className="w-1/2 h-10 mt-0 ml-0 bg-white text-black" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
             
              
              <div className="absolute w-[300px] h-[50px] bg-darkblue text-white p-[50px] rounded-lg" style={{ top: '257px', left: '305px' }} value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)}  >
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
              <div className="absolute w-[200px] h-[50px] bg-darkblue text-white rounded-lg" style={{ top: '235px', left: '355px' }}>
                <label style={{ color: 'white' }}>Ülke</label>
                <CountrySelect
                  value={selectedCountry}
                  onChange={(country) => setSelectedCountry(country)}
                  classes="form-control"
                />
                <Button
                    color="inherit"
                    variant="contained"
                    sx={{ position: 'absolute', top: '200px', left: '-140px', width: '200px', height: '40px', 
                    backgroundColor: "#0033a8", color: 'white', '&:hover': { backgroundColor: '#35aaff' } }} >
                    Kaydol
              </Button>
              </div>        
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}