import { Divider } from '@mui/material';
import './styles/home.css';

export default function Home() {
    return (
        <div className='container'>
            <div className='d1'>
                <div className='d11'>
                    <h1 className='titles'>Le Projet</h1>
                    <div className='description'>
                        <span>
                            Le projet a pour but d'exposer l'origine de l'électricité fournie par EDF, de 2015 à 2021.
                            Cependant, vous pourrez aussi faire une constatation des prévisions de l'année 2022 à 2028.
                        </span>
                        <span>
                            Toutes les sources seront citées dans les informations, si vous souhaitez les consulter.
                        </span>
                    </div>
                </div>
                <div className='d12'>
                    <img src='edf.png' alt='edf' className='edfimg' />
                </div>
            </div>
            <Divider />
            <div className='d2'>
                <h1 style={{ color: '#0000ff', textAlign: 'center' }}>Consulter les données</h1>
                <div className='d21'>
                    <a href='/byyear' className='links'>
                        <div className='d211'>
                            <div className='d2111'>
                                <ion-icon name='pie-chart-outline' />
                                <h3>Camembert</h3>
                            </div>
                            <span>
                                Les données seront représentées par années en détaillant l'utilisation de chaque énergie avec un graphique en camembert.
                            </span>
                        </div>
                    </a>
                    <a href='/byenergy' className='links'>
                        <div className='d211'>
                            <div className='d2111'>
                                <ion-icon name='analytics-outline' />
                                <h3>Courbe</h3>
                            </div>
                            <span>
                                Les données seront représentées par énergies en détaillant l'utilisation de chaque énergie aucours des années avec un graphique linéaire.
                            </span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}