import React, { useState } from 'react';
import PieChart from '../scripts/pie.js';
import './styles/year.css';
import Button from '@mui/material/Button';
import DataTable from '../components/table.js';

const Year = () => {
  const yearList = ['2015', '2016', '2017', '2018', '2019', '2020', '2021'];
  const [selectedYear, setSelectedYear] = useState('');

  const handleYearClick = (year) => {
    setSelectedYear(year);
  };

  return (
    <div className='cont'>
      <div className='header'>
        <h1 className='textStyle'>
          Veuillez sélectionner l'année qui vous intéresse.
        </h1>
        <ul className='lists'>
          {yearList.map((text, index) => (
            <Button
              variant="contained"
              key={index}
              onClick={() => handleYearClick(text)}
              disableRipple={true}
              className={selectedYear === text ? 'selected' : ''}
            >
              {text}
            </Button>
          ))}
        </ul>
      </div>
      <div className='data'>
        <div className='table'>
          {selectedYear ? (
            <div style={{flex:'1'}}>
              <h1 style={{textAlign: 'center'}}>Tableau représentatif</h1>
              <div style={{display:'flex', alignContent:'center'}}>
                <DataTable label={selectedYear} />
              </div>
            </div>
          ) : (
            <p>Aucune donnée, veuillez sélectionner une année.</p>
          )}
        </div>
        <div className='graph'>
          {selectedYear ? (
            <PieChart label={selectedYear} />
          ) : (
            <p>Aucune donnée, veuillez sélectionner une année.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Year;
