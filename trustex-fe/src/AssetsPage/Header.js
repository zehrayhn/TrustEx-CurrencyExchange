import React from "react";
import logo from '../images/logo.png';

const Header = () => {
    return (
        <div style={styles.headerContainer}>
            <div style={styles.logoContainer}>
                <img 
                    src={logo} 
                    alt="Logo" 
                    style={{ height: '50px', marginLeft: '5px', cursor: 'pointer' }} 
                />
            </div>
            <div style={styles.navContainer}>
                <div style={styles.navItem}>
                    <span style={styles.navText}>Ana Sayfa</span>
                </div>
                <div style={styles.navItem}>
                    <span style={styles.navText}>Çapraz İşlemler</span>
                </div>
                <div style={styles.navItem}>
                    <span style={styles.navText}>Alım-Satım</span>
                </div>
                <div style={styles.navItem}>
                    <span style={styles.navText}>Geçmiş İşlemlerim</span>
                </div>
                <div style={styles.navItem}>
                    <span style={styles.navText}>Yatır-Çek</span>
                </div>
                <div style={styles.navItem}>
                    <span style={styles.navText}>Profil</span>
                </div>
            </div>
        </div>
    );
};

const styles = {
    headerContainer: {
        display: "flex",
        justifyContent: "space-between", // Logo ve navContainer arasında alan yaratır
        alignItems: "center",
        backgroundColor: "#031a55", // Koyu mavi arka plan rengi
        padding: "10px 20px",
        position: "fixed", // Navbar'ı sabitler
        top: 0,
        left: 0,
        right: 0,
        height: "60px",
        color: "#FFFFFF",
        zIndex: 1000, // Navbar'ın diğer içeriklerin üstünde kalmasını sağlar
    },
    logoContainer: {
        flex: 1,
        display: "flex",
        alignItems: "center", // Logo'nun dikey ortalanması için
    },
    navContainer: {
        display: "flex",
        justifyContent: "flex-end", // Yazıları sağa yaslar
        alignItems: "center", // Dikey olarak ortalar
        flex: 3, // NavContainer genişliğini artırır
    },
    navItem: {
        display: "flex",
        alignItems: "center",
        cursor: "pointer", // Tıklanabilir işaretçi ekle
        margin: "0 15px", // Yazılar arasında boşluk
    },
    navText: {
        fontSize: "18px",
        fontWeight: "bold",
        color: "#FFFFFF", // Yazı rengini beyaz yap
    },
};

export default Header;
