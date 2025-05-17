import React, { useEffect, useState } from 'react';
import { Audio } from "react-loader-spinner";
import { Fade, Slide } from 'react-awesome-reveal';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

const EconomyDashboard = () => {
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('Overview');

    // Dummy data for charts and table
    const gdpByCountryData = {
        labels: ['USA', 'China', 'Japan', 'Germany', 'UK', 'India'],
        datasets: [
            {
                label: 'GDP (Billion USD)',
                data: [26800, 17700, 4300, 4200, 3300, 2600],
                backgroundColor: ['#4ADE80', '#818CF8', '#A78BFA', '#E879F9', '#22D3EE', '#F87171'],
            },
        ],
    };

    const inflationRateData = {
        labels: ['2019', '2020', '2021', '2022', '2023'],
        datasets: [
            {
                label: 'USA',
                data: [3, 4, 5, 7, 6],
                borderColor: '#A78BFA',
                fill: false,
            },
            {
                label: 'China',
                data: [2, 1, 2, 3, 2.5],
                borderColor: '#22D3EE',
                fill: false,
            },
            {
                label: 'Japan',
                data: [1, 0.5, 1, 2, 1.5],
                borderColor: '#4ADE80',
                fill: false,
            },
             {
                label: 'Germany',
                data: [2.5, 3, 4, 5.5, 5],
                borderColor: '#F87171',
                fill: false,
            },
             {
                label: 'UK',
                data: [3.5, 4.5, 5.5, 6.5, 5.5],
                borderColor: '#818CF8',
                fill: false,
            },
        ],
    };

    const gdpDistributionData = {
        labels: ['North America', 'Europe', 'Asia', 'South America', 'Africa'],
        datasets: [
            {
                data: [27, 25, 35, 8, 5],
                backgroundColor: ['#818CF8', '#22D3EE', '#4ADE80', '#F87171', '#A78BFA'],
            },
        ],
    };

    const economicSectorsData = {
        labels: ['Manufacturing', 'Services', 'Agriculture', 'Technology', 'Finance'],
        datasets: [
            {
                data: [22, 40, 10, 18, 10],
                backgroundColor: ['#A78BFA', '#4ADE80', '#22D3EE', '#F87171', '#818CF8'],
            },
        ],
    };

    const keyEconomicIndicatorsData = [
        { country: 'USA', gdp: '26,800', growth: '+2.5%', unemployment: '3.7%', inflation: '3.4%', debt: '128%' },
        { country: 'China', gdp: '17,700', growth: '+5.2%', unemployment: '5.2%', inflation: '2.0%', debt: '77%' },
        { country: 'Japan', gdp: '4,300', growth: '+1.0%', unemployment: '2.6%', inflation: '3.3%', debt: '261%' },
        { country: 'Germany', gdp: '4,200', growth: '+0.3%', unemployment: '3.1%', inflation: '5.9%', debt: '69%' },
        { country: 'UK', gdp: '3,300', growth: '+0.5%', unemployment: '4.2%', inflation: '4.2%', debt: '103%' },
    ];

     const gdpGrowthTrendsData = {
        labels: ['2019', '2020', '2021', '2022', '2023'],
        datasets: [
            {
                label: 'USA',
                data: [2.2, -3.7, 5.9, 1.9, 2.5],
                borderColor: '#A78BFA',
                fill: false,
            },
            {
                label: 'China',
                data: [6.1, 2.3, 8.4, 3.0, 5.2],
                borderColor: '#22D3EE',
                fill: false,
            },
             {
                label: 'Japan',
                data: [0.7, -4.8, 2.6, 1.1, 1.0],
                borderColor: '#4ADE80',
                fill: false,
            },
        ],
    };

    const unemploymentRateData = {
        labels: ['2019', '2020', '2021', '2022', '2023'],
        datasets: [
            {
                label: 'USA',
                data: [3.7, 8.1, 5.4, 3.6, 3.7],
                borderColor: '#A78BFA',
                fill: false,
            },
            {
                label: 'Germany',
                data: [5.0, 4.5, 3.6, 2.9, 3.1],
                borderColor: '#F87171',
                fill: false,
            },
             {
                label: 'UK',
                data: [3.8, 4.5, 4.7, 3.8, 4.2],
                borderColor: '#818CF8',
                fill: false,
            },
        ],
    };

     const tradeData = {
        labels: ['2019', '2020', '2021', '2022', '2023'],
        datasets: [
            {
                label: 'Exports (Billion USD)',
                data: [2500, 2300, 2800, 3200, 3100],
                backgroundColor: '#4ADE80',
            },
            {
                label: 'Imports (Billion USD)',
                data: [2900, 2700, 3300, 3800, 3700],
                backgroundColor: '#F87171',
            },
        ],
    };

    const tradeBalanceData = {
         labels: ['2019', '2020', '2021', '2022', '2023'],
         datasets: [
             {
                 label: 'Trade Balance (Billion USD)',
                 data: [-400, -400, -500, -600, -600],
                 borderColor: '#A78BFA',
                 fill: false,
             },
         ],
    };

    const leadingEconomicIndexData = {
         labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
         datasets: [
             {
                 label: 'Leading Economic Index',
                 data: [100, 101, 100.5, 102, 101.5, 102.5, 103, 102.8, 103.5, 103.2, 104, 103.8],
                 borderColor: '#4ADE80',
                 fill: false,
             },
         ],
    };

    const governmentDebtData = {
        labels: ['USA', 'Japan', 'Germany', 'UK'],
        datasets: [
            {
                label: 'Government Debt to GDP (%)',
                data: [128, 261, 69, 103],
                backgroundColor: ['#818CF8', '#22D3EE', '#4ADE80', '#A78BFA'],
            },
        ],
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'Overview':
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* GDP by Country Bar Chart */}
                        <Fade direction="up" triggerOnce>
                            <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm p-6">
                                <h2 className="text-lg font-semibold mb-4 dark:text-white">GDP by Country (Billion USD)</h2>
                                 <div className="h-72">
                                    <Bar data={gdpByCountryData} options={{ maintainAspectRatio: false }} />
                                </div>
                            </div>
                        </Fade>

                        {/* Inflation Rate Line Chart */}
                        <Fade direction="up" triggerOnce delay={100}>
                            <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm p-6">
                                <h2 className="text-lg font-semibold mb-4 dark:text-white">Inflation Rate (%)</h2>
                                <div className="h-72">
                                    <Line data={inflationRateData} options={{ maintainAspectRatio: false }} />
                                </div>
                            </div>
                        </Fade>

                        {/* Global GDP Distribution Donut Chart */}
                         <Fade direction="up" triggerOnce delay={200}>
                            <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm p-6">
                                <h2 className="text-lg font-semibold mb-4 dark:text-white">Global GDP Distribution</h2>
                                 <div className="h-72 flex items-center justify-center">
                                     <Doughnut data={gdpDistributionData} options={{ maintainAspectRatio: false }} />
                                 </div>
                            </div>
                        </Fade>

                        {/* Global Economic Sectors Donut Chart */}
                        <Fade direction="up" triggerOnce delay={300}>
                            <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm p-6">
                                 <h2 className="text-lg font-semibold mb-4 dark:text-white">Global Economic Sectors</h2>
                                  <div className="h-72 flex items-center justify-center">
                                    <Doughnut data={economicSectorsData} options={{ maintainAspectRatio: false }} />
                                </div>
                            </div>
                        </Fade>

                         {/* Key Economic Indicators Table - Full Width */}
                        <Fade direction="up" triggerOnce delay={400}>
                            <div className="lg:col-span-2 bg-white dark:bg-dark-card rounded-lg shadow-sm p-6">
                                <h2 className="text-lg font-semibold mb-4 dark:text-white">Key Economic Indicators</h2>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Country</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">GDP (Bn USD)</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Growth (%)</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Unemployment (%)</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Inflation (%)</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Debt/GDP (%)</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-dark-card dark:divide-gray-700">
                                            {keyEconomicIndicatorsData.map((row, index) => (
                                                <tr key={index}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{row.country}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{row.gdp}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400">{row.growth}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{row.unemployment}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 dark:text-red-400">{row.inflation}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{row.debt}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Fade>

                    </div>
                );
            case 'Growth':
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* GDP Growth Trends Line Chart */}
                        <Fade direction="up" triggerOnce>
                             <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm p-6">
                                <h2 className="text-xl font-semibold dark:text-white mb-4">GDP Growth Trends</h2>
                                 <div className="h-96">
                                    <Line data={gdpGrowthTrendsData} options={{ maintainAspectRatio: false }} />
                                </div>
                            </div>
                        </Fade>
                         {/* Unemployment Rate Line Chart */}
                        <Fade direction="up" triggerOnce delay={100}>
                             <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm p-6">
                                <h2 className="text-xl font-semibold dark:text-white mb-4">Unemployment Rate (%)</h2>
                                 <div className="h-96">
                                    <Line data={unemploymentRateData} options={{ maintainAspectRatio: false }} />
                                </div>
                            </div>
                        </Fade>
                    </div>
                );
            case 'Trade':
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                         {/* Exports and Imports Bar Chart */}
                         <Fade direction="up" triggerOnce>
                            <h2 className="text-xl font-semibold dark:text-white mb-4">Exports and Imports (Billion USD)</h2>
                             <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm p-6 h-96">
                                <Bar data={tradeData} options={{ maintainAspectRatio: false }} />
                            </div>
                         </Fade>
                         {/* Trade Balance Line Chart */}
                         <Fade direction="up" triggerOnce delay={100}>
                            <h2 className="text-xl font-semibold dark:text-white mb-4">Trade Balance (Billion USD)</h2>
                             <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm p-6 h-96">
                                <Line data={tradeBalanceData} options={{ maintainAspectRatio: false }} />
                            </div>
                         </Fade>
                    </div>
                );
            case 'Indicators':
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Leading Economic Index Line Chart */}
                        <Fade direction="up" triggerOnce>
                            <h2 className="text-xl font-semibold dark:text-white mb-4">Leading Economic Index</h2>
                             <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm p-6 h-96">
                                <Line data={leadingEconomicIndexData} options={{ maintainAspectRatio: false }} />
                            </div>
                        </Fade>
                         {/* Government Debt to GDP Bar Chart */}
                        <Fade direction="up" triggerOnce delay={100}>
                            <h2 className="text-xl font-semibold dark:text-white mb-4">Government Debt to GDP (%)</h2>
                             <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm p-6 h-96">
                                <Bar data={governmentDebtData} options={{ maintainAspectRatio: false }} />
                            </div>
                        </Fade>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="p-6">
            <Fade triggerOnce>
                <h1 className="text-2xl font-bold mb-2 dark:text-white">Global Economic Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Comprehensive economic data and analysis</p>
            </Fade>

            <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-tab" data-tabs-toggle="#default-tab-content" role="tablist">
                    <li className="me-2" role="presentation">
                        <button className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'Overview' ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400' : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`} id="overview-tab" data-tabs-target="#overview" type="button" role="tab" aria-controls="overview" aria-selected={activeTab === 'Overview'} onClick={() => setActiveTab('Overview')}>Overview</button>
                    </li>
                    <li className="me-2" role="presentation">
                        <button className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'Growth' ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400' : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`} id="growth-tab" data-tabs-target="#growth" type="button" role="tab" aria-controls="growth" aria-selected={activeTab === 'Growth'} onClick={() => setActiveTab('Growth')}>Growth</button>
                    </li>
                    <li className="me-2" role="presentation">
                        <button className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'Trade' ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400' : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`} id="trade-tab" data-tabs-target="#trade" type="button" role="tab" aria-controls="trade" aria-selected={activeTab === 'Trade'} onClick={() => setActiveTab('Trade')}>Trade</button>
                    </li>
                    <li role="presentation">
                        <button className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'Indicators' ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400' : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`} id="indicators-tab" data-tabs-target="#indicators" type="button" role="tab" aria-controls="indicators" aria-selected={activeTab === 'Indicators'} onClick={() => setActiveTab('Indicators')}>Indicators</button>
                    </li>
                </ul>
            </div>

            <div>
                {renderContent()}
            </div>

        </div>
    );
};

export default EconomyDashboard; 