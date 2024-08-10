import React, { useState } from 'react';
import Header from './Header';
import CustomButton from '../AssetsPage/CustomButton';
import './DepositWithdrawPage.css';

function DepositWithdrawPage() {
    const [isDeposit, setIsDeposit] = useState(true);
    const [selectedCurrency, setSelectedCurrency] = useState('');
    const [selectedBank, setSelectedBank] = useState('');
    const [iban, setIban] = useState('');
    const [amount, setAmount] = useState('');

    const handleDepositClick = () => {
        setIsDeposit(true);
    };

    const handleWithdrawClick = () => {
        setIsDeposit(false);
    };

    const handleCurrencyChange = (event) => {
        setSelectedCurrency(event.target.value);
    };

    const handleBankChange = (event) => {
        setSelectedBank(event.target.value);
    };

    const handleIbanChange = (event) => {
        setIban(event.target.value);
    };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    return (
        <div className="deposit-withdraw-page">
            <Header />
            <div className="content">
                <div className="left-panel">
                    <div className="transfer-section">
                        <h2>Yatır-Çek</h2>
                        <div className="transfer-type">
                            <button
                                className={`transfer-button ${isDeposit ? 'active' : ''}`}
                                onClick={handleDepositClick}
                            >
                                Yatır
                            </button>
                            <button
                                className={`transfer-button ${!isDeposit ? 'active' : ''}`}
                                onClick={handleWithdrawClick}
                            >
                                Çek
                            </button>
                        </div>
                        {isDeposit ? (
                            <div>
                                <div className="bank-details">
                                    <label> Banka bilgilerini görüntüle</label>
                                    <select>
                                        <option>Ziraat Bankası</option>
                                    </select>
                                    <div className="bank-info">
                                        <img src="ziraat.png" alt="Ziraat Bankası" />
                                        <p>Ziraat Bankası - Ataşehir Şubesi</p>
                                        <div className="iban-container">
                                            <p>TR01 0000 0000 0000 0000 0000 01</p>
                                        </div>
                                        <button className="copy-button">Kopyala</button>
                                    </div>
                                </div>
                                <div className="amount-section">
                                    <input type="text" placeholder="Yatırılacak Miktar" className="large-input" value={amount} onChange={handleAmountChange} />
                                    <CustomButton text="Yatır" />
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="transfer-details">
                                    <select className="currency-select large-select" value={selectedCurrency} onChange={handleCurrencyChange}>
                                        <option value="">Döviz Türü Seçin</option>
                                        <option value="USD">USD</option>
                                        <option value="EUR">EUR</option>
                                        <option value="TRY">TRY</option>
                                        <option value="GBP">GBP</option>
                                    </select>
                                    <select className="bank-select large-select" value={selectedBank} onChange={handleBankChange}>
                                        <option value="">Banka Seçin</option>
                                        <option value="Ziraat">Ziraat Bankası</option>
                                        <option value="Garanti">Garanti Bankası</option>
                                        <option value="IsBank">İş Bankası</option>
                                        <option value="Yapikredi">Yapı Kredi</option>
                                    </select>
                                    <input type="text" placeholder="IBAN Girin" className="iban-input large-input" value={iban} onChange={handleIbanChange} />
                                    <input type="text" placeholder="Çekilecek Miktar" className="large-input" value={amount} onChange={handleAmountChange} />
                                    <CustomButton text="Çek" />
                                </div>
                            </div>
                        )}
                        <button className="bank-info-button">Banka Hesap Bilgileri</button>
                    </div>
                    <div className="transaction-history">
                        <h3>Son İşlemlerim</h3>
                        <ul>
                            <li className="transaction-item">
                                <div className="status completed"></div>
                                <div className="details">
                                    <span>Yükleme</span>
                                    <span>08:25:57</span>
                                    <span className="amount positive">212,60 TRY</span>
                                </div>
                                <span className="status-text completed">Bitmiş</span>
                            </li>
                            <li className="transaction-item">
                                <div className="status completed"></div>
                                <div className="details">
                                    <span>Yükleme</span>
                                    <span>08:30:25</span>
                                    <span className="amount positive">1.465,85 TRY</span>
                                </div>
                                <span className="status-text completed">Bitmiş</span>
                            </li>
                            <li className="transaction-item">
                                <div className="status failed"></div>
                                <div className="details">
                                    <span>Çekme</span>
                                    <span>08:40:25</span>
                                    <span className="amount negative">-6.000,00 TRY</span>
                                </div>
                                <span className="status-text failed">Başarısız</span>
                            </li>
                        </ul>
                    </div>
                </div>
                
                {/* Sağ Panel - Transfer ve Geçmiş Transferler */}
                <div className="right-panel">
                    <div className="transfer-section">
                        <h2>Döviz Transferi</h2>
                        <div className="transfer-details">
                            <select className="currency-select large-select">
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="TRY">TRY</option>
                                <option value="GBP">GBP</option>
                            </select>
                            <input type="text" placeholder="Müşteri No" className="customer-input large-input" />
                            <input type="text" placeholder="Transfer Miktarı" className="amount-input large-input" />
                            <CustomButton text="Gönder" />
                        </div>
                    </div>
                    <div className="transfer-history">
                        <h3>Geçmiş Transferler</h3>
                        <ul>
                            <li className="transfer-item">
                                <span>Döviz Türü: USD</span>
                                <span>Tarih: 12.08.2024</span>
                                <span>Miktar: 5000</span>
                                <span>Müşteri No: 123456</span>
                            </li>
                            <li className="transfer-item">
                                <span>Döviz Türü: EUR</span>
                                <span>Tarih: 11.08.2024</span>
                                <span>Miktar: 3000</span>
                                <span>Müşteri No: 654321</span>
                            </li>
                            <li className="transfer-item">
                                <span>Döviz Türü: TRY</span>
                                <span>Tarih: 10.08.2024</span>
                                <span>Miktar: 10000</span>
                                <span>Müşteri No: 789123</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DepositWithdrawPage;
