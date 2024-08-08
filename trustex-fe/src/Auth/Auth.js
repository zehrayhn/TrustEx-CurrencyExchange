import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button, FormControl, FormHelperText, FormLabel, OutlinedInput, Alert, Snackbar, TextField } from "@mui/material";

function Auth({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [country, setCountry] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [email, setEmail]=useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [taxIdNumber, setTaxIdNumber] = useState("");
  const [companyRepresentativeId, setCompanyRepresentativeId] = useState("");
  const [commercialRegistrationNumber, setCommercialRegistrationNumber] = useState("");
  const [mersisNumber, setMersisNumber] = useState("");
  const [companyTitle, setCompanyTitle] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const [isLogin, setIsLogin] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerificationField, setShowVerificationField] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isIndividual, setIsIndividual] = useState(true); // Yeni durum
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleFetchError = (res) => {
    return res.json().then((json) => {
      if (json.errors && Array.isArray(json.errors)) {
        setErrorMessages(json.errors);
      } else {
        setErrorMessages(["Bir hata oluştu"]);
      }
    }).catch(() => {
      setErrorMessages(["Hata mesajı alınamadı."]);
    });
  };

  const sendLoginRequest = () => {
    const userType = isIndividual ? "INDIVIDUAL" : "CORPORATE"; 
    fetch("http://localhost:9090/auth/send-verification-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        corporateCustomerNumber: taxIdNumber,
        userType: userType,
        idNumber: idNumber,
        password: password,
      }),
    })
    .then((res) => {
      if (!res.ok) {
        return handleFetchError(res);
      }
      return res.json();
    })
    .then((result) => {
      if (result) {
       // localStorage.setItem("tokenKey", result.token);
      //  localStorage.setItem("currentUser", result.userId);
        localStorage.setItem("userName", idNumber);
        localStorage.setItem("userPassword", password);
        setShowVerificationField(true);
        // setSuccessMessage(result.message);
        setSnackbarOpen(true);
      }
    })
    .catch((err) => {
      setErrorMessages([err.message]);
    });
  };

  const sendRegisterRequest = () => {
    const body = isIndividual ? {
      idNumber: idNumber,
      lastname: lastname,
      firstname: firstname,
      password: password,
      country: country,
      mobilePhone: mobilePhone,
      dateOfBirth: dateOfBirth,
      email: email,
      confirmPassword: confirmPassword,
      userType: "INDIVIDUAL",
    } : {
      idNumber: idNumber,
      password: password,
      taxIdNumber: taxIdNumber,
      companyRepresentativeId: companyRepresentativeId,
      commercialRegistrationNumber: commercialRegistrationNumber,
      mersisNumber: mersisNumber,
      companyTitle: companyTitle,
      email: email,
      userType: "CORPORATE",
    };

    fetch("/auth/register", {
      
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
        setMessage("Kullanıcı başarılı bir şekilde kaydedildi");
        setTimeout(() => {
          setMessage("");
        }, 3000); // 3 saniye sonra mesajı temizle
        setSnackbarOpen(true);
      //  setIsLogin(true);
        navigate("/auth");
      }
    });
  };

  const sendVerificationCode = () => {
    const userId = localStorage.getItem("currentUser");
    const idNumber = localStorage.getItem("userName"); // localStorage'dan çekiyoruz
    const password = localStorage.getItem("userPassword");

    fetch("/auth/verify-and-authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        idNumber: idNumber,
        verificationCode: verificationCode,

      }),
    })
    .then((res) => {
      if (!res.ok) {
        return handleFetchError(res);
      }
      return res.json();
    })
    .then((result) => {
      localStorage.setItem("tokenKey", result.token);
      localStorage.setItem("currentUser", result.userId);
      setSuccessMessage(result.message);
      setSnackbarOpen(true);
      onLogin();
      navigate("/");
    })
    .catch((err) => {
      setErrorMessages([err.message]);
    });
  };

  const handleLoginButton = () => {
    setErrorMessages([]);
    sendLoginRequest();
    setUsername("");
    setPassword("");
  };

  const handleRegisterButton = () => {
    console.log("ID Number:", idNumber);
    setErrorMessages([]);
    sendRegisterRequest();

    if (isIndividual) {
      setIdNumber("");
      setFirstname("");
      setLastname("");
      setCountry("");
      setDateOfBirth("");
      setMobilePhone("");
      setEmail("");
      setConfirmPassword("");
    } else {
      setTaxIdNumber("");
      setCompanyRepresentativeId("");
      setCommercialRegistrationNumber("");
      setMersisNumber("");
      setCompanyTitle("");
      setConfirmPassword("");
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleVerificationCodeSubmit = () => {
    setErrorMessages([]);
    sendVerificationCode();
  };

  const handleCustomerTypeChange = (isIndividual) => {
    setIsIndividual(isIndividual);
    console.log("Selected UserType:", isIndividual ? "Individual" : "Corporate");
  };

  return (
    <div>
      {/* Giriş Formu */}
      {isLogin ? (
        <div> <Button
        variant={isIndividual ? "contained" : "outlined"}
        onClick={() => handleCustomerTypeChange(true)}
      >
        Bireysel Müşteri Oluştur
      </Button>
      <Button
        variant={!isIndividual ? "contained" : "outlined"}
        onClick={() => handleCustomerTypeChange(false)}
      >
        Kurumsal Müşteri Oluştur
      </Button>
      {isIndividual ? (
        <>
         <FormControl fullWidth margin="normal">
            <FormLabel>Kimlik Numarası</FormLabel>
            <OutlinedInput value={idNumber} onChange={(e) => setIdNumber(e.target.value)} />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <FormLabel>Şifre</FormLabel>
            <OutlinedInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
         
        </>
      ) : (
            <>
         <FormControl fullWidth margin="normal">
                <FormLabel>Vergi Kimlik Numarası</FormLabel>
                <OutlinedInput value={taxIdNumber} onChange={(e) => setTaxIdNumber(e.target.value)} />
              </FormControl>

<FormControl fullWidth margin="normal">
            <FormLabel>Kimlik Numarası</FormLabel>
            <OutlinedInput value={idNumber} onChange={(e) => setIdNumber(e.target.value)} />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <FormLabel>Şifre</FormLabel>
            <OutlinedInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>

            </>

      
        )}
          
         

          {errorMessages.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              {errorMessages.map((message, index) => (
                <Alert key={index} severity="error">{message}</Alert>
              ))}
            </div>
          )}

          <Button
            variant="contained"
            style={{ marginTop: 40, background: 'linear-gradient(45deg, #2196F3 30%, #21cbf3 90%)', color: 'white' }}
            onClick={handleLoginButton}
          >
            Login
          </Button>

          {showVerificationField && (
            <div>
              <FormControl fullWidth margin="normal">
                <FormLabel>Doğrulama Kodu</FormLabel>
                <OutlinedInput value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
              </FormControl>

              <Button
                variant="contained"
                style={{ marginTop: 20, background: 'linear-gradient(45deg, #2196F3 30%, #21cbf3 90%)', color: 'white' }}
                onClick={handleVerificationCodeSubmit}
              >
                Kodu Onayla
              </Button>
            </div>
          )}

          <FormHelperText style={{ margin: 20 }}>
            Üye değil misiniz?{" "}
            <Button
              variant="text"
              onClick={() => setIsLogin(false)}
            >
              Kayıt Ol
            </Button>
 <div>
      {/* Mevcut form kodlarınız */}
      <Link to="/auth/forgot-password">Şifremi Unuttum</Link>
    </div>

            
          </FormHelperText>
        </div>
      ) : (
        <div>
          <Button
            variant={isIndividual ? "contained" : "outlined"}
            onClick={() => handleCustomerTypeChange(true)}
          >
            Bireysel Müşteri Oluştur
          </Button>
          <Button
            variant={!isIndividual ? "contained" : "outlined"}
            onClick={() => handleCustomerTypeChange(false)}
          >
            Kurumsal Müşteri Oluştur
          </Button>

          {isIndividual ? (
            <>
              <FormControl fullWidth margin="normal">
                <FormLabel>Ad</FormLabel>
                <OutlinedInput value={firstname} onChange={(e) => setFirstname(e.target.value)} />
              </FormControl>
             
            </>
          ) : (
            <>
              <FormControl fullWidth margin="normal">
                <FormLabel>Vergi Kimlik Numarası</FormLabel>
                <OutlinedInput value={taxIdNumber} onChange={(e) => setTaxIdNumber(e.target.value)} />
              </FormControl>
             
              <FormControl fullWidth margin="normal">
                <FormLabel>Şirket Unvanı</FormLabel>
                <OutlinedInput value={companyTitle} onChange={(e) => setCompanyTitle(e.target.value)} />
              </FormControl>

              <FormControl fullWidth margin="normal">
                <FormLabel>Ad</FormLabel>
                <OutlinedInput value={firstname} onChange={(e) => setFirstname(e.target.value)} />
              </FormControl>

            </>
          )}
           <FormControl fullWidth margin="normal">
                <FormLabel>Soyad</FormLabel>
                <OutlinedInput value={lastname} onChange={(e) => setLastname(e.target.value)} />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <FormLabel>Ülke</FormLabel>
                <OutlinedInput value={country} onChange={(e) => setCountry(e.target.value)} />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <FormLabel>Doğum Tarihi</FormLabel>
                <OutlinedInput type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <FormLabel>Telefon Numarası</FormLabel>
                <OutlinedInput value={mobilePhone} onChange={(e) => setMobilePhone(e.target.value)} />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <FormLabel>Email</FormLabel>
                <OutlinedInput value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormControl>

              <FormControl fullWidth margin="normal">
                <FormLabel>Kimlik Numarası</FormLabel>
                <OutlinedInput
    value={idNumber}
    onChange={(e) => {
      console.log("Updating ID Number:", e.target.value); // Debug için ekleyin
      setIdNumber(e.target.value);
    }}
  />
              </FormControl>

          <FormControl fullWidth margin="normal">
            <FormLabel>Parola</FormLabel>
            <OutlinedInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <FormLabel>Parolayı Onayla</FormLabel>
            <OutlinedInput type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </FormControl>

          {errorMessages.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              {errorMessages.map((message, index) => (
                <Alert key={index} severity="error">{message}</Alert>
              ))}
            </div>
          )}

          <Button
            variant="contained"
            style={{ marginTop: 40, background: 'linear-gradient(45deg, #2196F3 30%, #21cbf3 90%)', color: 'white' }}
            onClick={handleRegisterButton}
          >
            Kayıt Ol
          </Button>


          <FormHelperText style={{ margin: 20 }}>
            Zaten üye misiniz?{" "}
            <Button
              variant="text"
              onClick={() => setIsLogin(true)}
            >
              Giriş Yap
            </Button>

          </FormHelperText>
        </div>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={successMessage}
      />
    </div>
  );
}

export default Auth;