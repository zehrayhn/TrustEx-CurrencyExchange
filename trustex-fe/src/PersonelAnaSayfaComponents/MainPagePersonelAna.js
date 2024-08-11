import React, { useState, useMemo } from 'react';
import { Container, Grid, Button, Typography, Box, FormControl, Select, MenuItem, ListSubheader, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

const containsText = (text, searchText) =>
  text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

const allOptions = [
  "Eray", "Aytuğ", "Doki", "Berkan", 
  "Ozan", "Beril", "Zehra", " Furkan", 
  "Özlem", "Burcu", "Pınar", "Yunus"
];

export default function MainPagePersonelAna() {
  const [selectedOption, setSelectedOption] = useState(allOptions[0]);
  const [searchText, setSearchText] = useState("");
  const displayedOptions = useMemo(
    () => allOptions.filter((option) => containsText(option, searchText)),
    [searchText]
  );

  return (
    <div>
      <Container>
        <Grid container spacing={3} style={{ marginTop: '24px' }}>
          <Grid item xs={12} style={{ padding: '16px', display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              color="inherit"
              variant="contained"
              sx={{ 
                width: '150px', 
                height: '50px',
                top: '750px', 
                left: '400px',
                backgroundColor: "#ffffff",
                color: '#000000',
                '&:hover': { backgroundColor: '#f0f0f0' },
              }} >
              Canlı Destek
            </Button>
            <Link to="/bireysel-musteri-ekle" style={{ textDecoration: 'none' }}>
                <Button
                color="inherit"
                variant="contained"
                sx={{ 
                    width: '150px', 
                    height: '50px', 
                    top: '750px', 
                    left: '-1250px',
                    backgroundColor: "#ffffff",
                    color: '#000000', 
                    '&:hover': { backgroundColor: '#f0f0f0' }, 
                }} >
                Müşteri Ekle
                </Button>
            </Link>
          </Grid>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              sx={{ 
                width: '100%', 
                maxWidth: '575px', 
                maxHeight: '540px', 
                backgroundColor: '#031a55', 
                color: 'white', 
                padding: '50px', 
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                overflow: 'auto',
                mt: '180px', 
                ml: '20px'  
              }}
            >
              <Box sx={{ width: '100%', position: 'relative' }}>
                <Typography variant="h6" sx={{ marginBottom: '8px', color: '#ffffff' }}>
                  Müşteriler
                </Typography>
                <FormControl fullWidth>
                  <Select
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          maxHeight: 300, // Kaydırma yüksekliğini sınırlamak için
                          overflowY: 'auto' // Kaydırmayı aktif hale getirmek için
                        }
                      }
                    }}
                    id="search-select"
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    onClose={() => setSearchText("")}
                    renderValue={() => selectedOption}
                    sx={{
                      backgroundColor: '#ffffff',
                      borderRadius: '4px',
                      '& .MuiSelect-select': {
                        padding: '8px',
                      },
                      mb: 2 
                    }}
                  >
                    <ListSubheader sx={{ backgroundColor: '#ffffff' }}>
                      <TextField
                        size="small"
                        autoFocus
                        placeholder="Ara"
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon />
                            </InputAdornment>
                          )
                        }}
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key !== "Escape") {
                            e.stopPropagation();
                          }
                        }}
                      />
                    </ListSubheader>
                    {displayedOptions.map((option, i) => (
                      <MenuItem key={i} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
