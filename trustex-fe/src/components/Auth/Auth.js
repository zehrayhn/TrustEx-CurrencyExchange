import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, FormControl, FormHelperText, FormLabel, InputLabel, OutlinedInput,Alert } from "@mui/material";
import { Input } from "@mui/icons-material";
function Auth({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
  
    const handleUsername = (value) => {
      setUsername(value);
    }
  
    const handlePassword = (value) => {
      setPassword(value);
    }
  
    const handleFirstname = (value) => {
      setFirstname(value);
    }
  
    const handleLastname = (value) => {
      setLastname(value);
    }
  
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
      }).then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.message ? data.message.join(", ") : "response hatalı");
          });
        }
        return res.json();
      })
      .then((result) => {
        localStorage.setItem("tokenKey", result.token);
        localStorage.setItem("currentUser", result.userId);
        localStorage.setItem("userName", username);
        onLogin();
        navigate("/");
      })
      .catch((err) => {
        setErrorMessage(err.message);
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
        }),
      })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.message ? data.message.join(", ") : "response hatalı");
          });
        }
        return res.json();
      })
      .then((result) => {
        localStorage.setItem("tokenKey", result.token);
        localStorage.setItem("currentUser", result.userId);
        localStorage.setItem("userName", username);
        onLogin();
        navigate("/");
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
    };
  
    const handleLoginButton = () => {
      setErrorMessage("");
      sendLoginRequest();
      setUsername("");
      setPassword("");
    };
  
    const handleRegisterButton = () => {
      setErrorMessage("");
      sendRegisterRequest();
      setUsername("");
      setFirstname("");
      setLastname("");
      setPassword("");
    };
  
    return (
      <div>
        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
        <FormControl fullWidth margin="normal">
          <FormLabel>Username</FormLabel>
          <OutlinedInput value={username} onChange={(e) => setUsername(e.target.value)} />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <FormLabel>Password</FormLabel>
          <OutlinedInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        {!isLogin && (
          <>
            <FormControl fullWidth margin="normal">
              <FormLabel>Firstname</FormLabel>
              <OutlinedInput value={firstname} onChange={(e) => setFirstname(e.target.value)} />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <FormLabel>Lastname</FormLabel>
              <OutlinedInput value={lastname} onChange={(e) => setLastname(e.target.value)} />
            </FormControl>
          </>
        )}
        <Button
          variant="contained"
          style={{ marginTop: 40, background: 'linear-gradient(45deg, #2196F3 30%, #21cbf3 90%)', color: 'white' }}
          onClick={isLogin ? handleLoginButton : handleRegisterButton}
        >
          {isLogin ? "Login" : "Register"}
        </Button>
        <FormHelperText style={{ margin: 20 }}>
          {isLogin ? "Are you not registered yet?" : "Already have an account?"}
        </FormHelperText>
        <Button
          variant="contained"
          style={{ background: 'linear-gradient(45deg, #2196F3 30%, #21cbf3 90%)', color: 'white' }}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Register" : "Login"}
        </Button>
      </div>
    );
  }
  
  export default Auth;