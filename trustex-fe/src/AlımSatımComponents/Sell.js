import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Typography, InputAdornment, Slider, Box } from '@mui/material';

const Sell = ({ exchangeRate ,currencyCode }) => {
  const [amount, setAmount] = useState('');
  const [assets, setAssets] = useState();
  const userId = 1; // Default user ID

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSliderChange = (event, newValue) => {
    setAmount((newValue * (1 / exchangeRate.sellRate)).toFixed(3));
  };

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await fetch('/api/v1/assets/user/1/'+currencyCode);
        if (!response.ok) {
          throw new Error('Failed to fetch exchange rate');
        }
        const data = await response.json();
        setAssets(data);
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
      }
    };
    fetchAssets();
  }, []);

  const handleSellTransaction = async () => {
    const transactionData = {
      userId: userId,
      transactionType: 'BUY',
      targetCurrencyCode: currencyCode,
      amount: parseFloat(amount),
    };

    try {
      const response = await fetch('/api/v1/transactions/buySell', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData),
      });

      if (!response.ok) {
        alert('Transaction failed');
        throw new Error(`Error: ${response.status}`);
        
      }

      const data = await response.json();
      console.log('Transaction successful:', data);
      alert('Transaction successful:');
      window.location.reload();
      // Optionally, reset the form or update the UI with the response
    } catch (error) {
      console.error('Transaction failed:', error);
    }
  };

  function digitSetting(x) {
    return Number.parseFloat(x).toFixed(6);
  }

  if (!assets) {
    return <Typography color="black">Loading asset...</Typography>;
  }
  if (!exchangeRate) {
    return <Typography color="black">Loading exchange rate...</Typography>;
  }

  return (
    <Box p={3} sx={{ backgroundColor: 'white', borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom align="center" color={'black'}>
        {exchangeRate.currencyLabelTR}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="filled"
            label="Exchange Rate"
            value={digitSetting(1 / exchangeRate.sellRate)}
            InputProps={{
              readOnly: true,
              endAdornment: <InputAdornment position="end">TRY</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="filled"
            label="Available Balance"
            value={digitSetting(assets.amount)}
            InputProps={{
              readOnly: true,
              endAdornment: <InputAdornment position="end">{exchangeRate.currencyCode}</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            label="Amount to Sell"
            value={amount}
            onChange={handleAmountChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">{exchangeRate.currencyCode}</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Slider
            defaultValue={0}
            aria-labelledby="discrete-slider"
            step={1}
            marks
            min={0}
            max={100}
            valueLabelDisplay="auto"
            onChange={handleSliderChange}
          />
        </Grid>
        <Grid item xs={12} color={'black'}>
          <br />
          <Typography>Komisyon (TRY): {digitSetting(0.01 * (amount * 1 / exchangeRate.sellRate))}</Typography>
          <Typography>Toplam Tutar (TRY): {digitSetting((amount * (1 / exchangeRate.sellRate)) + (0.01 * (amount * 1 / exchangeRate.sellRate)))}</Typography>
          <Typography>Kalan KullanÄ±labilir Bakiye ({exchangeRate.currencyCode}): {assets.amount - amount}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            color="error"
            sx={{ padding: 1.5 }}
            onClick={handleSellTransaction}
          >
            Sell Now
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Sell;