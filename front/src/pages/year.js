import React, { useState } from 'react';
import PieChart from '../scripts/pie.js';
import Button from '@mui/material/Button';
import DataTable from '../components/table.js';
import './styles/module.css'


export default function Year() {
  const yearList = ['2015', '2016', '2017', '2018', '2019', '2020', '2021',
    '2022', '2023', '2024', '2025', '2026', '2027', '2028'];
  const [selectedYear, setSelectedYear] = useState('');

  const handleYearClick = (year) => {
    setSelectedYear(year);
  };

  return (
    <div className='mainContainer'>
      <div className='selectYear'>
        <h3>Sélectionnez l'année que vous souhaitez consulter.</h3>
        <div>
          <ul className='listing'>
            {yearList.map((text, index) => (
              <Button
                variant={selectedYear === text ? 'contained' : "outlined"}
                key={index}
                onClick={() => handleYearClick(text)}
                disableRipple={true}
                className={selectedYear === text ? 'selectedButt' : ''}
              >
                {text}
              </Button>
            ))}
          </ul>
        </div>
      </div>
      <div className='showData'>
        <div className='data'>
         {selectedYear ? (
           <div style={{flex:'1'}}>
             <h1 style={{textAlign: 'center'}}>Tableau représentatif</h1>
             <div style={{display:'flex', alignContent:'center', justifyContent:'center'}}>
               <DataTable label={selectedYear} />
             </div>
           </div>
         ) : (
           <p>Aucune donnée, veuillez sélectionner une année.</p>
         )}
        </div>
        <div className='pie'>
          {selectedYear ? (
            <PieChart label={selectedYear} />
          ) : (
            <p>Aucune donnée, veuillez sélectionner une année.</p>
          )}
        </div>
      </div>
    </div>
  )

};
