import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, FormControl, FormHelperText, FormLabel, InputLabel, OutlinedInput,Alert, Snackbar, TextField } from "@mui/material";
import { Input } from "@mui/icons-material";
function Auth({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [country,  setCountry] = useState("");
  const [mobilePhone, setMobilPhone]=useState("");
  const [dateOfBirth,  setDateOfBirth] = useState("");
  const [idNumber, setidNumber]=useState("");
  const [confirmPassword,setConfirmPassword]=useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const [isLogin, setIsLogin] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const handleFetchError = (res) => {
    return res.json().then((json) => {
      if (json.errors && Array.isArray(json.errors)) {
        // `errors` anahtarının altındaki mesajları iş
        setErrorMessages(json.errors);
      } else {
        setErrorMessages(["Bir hata oluştu"]);
      }
    }).catch(() => {
      setErrorMessages(["Hata mesajı alınamadı."]);
    });
  };

  const sendLoginRequest = () => {
    fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: username,
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
      console.log("Login Response:", result); // Yanıtı konsola yazdır
      if (result && result.token && result.userId) {
        localStorage.setItem("tokenKey", result.token);
        localStorage.setItem("currentUser", result.userId);
        localStorage.setItem("userName", username);
        onLogin();
        navigate("/");
      } 
    })
    .catch((err) => {
      setErrorMessages([err.message]);
    });
  };

  const sendRegisterRequest = () => {
    fetch("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: username,
        lastname: lastname,
        firstname: firstname,
        password: password,
        country: country,
        mobilePhone: mobilePhone,
        dateOfBirth: dateOfBirth,
        idNumber: idNumber,
      }),
    })
    .then((res) => {
      if (!res.ok) {
        return handleFetchError(res);
      }
      return res.json();
    })
    .then((result) => {
      if (result && result.token && result.userId) {
        console.log("Register Response:", result);
        localStorage.setItem("tokenKey", result.token);
        localStorage.setItem("currentUser", result.userId);
        localStorage.setItem("userName", username);
        setSuccessMessage(result.message); // Başarı mesajını ayarla
        setSnackbarOpen(true); // Snackbar'ı aç
        setIsLogin(true);
        navigate("/auth");
      }
    })
  };

  const handleLoginButton = () => {
    setErrorMessages([]);
    sendLoginRequest();
    setUsername("");
    setPassword("");
  };

  const handleRegisterButton = () => {
    setErrorMessages([]);
    sendRegisterRequest();
    setUsername("");
    setFirstname("");
    setLastname("");
    setPassword("");
    setCountry("");
    setDateOfBirth("");
    setMobilPhone("");
    setidNumber("");
    setConfirmPassword("");
  };

      const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };


  return (
    <div>
  

       {/* Login Formu */}
       {isLogin ? (
        <div>

          <FormControl fullWidth margin="normal">
            <FormLabel>Username</FormLabel>
            <OutlinedInput value={username} onChange={(e) => setUsername(e.target.value)} />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <FormLabel>Password</FormLabel>
            <OutlinedInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
            onClick={handleLoginButton}
          >
            Login
          </Button>
          <FormHelperText style={{ margin: 20 }}>
            Üye değil misiniz?{" "}
            <Button
              variant="text"
              onClick={() => setIsLogin(false)}
            >
              Kayıt Ol
            </Button>
          </FormHelperText>
        </div>
      ) : (
        /* Register Formu */
        <div>
          <FormControl fullWidth margin="normal">
            <FormLabel>Ad</FormLabel>
            <OutlinedInput value={firstname} onChange={(e) => setFirstname(e.target.value)} />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <FormLabel>Soyad</FormLabel>
            <OutlinedInput value={lastname} onChange={(e) => setLastname(e.target.value)} />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <FormLabel>Ülke</FormLabel>
            <OutlinedInput value={country} onChange={(e) => setCountry(e.target.value)} />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <FormLabel>Kimlik No</FormLabel>
            <OutlinedInput value={idNumber} onChange={(e) => setidNumber(e.target.value)} />
          </FormControl>


          <FormControl fullWidth margin="normal">
            <FormLabel>Cep Telefon No</FormLabel>
            <OutlinedInput value={mobilePhone} onChange={(e) => setMobilPhone(e.target.value)} />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <FormLabel>Doğum Tarihi</FormLabel>
            <TextField
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </FormControl>


          <FormControl fullWidth margin="normal">
            <FormLabel>Username</FormLabel>
            <OutlinedInput value={username} onChange={(e) => setUsername(e.target.value)} />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <FormLabel>Password</FormLabel>
            <OutlinedInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <FormLabel>Şifre Onayı</FormLabel>
            <OutlinedInput value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </FormControl>
          {errorMessages.length > 0 && (
  <div style={{ marginBottom: 20 }}>
    {errorMessages.map((message, index) => (
      <Alert key={index} severity="error">{message}</Alert>
    ))}
  </div>)}

          <Button
            variant="contained"
            style={{ marginTop: 40, background: 'linear-gradient(45deg, #2196F3 30%, #21cbf3 90%)', color: 'white' }}
            onClick={handleRegisterButton}
          >
            Register
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
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    {successMessage}
                </Alert>
            </Snackbar>
    </div>
  );
}

export default Auth;
