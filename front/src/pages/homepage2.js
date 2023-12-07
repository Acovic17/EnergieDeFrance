import './styles/styles.css'
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';

const getInfoYear = async (selectedYear) => {
  try {
    const response = await fetch(`http://localhost:8000/getEnergies?year=${selectedYear}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return {};
  }
}

const getInfoEnergy = async (selectedEnergy) => {
  try {
    const response = await fetch(`http://localhost:8000/getOverYears?energy=${selectedEnergy}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return {};
  }
}

const Homepage = () => {

  const yearList = ['2015', '2016', '2017', '2018', '2019', '2020', '2021'];
  const [year, setYear] = useState('');
  const [yearInfo, setYearInfo] = useState('');
  const handleYears = async (selectedYear) => {
    setYear(selectedYear);
    const data = await getInfoYear(selectedYear);
    setYearInfo(data);
    console.log(yearInfo)
  };
  useEffect(() => {
    if (year) {
      getInfoYear(year).then((data) => setYearInfo(data));
    }
  }, [year]);
  

  const energyList = ['Nucléaire', 'Fioul', 'Hydraulique', 'Charbon', 'Gaz', 'Autre'];
  const [energy, setEnergy] = useState('');
  const [energyInfo, setEnergyInfo] = useState('');
  const handleEnergy = async (selectedEnergy) => {
    setEnergy(selectedEnergy);
    const data2 = await getInfoEnergy(selectedEnergy);
    setEnergyInfo(data2);
    console.log(energyInfo)
  };
  useEffect(() => {
    if (energy) {
      getInfoEnergy(energy).then((data2) => setEnergyInfo(data2));
    }
  }, [energy]);

  return (
    <div className='maindiv'>


      <div className='header'>
        
        <h1 className='mainText'>Energie en France</h1>

      </div>

      <div className='main-container'>

        <div className='year-container'>

          <div className='choose'>
            <h2 className='secondaryText'>Répartition annuelle</h2>


            <ul className='lists'>
              {yearList.map((text, index) => (
                <Button 
                  variant={'outlined'}
                  key={index}
                  onClick={() => handleYears(text)}
                  disableRipple={true}
                  disable={true}
                >
                  {text}
                </Button>
              ))}
            </ul>

          </div>


          <div className='data'>

            {year ? (

              <div>

                <div>

                  {yearInfo && (
                    <table>
                      <thead>
                        <tr>
                          <th>Catégorie</th>
                          {yearInfo.categorie.map((category, index) => (
                            <td key={index}>{category}</td>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>Valeur</th>
                          {yearInfo.valeur.map((value, index) => (
                            <td key={index}>{value}</td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  )}

                </div>


                <div>

                </div>

              </div>
              ) : (
              <p>Selectionnez une année.</p>
            )}

          </div>


        </div>

        <div className='energy-container'>

          <div className='choose'>
            <h2 className='secondaryText'>Évolution de l'énergie</h2>


            <ul className='lists'>
              {energyList.map((text, index) => (
                <Button 
                  variant={'outlined'}
                  key={index}
                  onClick={() => handleEnergy(text)}
                  disableRipple={true}
                  disable={true}
                >
                  {text}
                </Button>
              ))}
            </ul>

          </div>

          <div className='data'>

            {energy ? (
              <div>
                <div>
                  
                {energyInfo && energyInfo.length > 0 ? (
                  <table>
                    <thead>
                      <tr>
                        <th>Année</th>
                        {energyInfo.map((item, index) => (
                          <td key={index}>{item.annee}</td>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>Valeur</th>
                        {energyInfo.map((item, index) => (
                          <td key={index}>{item.valeur}</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  <p>Aucune donnée disponible.</p>
                )}

              </div>


              <div>

              </div>

            </div>
            ) : (
            <p>Selectionnez une année.</p>
          )}

          </div>

        </div>
      </div>
    </div>
  );
}

export default Homepage;