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
import MainPageBMOL from './BireyMOL/MainPageBMOL';
import NavbarBMOL from './BireyMOL/NavbarBMOL';
import NavbarHaberveDoviz from './HaberveDovizComponents/NavbarHaberveDoviz';
import MainPageHaberveDoviz from './HaberveDovizComponents/MainPageHaberveDoviz';
import DataTableHaberveDoviz from './HaberveDovizComponents/DataTableHaberveDoviz';
import backgroundImage from './images/background.jpg';
import background3Image from './images/background3.jpg';
import background2Image from './images/background2.png';
import backgroundconverterImage from './images/backgroundconverter.jpg';
import AydınlatmaMetni from './AydınlatmaMetni/AydınlatmaMetni';
import NavbarPersonelAna from './PersonelAnaSayfaComponents/NavbarPersonelAna';
import MainPagePersonelAna from './PersonelAnaSayfaComponents/MainPagePersonelAna';
import NavbarMüsteriEkle from './MüsteriEkleComponents/NavbarMüsteriEkle';
import MainPageMüsteriEkle from './MüsteriEkleComponents/MainPageMüsteriEkle';
import NavbarSifreMerkezi from './SifreMerkeziComponents/NavbarSifreMerkezi';
import ResetPassword from './SifreMerkeziComponents/ResetPassword';
import SifremiUnuttum from './SifreMerkeziComponents/SifremiUnuttum';
import NavbarProfilBirey from './ProfilBireyComponents/NavbarProfilBirey';
import MainPageProfilBirey from './ProfilBireyComponents/MainPageProfilBirey';
import NavbarProfilPersonel from './ProfilPersonelComponents/NavbarProfilPersonel';
import MainPageProfilPersonel from './ProfilPersonelComponents/MainPageProfilPersonel';
import NavbarDovizAlSat from './DovizAlSatComponents/NavbarDovizAlSat';
import DovizAlSat from './DovizAlSatComponents/DovizAlSat';
import BuySell from './AlımSatımComponents/BuySell';
import Buy from './AlımSatımComponents/Buy';
import BuyInfo from './AlımSatımComponents/BuyInfo';
import Sell from './AlımSatımComponents/Sell';
import CrossCurrency from './CrossCurrencyComponents/CrossCurrency'
import TransactionList from './GecmisIslemlerComponents/TransactionList';

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
        <Route path="/bireysel-musteri-ol" element={
          <>
            <NavbarBMOL />
            <MainPageBMOL />
          </>
        } />
        <Route path="/sifre-merkezi" element={
          <>
            <NavbarSifreMerkezi />
            <SifremiUnuttum/>
          </>
        } />
       
         <Route path="/reset-password" element={
          <>
            <NavbarSifreMerkezi />
            <ResetPassword/>
          </>
        } />
        <Route path="/bireysel-musteri-ekle" element={
          <>
            <NavbarMüsteriEkle />
            <MainPageMüsteriEkle />
          </>
        } />
        <Route path="/aydınlatma-metni" element={
          <>
           <AydınlatmaMetni />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
