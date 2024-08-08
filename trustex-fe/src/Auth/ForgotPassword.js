import { useState } from "react";
import { Button, FormControl, FormLabel, OutlinedInput, Snackbar, Alert } from "@mui/material";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  

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

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setErrorMessages([]);
    setSuccessMessage("");
    

    fetch("/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => {
        if (!res.ok) {
          return handleFetchError(res);
        }
        setSuccessMessage("Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.");
        setSnackbarOpen(true);
      })
      .then((data) => {
        if (data) {
          setSuccessMessage(data);
          setSnackbarOpen(true);
        }
      })
      .catch((err) => {
        setErrorMessages([err]);
      });
  };


  return (
    <form onSubmit={handleForgotPassword}>
      <FormControl fullWidth margin="normal">
        <FormLabel>E-posta Adresi</FormLabel>
        <OutlinedInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        Şifremi Sıfırla
      </Button>
      {errorMessages.length > 0 && (
        <Alert severity="error">
          {errorMessages.map((msg, idx) => (
            <div key={idx}>{msg}</div>
          ))}
        </Alert>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>
    </form>
  );
}

export default ForgotPassword;