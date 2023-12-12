import React, { useState, useEffect } from 'react';
import './styles/energytable.css';

const DataTable = ({ label }) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/getOverYears?energy=${label}`);
        const data = await response.json();
        console.log('Fetched data:', data);
        if (Array.isArray(data)) {
          setTableData(data);
        } else {
          console.error('Invalid data format:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [label]);

  return (
    <div className="DataTableContainer">
      <div className="DataTableColumn">
        <h3 style={{textAlign:'center'}}>Année</h3>
        <ul className="DataTableList">
          {tableData.map((entry, index) => (
            <li key={index}>{entry.annee}</li>
          ))}
        </ul>
      </div>
      <div className="DataTableColumn">
        <h3 style={{textAlign:'center'}}>Consommation</h3>
        <ul className="DataTableList">
          {tableData.map((entry, index) => (
            <li key={index}>
              {entry.valeur}
              {index < tableData.length - 1 && (
                <>
                  {entry.valeur > tableData[index + 1].valeur ? (
                    <span className="GreenArrow">&#8599;</span>
                  ) : (
                    <span className="RedArrow">&#8600;</span>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="DataTableColumn">
        <h3 style={{textAlign:'center'}}>Variation</h3>
        <ul className="DataTableList">
          {tableData.map((entry, index) => (
            <li key={index}>
              {index < tableData.length - 1 && (
                <>
                  {entry.valeur > tableData[index + 1].valeur ? (
                    <span className="PercentageChange Green">
                      +{((entry.valeur - tableData[index + 1].valeur) / tableData[index + 1].valeur * 100).toFixed(2)}%
                    </span>
                  ) : (
                    <span className="PercentageChange Red">
                      -{((tableData[index + 1].valeur - entry.valeur) / entry.valeur * 100).toFixed(2)}%
                    </span>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DataTable;