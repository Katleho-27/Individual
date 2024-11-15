// src/components/ProductBarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import './Style.css';

// Register the components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProductBarChart = ({ products }) => {
    const data = {
        labels: products.map(product => product.name),  // Product names
        datasets: [
            {
                label: 'Product Quantity',
                data: products.map(product => product.quantity), // Corresponding quantities
                backgroundColor: 'skyblue',  // Bar color
                borderColor: 'black',      // Bar border color
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Product Quantity Chart',
                color: 'skyblue', // Set chart title text color to sky blue
            },
            legend: {
                labels: {
                    color: 'skyblue', // Set legend text color to sky blue
                },
            },
            tooltip: {
                bodyColor: 'skyblue', // Set tooltip text color to sky blue
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: 'skyblue', // Set y-axis ticks (labels) color to sky blue
                },
                title: {
                    display: true,
                    text: 'Quantity',
                    color: 'skyblue', // Set y-axis title color to sky blue
                },
            },
            x: {
                ticks: {
                    color: 'skyblue', // Set x-axis ticks (labels) color to sky blue
                },
                title: {
                    display: true,
                    text: 'Product Name',
                    color: 'skyblue', // Set x-axis title color to sky blue
                },
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default ProductBarChart;
