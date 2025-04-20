import React from 'react';
import { TrendingUp, PieChart, DollarSign, Briefcase } from 'lucide-react';

const InvestmentDashboard = () => {
    const stats = [
        {
            title: "Total Portfolio",
            value: "$1.2M",
            change: "+3.5%",
            icon: Briefcase,
            trend: "up"
        },
        {
            title: "ROI",
            value: "15.2%",
            change: "+2.1%",
            icon: TrendingUp,
            trend: "up"
        },
        {
            title: "Asset Allocation",
            value: "Balanced",
            change: "Optimal",
            icon: PieChart,
            trend: "up"
        },
        {
            title: "Monthly Returns",
            value: "$12.5K",
            change: "+5.2%",
            icon: DollarSign,
            trend: "up"
        }
    ];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Investment Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-primary-50 rounded-lg">
                                <stat.icon className="h-6 w-6 text-primary-600" />
                            </div>
                        </div>
                        <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                        <div className="flex items-baseline mt-4">
                            <p className="text-2xl font-semibold">{stat.value}</p>
                            <p className={`ml-2 flex items-center text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                                }`}>
                                {stat.change}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-lg font-semibold mb-4">Portfolio Performance</h2>
                    {/* Add chart component here */}
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-lg font-semibold mb-4">Asset Distribution</h2>
                    {/* Add chart component here */}
                </div>
            </div>
        </div>
    );
};

export default InvestmentDashboard; 