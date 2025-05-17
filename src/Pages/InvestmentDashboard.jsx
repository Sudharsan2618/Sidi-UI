import React, { useState } from 'react';
// import { TrendingUp, PieChart, DollarSign, Briefcase } from 'lucide-react'; // Remove unused imports
import { Fade } from 'react-awesome-reveal'; // Import Fade for animations
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

const InvestmentDashboard = () => {
    // Remove unused stats data
    // const stats = [...];

    const [activeTab, setActiveTab] = useState('Overview'); // State for active tab

    // Dummy data for investment charts and content
    const portfolioPerformanceData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Portfolio Value (USD)',
                data: [100000, 105000, 103000, 108000, 112000, 110000, 115000, 120000, 118000, 123000, 128000, 125000],
                borderColor: '#4ADE80',
                fill: false,
            },
             {
                label: 'Benchmark (e.g., S&P 500)',
                data: [100000, 104000, 102000, 106000, 110000, 108000, 113000, 117000, 115000, 120000, 125000, 122000],
                borderColor: '#818CF8',
                fill: false,
                borderDash: [5, 5],
            },
        ],
    };

    const assetDistributionData = {
        labels: ['Stocks', 'Bonds', 'Real Estate', 'Alternatives'],
        datasets: [
            {
                data: [40, 30, 20, 10],
                backgroundColor: ['#818CF8', '#22D3EE', '#4ADE80', '#A78BFA'],
            },
        ],
    };

    const recentTransactionsData = [
        { date: '2023-12-01', type: 'Buy', asset: 'Stock A', amount: '$1000' },
        { date: '2023-11-28', type: 'Sell', asset: 'Bond X', amount: '$500' },
        { date: '2023-11-15', type: 'Buy', asset: 'Stock B', amount: '$1500' },
        { date: '2023-11-10', type: 'Dividend', asset: 'Stock A', amount: '$50' },
    ];

    const portfolioAllocationData = {
        labels: ['Technology', 'Healthcare', 'Finance', 'Energy', 'Consumer Discretionary'],
        datasets: [
            {
                data: [25, 20, 18, 15, 12],
                backgroundColor: ['#4ADE80', '#818CF8', '#A78BFA', '#E879F9', '#22D3EE'],
            },
        ],
    };

    const investmentOpportunitiesData = [
        { asset: 'Emerging Markets Equity Fund', type: 'Fund', expectedReturn: '12%', riskLevel: 'High' },
        { asset: 'Global Technology ETF', type: 'ETF', expectedReturn: '15%', riskLevel: 'Medium' },
        { asset: 'Infrastructure Bond', type: 'Bond', expectedReturn: '6%', riskLevel: 'Low' },
         { asset: 'Real Estate Crowdfunding', type: 'Alternative', expectedReturn: '10%', riskLevel: 'Medium' },
    ];

    const sectorOpportunityData = {
        labels: ['Technology', 'Renewable Energy', 'Healthcare', 'FinTech', 'E-commerce'],
        datasets: [
            {
                label: 'Opportunity Score',
                data: [90, 85, 80, 75, 70],
                backgroundColor: ['#818CF8', '#4ADE80', '#22D3EE', '#A78BFA', '#F87171'],
            },
        ],
    };

    const portfolioVolatilityData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Portfolio Volatility (%)',
                data: [15, 14, 16, 15, 13, 14, 15, 14, 16, 15, 13, 12],
                borderColor: '#F87171',
                fill: false,
            },
        ],
    };

    const riskMetricsData = [
        { metric: 'Beta', value: '1.1' },
        { metric: 'Sharpe Ratio', value: '0.8' },
        { metric: 'Max Drawdown', value: '-8%' },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'Overview':
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Portfolio Performance Line Chart */}
                        <Fade direction="up" triggerOnce>
                            <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm p-6">
                                <h2 className="text-lg font-semibold mb-4 dark:text-white">Portfolio Performance</h2>
                                <div className="h-72">
                                    <Line data={portfolioPerformanceData} options={{ maintainAspectRatio: false }} />
                                </div>
                            </div>
                        </Fade>

                        {/* Asset Distribution Doughnut Chart */}
                        <Fade direction="up" triggerOnce delay={100}>
                            <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm p-6">
                                <h2 className="text-lg font-semibold mb-4 dark:text-white">Asset Distribution</h2>
                                <div className="h-72 flex items-center justify-center">
                                    <Doughnut data={assetDistributionData} options={{ maintainAspectRatio: false }} />
                                </div>
                            </div>
                        </Fade>

                         {/* Recent Transactions Table */}
                        <Fade direction="up" triggerOnce delay={200}>
                            <div className="lg:col-span-2 bg-white dark:bg-dark-card rounded-lg shadow-sm p-6">
                                <h2 className="text-lg font-semibold mb-4 dark:text-white">Recent Transactions</h2>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Asset</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-dark-card dark:divide-gray-700">
                                            {recentTransactionsData.map((row, index) => (
                                                <tr key={index}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{row.date}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{row.type}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{row.asset}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{row.amount}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Fade>

                    </div>
                );
            case 'Portfolio':
                return (
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Portfolio Allocation Doughnut Chart */}
                        <Fade direction="up" triggerOnce>
                            <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm p-6">
                                <h2 className="text-lg font-semibold mb-4 dark:text-white">Portfolio Allocation by Sector</h2>
                                 <div className="h-96 flex items-center justify-center">
                                     <Doughnut data={portfolioAllocationData} options={{ maintainAspectRatio: false }} />
                                 </div>
                            </div>
                        </Fade>
                         {/* Portfolio Performance vs Benchmark Line Chart */}
                        <Fade direction="up" triggerOnce delay={100}>
                             <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm p-6">
                                <h2 className="text-lg font-semibold mb-4 dark:text-white">Portfolio Performance vs. Benchmark</h2>
                                 <div className="h-96">
                                     <Line data={portfolioPerformanceData} options={{ maintainAspectRatio: false }} />
                                 </div>
                            </div>
                        </Fade>
                    </div>
                );
            case 'Opportunities':
                return (
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Potential Investment Opportunities Table */}
                        <Fade direction="up" triggerOnce>
                            <div className="lg:col-span-2 bg-white dark:bg-dark-card rounded-lg shadow-sm p-6">
                                <h2 className="text-lg font-semibold mb-4 dark:text-white">Potential Investment Opportunities</h2>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Asset</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Expected Return</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Risk Level</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-dark-card dark:divide-gray-700">
                                            {investmentOpportunitiesData.map((row, index) => (
                                                <tr key={index}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{row.asset}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{row.type}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400">{row.expectedReturn}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 dark:text-red-400">{row.riskLevel}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Fade>
                        {/* Opportunity Scores by Sector Bar Chart */}
                        <Fade direction="up" triggerOnce delay={100}>
                             <div className="lg:col-span-2 bg-white dark:bg-dark-card rounded-lg shadow-sm p-6">
                                <h2 className="text-lg font-semibold mb-4 dark:text-white">Opportunity Scores by Sector</h2>
                                 <div className="h-72">
                                     <Bar data={sectorOpportunityData} options={{ maintainAspectRatio: false }} />
                                 </div>
                            </div>
                        </Fade>
                    </div>
                );
             case 'Risk Analysis':
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Portfolio Volatility Line Chart */}
                         <Fade direction="up" triggerOnce>
                            <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm p-6">
                                <h2 className="text-lg font-semibold mb-4 dark:text-white">Portfolio Volatility</h2>
                                <div className="h-72">
                                     <Line data={portfolioVolatilityData} options={{ maintainAspectRatio: false }} />
                                </div>
                            </div>
                         </Fade>
                         {/* Key Risk Metrics Table */}
                        <Fade direction="up" triggerOnce delay={100}>
                            <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm p-6">
                                <h2 className="text-lg font-semibold mb-4 dark:text-white">Key Risk Metrics</h2>
                                 <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Metric</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Value</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-dark-card dark:divide-gray-700">
                                            {riskMetricsData.map((row, index) => (
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
            default:
                return null;
        }
    };

    return (
        <div className="p-6">
            <Fade triggerOnce>
                <h1 className="text-2xl font-bold mb-2 dark:text-white">Global Investment Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Track and analyze your investments</p>
            </Fade>

            {/* Tabs */}
            <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="investment-tab" data-tabs-toggle="#investment-tab-content" role="tablist">
                    <li className="me-2" role="presentation">
                        <button className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'Overview' ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400' : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`} id="investment-overview-tab" data-tabs-target="#investment-overview" type="button" role="tab" aria-controls="investment-overview" aria-selected={activeTab === 'Overview'} onClick={() => setActiveTab('Overview')}>Overview</button>
                    </li>
                    <li className="me-2" role="presentation">
                        <button className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'Portfolio' ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400' : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`} id="investment-portfolio-tab" data-tabs-target="#investment-portfolio" type="button" role="tab" aria-controls="investment-portfolio" aria-selected={activeTab === 'Portfolio'} onClick={() => setActiveTab('Portfolio')}>Portfolio</button>
                    </li>
                    <li className="me-2" role="presentation">
                        <button className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'Opportunities' ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400' : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`} id="investment-opportunities-tab" data-tabs-target="#investment-opportunities" type="button" role="tab" aria-controls="investment-opportunities" aria-selected={activeTab === 'Opportunities'} onClick={() => setActiveTab('Opportunities')}>Opportunities</button>
                    </li>
                     <li role="presentation">
                        <button className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'Risk Analysis' ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400' : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`} id="investment-risk-analysis-tab" data-tabs-target="#investment-risk-analysis" type="button" role="tab" aria-controls="investment-risk-analysis" aria-selected={activeTab === 'Risk Analysis'} onClick={() => setActiveTab('Risk Analysis')}>Risk Analysis</button>
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

export default InvestmentDashboard; 