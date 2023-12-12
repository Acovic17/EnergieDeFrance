import React, { useState, useEffect } from 'react';
import './styles/table.css';

const DataTable = ({ label }) => {
  const [tableData, setTableData] = useState({ categorie: [], valeur: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/getEnergies?year=${label}`);
        const data = await response.json();
        setTableData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [label]);

  return (
    <div className="DataTableContainer">
      <div className="DataTableColumn">
        <h3>Énergie</h3>
        <ul className="DataTableList">
          {tableData.categorie.map((category, index) => (
            <li key={index}>{category}</li>
          ))}
        </ul>
      </div>
      <div className="DataTableColumn">
        <h3>Consommation</h3>
        <ul className="DataTableList">
          {tableData.valeur.map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DataTable;