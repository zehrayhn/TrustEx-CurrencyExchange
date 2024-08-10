import React, { useState } from 'react';
import AssetsCard from './AssetsCard';
import Header from './Header';
import './AssetsPageScreen.css'; 
import { PieChart } from '@mui/x-charts/PieChart';
import CustomButton from './CustomButton';

function AssetsPageScreen() {
  const totalAssetsValue = 100000; // Örneğin, toplam TL varlık değeri
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const assetsData = [
    { title: "Sterlin", totalValue: 1730.52, changePercent: 304.52, changeValue: 1302.72, quantity: 46, cost: 9.30, lastPrice: 37.62 },
    { title: "TL", totalValue: 2000.00, changePercent: 150.50, changeValue: 1000.50, quantity: 50, cost: 10.00, lastPrice: 40.00 },
    { title: "Dolar", totalValue: 3000.00, changePercent: 200.20, changeValue: 1500.20, quantity: 60, cost: 12.50, lastPrice: 50.00 },
    { title: "Pound", totalValue: 2500.00, changePercent: 250.25, changeValue: 1250.25, quantity: 55, cost: 11.50, lastPrice: 45.00 },
    { title: "Euro", totalValue: 3500.00, changePercent: 175.75, changeValue: 1750.75, quantity: 70, cost: 14.00, lastPrice: 55.00 },
    { title: "Riyal", totalValue: 1500.00, changePercent: 100.10, changeValue: 500.10, quantity: 40, cost: 8.00, lastPrice: 35.00 },
    { title: "Kron", totalValue: 1200.00, changePercent: 90.90, changeValue: 450.90, quantity: 30, cost: 7.50, lastPrice: 30.00 },
    { title: "Yen", totalValue: 1800.00, changePercent: 95.95, changeValue: 850.95, quantity: 35, cost: 9.00, lastPrice: 37.00 },
  ];

  // Arama kriterine göre filtreleme
  const filteredData = assetsData.filter(asset =>
    asset.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Arama yapıldığında sayfayı sıfırla
  };

  return (
    <div className="assets-page-container">
      <Header /> 

      <div className="customer-info">
        <span>Müşteri No: 11111111111</span>
      </div>

      <div className="body-container">
        <div className="left-panel">
          <h3>Hesap Detay Dökümü</h3>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 150000, label: 'Sterlin' },
                  { id: 1, value: 1000, label: 'Kron' },
                  { id: 2, value: 25000, label: 'TL' },
                  { id: 3, value: 45000, label: 'Euro' },
                  { id: 4, value: 65000, label: 'Dolar' },
                ],
                highlightScope: { faded: 'global', highlighted: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },          
              },
            ]}
            width={400}
            height={400}
            style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}
          />

          <div className="balance-info">
            <div className="balance-item">
              <h4>TL Bakiye:</h4>
              <span>5000 TL</span>
            </div>
            <div className="balance-item">
              <h4>Toplam Kar/Zarar:</h4>
              <span style={{ color: 1200 >= 0 ? 'green' : 'red' }}>
                {1200 >= 0 ? `+1200 TL` : `-1200 TL`}
              </span>
            </div>
          </div>
        </div>

        <div className='cards-body'>
          <h2>Detay</h2>

          {/* Arama Kutusu */}
          <div className="search-container">
            <input 
              type="text"
              placeholder="Döviz Ara..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <div className="cards-wrapper">
            {currentData.map((asset, index) => (
              <AssetsCard
                key={index}
                title={asset.title}
                totalValue={asset.totalValue}
                changePercent={asset.changePercent}
                changeValue={asset.changeValue}
                quantity={asset.quantity}
                cost={asset.cost}
                lastPrice={asset.lastPrice}
                totalAssetsValue={totalAssetsValue}
              />
            ))}
          </div>

          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              &lt;
            </button>
            <span>{`Sayfa ${currentPage} / ${totalPages}`}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              &gt;
            </button>
          </div>

          <div className='button-div'>
            <CustomButton text='Geçmiş İşlemlerim' />
            <CustomButton text='Döviz Al/Sat' />
            <CustomButton text='Destek' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssetsPageScreen;
