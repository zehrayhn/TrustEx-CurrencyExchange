import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Button } from "@mui/material";
function Profile() {
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true); // Loading durumu ekleyelim
    const [error, setError] = useState(null); // Hata durumu ekleyelim

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch("/profile", {
                    method: "GET",
                    headers: {
                        "Authorization" : localStorage.getItem("tokenKey"),
                        "Content-Type" : "application/json"
                    }
                });
            
                if (!response.ok) {
                    handleLogout();
                    throw new Error("Profile data fetching error");
                }

                const data = await response.json();
                setProfile(data);
           
            } catch (error) {
                console.error("Error fetching profile data:", error);
                // setError("Unable to fetch profile data. Please log in again.");
        
                
            }
        };

        fetchProfile();
    }, [navigate]);




    const handleLogout = () => {
        localStorage.removeItem("tokenKey");
        localStorage.removeItem("currentUser");
        localStorage.removeItem("userName");
       
    };

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <Box>
            <Typography variant="h4">Profile</Typography>
            <Typography variant="h6">Name: {profile.name}</Typography>
            <Typography variant="h6">Name: {profile.lastname}</Typography>
            <Typography variant="h6">Email: {profile.email}</Typography>
            <Button variant="contained" color="primary" onClick={handleLogout}>
                Logout
            </Button>
        </Box>
    );
}
export default Profile;