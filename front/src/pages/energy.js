import React, { useState } from 'react';
import Scale from '../scripts/scale.js';
import './styles/module.css';
import Button from '@mui/material/Button';
import DataTable from '../components/energytable.js';

const Energy = () => {
    const energyList = ["Nucléaire", "Fioul", "Hydraulique", "Charbon", "Gaz", "Autres Renouvelables"];
    const [selectedEnergy, setSelectedEnergy] = useState('');

    const handleEnergyClick = (energy) => {
        setSelectedEnergy(energy);
    };

    return (
        <div className='mainContainer'>
            <div className='selectYear'>
                <h3>Sélectionnez l'énergie que vous souhaitez consulter.</h3>
                <div>
                    <ul className='listing'>
                        {energyList.map((text, index) => (
                            <Button
                                variant={selectedEnergy === text ? 'contained' : "outlined"}
                                key={index}
                                onClick={() => handleEnergyClick(text)}
                                disableRipple={true}
                                className={selectedEnergy === text ? 'selectedButt' : ''}
                            >
                                {text}
                            </Button>
                        ))}
                    </ul>
                </div>
            </div>
            <div className='showData'>
                <div className='data'>
                    {selectedEnergy ? (
                        <div style={{ flex: '1' }}>
                            <h1 style={{ textAlign: 'center' }}>Tableau représentatif</h1>
                            <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                                <DataTable label={selectedEnergy} />
                            </div>
                        </div>
                    ) : (
                        <p>Aucune donnée, veuillez sélectionner une année.</p>
                    )}
                </div>
                <div className='pie'>
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
