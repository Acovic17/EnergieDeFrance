import React, { useEffect, useRef } from 'react';
import 'chartjs-adapter-moment';
import { Chart } from 'chart.js/auto';
import 'moment';

const Scale = ({ energy }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/getOverYears?energy=${energy}`);
                const data = await response.json();
                console.log('Fetched data:', data);

                const labels = data.map(entry => entry.annee);
                const values = data.map(entry => entry.valeur);
                console.log('Labels:', labels);
                console.log('Values:', values);

                const ctx = chartRef.current.getContext('2d');

                if (chartRef.current.chart) {
                    chartRef.current.chart.destroy();
                }

                chartRef.current.chart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Valeur',
                            data: values,
                            borderColor: 'rgba(255, 145, 0, 0.7)',
                            borderWidth: 5,
                            pointBackgroundColor: 'rgba(255, 145, 0, 1)',
                            pointRadius: 5,
                            fill: false,
                        }],
                    },
                    options: {
                        scales: {
                            x: {
                                type: 'time',
                                time: {
                                    unit: 'year',
                                    displayFormats: {
                                        year: 'YYYY', // Specify the format for the year
                                    },
                                },
                                title: {
                                    display: true,
                                    text: 'Année',
                                },
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Consommation',
                                },
                                min: 0,
                                max: 100,
                            },
                        },
                        plugins: {
                            title: {
                                display: true,
                                text: 'Chart Title',
                                position: 'top',
                                font: {
                                    size: 16,
                                },
                            },
                            tooltip: {
                                callbacks: {
                                    label: (context) => {
                                        const value = context.parsed.y || 0;
                                        return `Consommation: ${value}%`;
                                    },
                                },
                            },
                        },
                    },
                });
        
                // ...
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [energy]);

    return <canvas ref={chartRef} style={{ width: '100%', maxWidth: '600px' }} />;
};

export default Scale;