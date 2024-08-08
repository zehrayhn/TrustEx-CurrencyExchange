import React, { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Button, FormControl, FormLabel, OutlinedInput, Snackbar, Alert, Container, Paper, Typography, Grid, TextField } from "@mui/material";
import axios from "axios";


function ResetPassword() {

    const [newPassword, setNewPassword] = useState('');
    
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [token, setToken] = useState('');
    const [errorMessages, setErrorMessages] = useState([]);


 
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
    

    const handleResetPassword = async () => {
        try {
            const response = await axios.put('/auth/reset-password', 
                { password: newPassword,
                  confirmPassword: confirmPassword,  
                 }, // JSON formatında gönder
                {
                    params: { token },
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            setMessage(response.data);
            setError('');
        } catch (err) {
            if (err.response && err.response.data && err.response.data.errors) {
                setErrorMessages(err.response.data.errors);
            } else {
                setErrorMessages(["Şifre sıfırlama işlemi sırasında bir hata oluştu."]);
            }
            setMessage('');
        }
    }
    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ padding: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Şifre Sıfırlama
                </Typography>
                <form onSubmit={(e) => { e.preventDefault(); handleResetPassword(); }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="token"
                                label="Sıfırlama Token'ı"
                                value={token}
                                onChange={(e) => setToken(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                type="password"
                                id="newPassword"
                                label="Yeni Şifre"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                type="password"
                                id="confirmPassword"
                                label="Yeni Şifre Onay"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Şifreyi Sıfırla
                            </Button>

                            {errorMessages.length > 0 && (
                <div>
                    {errorMessages.map((errMsg, index) => (
                        <Typography key={index} color="red" variant="body2" sx={{ marginTop: 2 }}>
                            {errMsg}
                        </Typography>
                    ))}
                </div>
            )}
                        </Grid>
                    </Grid>
                </form>
                {message && <Typography color="green" variant="body2" sx={{ marginTop: 2 }}>{message}</Typography>}
                {error && <Typography color="red" variant="body2" sx={{ marginTop: 2 }}>{error}</Typography>}
            </Paper>
        </Container>
    );
  }
  

export default ResetPassword;