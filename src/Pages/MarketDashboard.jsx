import React, { useState } from 'react';
// import { TrendingUp, BarChart3, DollarSign, Activity } from 'lucide-react'; // Remove unused imports
import { Fade } from 'react-awesome-reveal'; // Import Fade for animations
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

const MarketDashboard = () => {
    // Remove unused stats data
    // const stats = [...];

    const [activeTab, setActiveTab] = useState('Overview'); // State for active tab

    // Dummy data for market charts and content
    const marketPerformanceData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Market Index',
                data: [4000, 4100, 4050, 4200, 4300, 4250, 4400, 4500, 4450, 4600, 4700, 4650],
                borderColor: '#818CF8',
                fill: false,
            },
        ],
    };

    const tradingVolumeData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Trading Volume (Millions)',
                data: [150, 160, 140, 170, 180, 165, 190, 200, 185, 210, 220, 205],
                backgroundColor: '#4ADE80',
            },
        ],
    };

     const marketSentimentData = [
        { metric: 'Overall Sentiment', value: 'Bullish' },
        { metric: 'Fear Greed Index', value: '65 (Greed)' },
        { metric: 'Volatility Index (VIX)', value: '18.5' },
    ];

    const sectorPerformanceData = {
        labels: ['Technology', 'Healthcare', 'Finance', 'Consumer Goods', 'Industrials'],
        datasets: [
            {
                label: 'Growth (%)',
                data: [25, 18, 15, 12, 10],
                backgroundColor: ['#818CF8', '#22D3EE', '#4ADE80', '#F87171', '#A78BFA'],
            },
        ],
    };

     const globalIndicesData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'S&P 500',
                data: [4000, 4100, 4050, 4200, 4300, 4250],
                borderColor: '#818CF8',
                fill: false,
            },
            {
                label: 'NASDAQ',
                data: [12000, 12500, 12300, 12800, 13000, 12700],
                borderColor: '#4ADE80',
                fill: false,
            },
             {
                label: ' FTSE 100',
                data: [7500, 7600, 7550, 7700, 7800, 7750],
                borderColor: '#F87171',
                fill: false,
            },
        ],
    };

    const marketVolatilityData = {
         labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
         datasets: [
             {
                 label: 'Market Volatility Index',
                 data: [20, 18, 22, 19, 17, 20, 21, 18, 20, 19, 17, 16],
                 borderColor: '#A78BFA',
                 fill: false,
             },
         ],
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'Overview':
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Market Performance Line Chart */}
                        <Fade direction="up" triggerOnce>
                            <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm p-6">
                                <h2 className="text-lg font-semibold mb-4 dark:text-white">Market Performance</h2>
                                <div className="h-72">
                                     <Line data={marketPerformanceData} options={{ maintainAspectRatio: false }} />
                                </div>
                            </div>
                        </Fade>

                        {/* Trading Activity Bar Chart */}
                        <Fade direction="up" triggerOnce delay={100}>
                            <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm p-6">
                                <h2 className="text-lg font-semibold mb-4 dark:text-white">Trading Volume</h2>
                                <div className="h-72">
                                     <Bar data={tradingVolumeData} options={{ maintainAspectRatio: false }} />
                                </div>
                            </div>
                        </Fade>

                         {/* Market Sentiment Table */}
                        <Fade direction="up" triggerOnce delay={200}>
                            <div className="lg:col-span-2 bg-white dark:bg-dark-card rounded-lg shadow-sm p-6">
                                <h2 className="text-lg font-semibold mb-4 dark:text-white">Market Sentiment</h2>
                                 <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Metric</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Value</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-dark-card dark:divide-gray-700">
                                            {marketSentimentData.map((row, index) => (
                                                <tr key={index}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{row.metric}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{row.value}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Fade>

                    </div>
                );
            case 'Sectors':
                return (
                    <div className="p-6 bg-white dark:bg-dark-card rounded-lg shadow-sm">
                         <Fade direction="up" triggerOnce>
                            <h2 className="text-xl font-semibold dark:text-white mb-4">Market Sectors Analysis</h2>
                             <div className="h-96 flex items-center justify-center">
                                <Doughnut data={sectorPerformanceData} options={{ maintainAspectRatio: false }} />
                            </div>
                         </Fade>
                    </div>
                );
            case 'Indices':
                return (
                    <div className="p-6 bg-white dark:bg-dark-card rounded-lg shadow-sm">
                        <Fade direction="up" triggerOnce>
                            <h2 className="text-xl font-semibold dark:text-white mb-4">Global Market Indices</h2>
                             <div className="h-96 flex items-center justify-center">
                                 <Line data={globalIndicesData} options={{ maintainAspectRatio: false }} />
                            </div>
                        </Fade>
                    </div>
                );
             case 'Volatility':
                return (
                    <div className="p-6 bg-white dark:bg-dark-card rounded-lg shadow-sm">
                         <Fade direction="up" triggerOnce>
                            <h2 className="text-xl font-semibold dark:text-white mb-4">Market Volatility</h2>
                             <div className="h-96 flex items-center justify-center">
                                <Line data={marketVolatilityData} options={{ maintainAspectRatio: false }} />
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
                <h1 className="text-2xl font-bold mb-2 dark:text-white">Global Market Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Key market trends and insights</p>
            </Fade>

            {/* Tabs */}
            <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="market-tab" data-tabs-toggle="#market-tab-content" role="tablist">
                    <li className="me-2" role="presentation">
                        <button className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'Overview' ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400' : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`} id="market-overview-tab" data-tabs-target="#market-overview" type="button" role="tab" aria-controls="market-overview" aria-selected={activeTab === 'Overview'} onClick={() => setActiveTab('Overview')}>Overview</button>
                    </li>
                    <li className="me-2" role="presentation">
                        <button className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'Sectors' ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400' : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`} id="market-sectors-tab" data-tabs-target="#market-sectors" type="button" role="tab" aria-controls="market-sectors" aria-selected={activeTab === 'Sectors'} onClick={() => setActiveTab('Sectors')}>Sectors</button>
                    </li>
                    <li className="me-2" role="presentation">
                        <button className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'Indices' ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400' : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`} id="market-indices-tab" data-tabs-target="#market-indices" type="button" role="tab" aria-controls="market-indices" aria-selected={activeTab === 'Indices'} onClick={() => setActiveTab('Indices')}>Indices</button>
                    </li>
                     <li role="presentation">
                        <button className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'Volatility' ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400' : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`} id="market-volatility-tab" data-tabs-target="#market-volatility" type="button" role="tab" aria-controls="market-volatility" aria-selected={activeTab === 'Volatility'} onClick={() => setActiveTab('Volatility')}>Volatility</button>
                    </li>
                </ul>
            </div>

            {/* Content based on active tab */}
            <div>
                {renderContent()}
            </div>
        </div>
    );
};

export default MarketDashboard; 