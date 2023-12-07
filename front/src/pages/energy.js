import React, { useState } from 'react';
import Scale from '../scripts/scale.js';
import './styles/year.css';
import Button from '@mui/material/Button';
import DataTable from '../components/energytable.js';

const Energy = () => {
    const energyList = ["Nucléaire", "Fioul", "Hydraulique", "Charbon", "Gaz", "Autres Renouvelables"];
    const [selectedEnergy, setSelectedEnergy] = useState('');

    const handleEnergyClick = (energy) => {
        setSelectedEnergy(energy);
    };

    return (
        <div className='cont'>
            <div className='header'>
                <h1 className='textStyle'>
                    Veuillez sélectionner l'énergie qui vous intéresse.
                </h1>
                <ul className='lists'>
                    {energyList.map((text, index) => (
                        <Button
                            variant="contained"
                            key={index}
                            onClick={() => handleEnergyClick(text)}
                            disableRipple={true}
                            className={selectedEnergy === text ? 'selected' : ''}
                        >
                            {text}
                        </Button>
                    ))}
                </ul>
            </div>
            <div className='data'>
                <div className='table'>
                    {selectedEnergy ? (
                        <div style={{ flex: '1' }}>
                            <h1 style={{ textAlign: 'center' }}>Tableau représentatif</h1>
                            <div style={{ display: 'flex', alignContent: 'center' }}>
                                <DataTable label={selectedEnergy} />
                            </div>
                        </div>
                    ) : (
                        <p>Aucune donnée, veuillez sélectionner une année.</p>
                    )}
                </div>
                <div className='graph'>
                    {selectedEnergy ? (
                        <Scale energy={selectedEnergy} />
                    ) : (
                        <p>Aucune donnée, veuillez sélectionner une année.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Energy;
