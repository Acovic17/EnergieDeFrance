import React, { useEffect, useRef, useCallback } from 'react';
import { Chart } from 'chart.js/auto';

const PieChart = ({ label }) => {
    const chartRef = useRef();

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/getEnergies?year=${label}`);
            const data = await response.json();

            new Chart(chartRef.current, {
                type: 'pie',
                data: {
                    labels: data.categorie,
                    datasets: [{
                        backgroundColor: ["red", "green", "blue", "black", "yellow", "lightgreen"],
                        data: data.valeur,
                    }],
                },
                options: {
                    aspectRatio: 1,
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: `Proportions des énergies fournies par EDF pour l'année ${label}`,
                            font: {
                                size: 16,
                            },
                        },
                        legend: {
                            position: 'bottom',
                        },
                    },
                },
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [label]);

    useEffect(() => {
        const fetchDataAndCreateChart = async () => {
            await fetchData();
        };
    
        fetchDataAndCreateChart();
    
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            const currentChartRef = chartRef.current;
            const myChart = Chart.getChart(currentChartRef);
            if (myChart) {
                myChart.destroy();
            }
        };
    }, [fetchData, label]);

    return <canvas ref={chartRef} style={{ width: '100%', maxWidth: '600px' }}></canvas>;
};

export default PieChart;
