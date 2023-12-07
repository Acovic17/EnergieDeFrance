import './styles/home.css'
import CardComp from '../components/card.js';
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return(

        <div className='mainContainer'>
            <div className='box'>
                <h2 className='textStyle'>Sélectionnez les données que vous souhaitez analyser</h2>
                <div className='box2'>
                    <Link to="/byyear" className='button'>
                        <CardComp 
                            title="Par années"
                            content="Obtenez des informations précises concernant les énergies en fonction de l'année de votre choix, avec une représentation camembert."
                            />
                    </Link>
                    <Link to="/byenergy" className='button'>
                        <CardComp 
                            title="Par Énergie" 
                            content="Obtenez des informations précises sur l'énergie que vous souhaitez, avec une représentation graphique afin de suivre son évolution aucours des années."
                            />
                    </Link>
                </div>
            </div>
        </div>

    );
}

export default Home