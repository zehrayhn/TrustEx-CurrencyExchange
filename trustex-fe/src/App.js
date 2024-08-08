import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './AnaSayfaComponents/Navbar';
import MainPage from './AnaSayfaComponents/MainPage';
import DataTableAna from './AnaSayfaComponents/DataTableAna';
import CurrencyConverter from './AnaSayfaComponents/CurrencyConverter';
import NavbarBirey from './GirisYapBireyComponents/NavbarBirey';
import MainPageBirey from './GirisYapBireyComponents/MainPageBirey';
import DataTableBirey from './GirisYapBireyComponents/DataTableBirey';
import NavbarKurum from './GirisYapKurumComponents/NavbarKurum';
import MainPageKurum from './GirisYapKurumComponents/MainPageKurum';
import DataTableKurum from './GirisYapKurumComponents/DataTableKurum';
import MainPageBMOL from './BireyMOL/MainPageBMOL';
import NavbarBMOL from './BireyMOL/NavbarBMOL';
import MainPageKMOL from './KurumMOL/MainPageKMOL';
import NavbarKMOL from './KurumMOL/NavbarKMOL';
import NavbarHaberveDoviz from './HaberveDovizComponents/NavbarHaberveDoviz';
import MainPageHaberveDoviz from './HaberveDovizComponents/MainPageHaberveDoviz';
import DataTableHaberveDoviz from './HaberveDovizComponents/DataTableHaberveDoviz';
import backgroundImage from './images/background.jpg';
import background3Image from './images/background3.jpg';
import background2Image from './images/background2.png';
import backgroundconverterImage from './images/backgroundconverter.jpg';
import Auth from './Auth/Auth';
import ForgotPassword from './Auth/ForgotPassword';
import ResetPassword from './Auth/ResetPassword';

const Background = () => {
  const location = useLocation();
  const isMainPage = location.pathname === '/';
  const isConvertPage = location.pathname === '/Convert';

  return (
    <>
      {isMainPage && (
        <>
          {/* Background Image */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '68vh',
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: -1,
            }}/>
              {/* Gradient Overlay */}
              <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(255, 255, 255, 0.1))',
                zIndex: -1,
              }}/>
          {/* Background Image 2 */}
          <div
            style={{
              position: 'absolute',
              top: '68vh',
              left: 0,
              width: '100%',
              height: '90vh',
              backgroundImage: `url(${background2Image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: -1,
            }}>
          </div>
          {/* Background Image 3 */}
          <div
            style={{
              position: 'absolute',
              top: '158vh',
              left: 0,
              width: '100%',
              height: '100vh',
              backgroundImage: `url(${background3Image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: -1,
            }}
          />
        </>
      )}
      {isConvertPage && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            backgroundImage: `url(${backgroundconverterImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: -1,
          }}
        />
      )}
    </>
  );
};

function App() {
  return (
    <Router>
      <Background />
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <MainPage />
            <div className="table-data">
              <DataTableAna />
            </div>
            <div className="relative">
              <div className="relative bottom-8 right-0 transform translate-x-50 w-custom-width h-custom-height mx-auto my-24 p-0">
                <CurrencyConverter />
              </div>
            </div>
          </>
        } />
        <Route path="/bireysel-giris" element={
          <>
            <NavbarBirey />
            <MainPageBirey />
            <div className="table-data-birey">
              <DataTableBirey />
            </div> 
          </>
        } />
        <Route path="/deneme1" element={
          <>
            <Auth />
            <ForgotPassword />
            <ResetPassword />
            
          </>
        } /> 
        <Route path="/kurumsal-giris" element={
          <>
            <NavbarKurum />
            <MainPageKurum />
            <div className="table-data-kurum">
              <DataTableKurum />
            </div>
          </>
        } />
        <Route path="/bireysel-musteri-ol" element={
          <>
            <NavbarBMOL />
            <MainPageBMOL />
          </>
        } />
        <Route path="/kurumsal-musteri-ol" element={
          <>
            <NavbarKMOL />
            <MainPageKMOL />
          </>
        } />
        <Route path="/sifre-merkezi" element={
          <>
           
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
