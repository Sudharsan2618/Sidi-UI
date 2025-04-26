import React, { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, DollarSign, Users } from 'lucide-react';
import MapComponent from '../Components/MapComponent';
import { Audio } from "react-loader-spinner";

const EconomyDashboard = () => {
    const [mapName, setMapName] = useState('World, medium resolution');
    const [mapKey, setMapKey] = useState('custom/world');
    const [mapData, setMapData] = useState([]);
    const [loading, setLoading] = useState(true);

    const stats = [
        {
            title: "GDP Growth",
            value: "3.2%",
            change: "+0.5%",
            icon: TrendingUp,
            trend: "up"
        },
        {
            title: "Inflation Rate",
            value: "2.1%",
            change: "-0.3%",
            icon: BarChart3,
            trend: "down"
        },
        {
            title: "Currency Exchange",
            value: "1.25",
            change: "+0.02",
            icon: DollarSign,
            trend: "up"
        },
        {
            title: "Employment Rate",
            value: "95.8%",
            change: "+1.2%",
            icon: Users,
            trend: "up"
        }
    ];

    const handleMapChange = (newMapName, newMapKey) => {
        setMapName(newMapName);
        setMapKey(newMapKey);
    };

    useEffect(() => {
        const fetchEconomyData = async () => {
            try {
                const response = await fetch(`https://sidi-be.onrender.com/api/gdpPercentage`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const rawData = await response.json();
                console.log('Raw data from API:', rawData);

                if (!Array.isArray(rawData.data)) {
                    throw new Error("Invalid data format: Expected an array");
                }

                const convertedData = rawData.data.map(entry => {
                    const key = entry.country_iso_code.split(" / ")[0].toLowerCase();
                    const value = parseFloat(entry.gdp_percentage) * 100;
                    console.log('Converting entry:', { original: entry, converted: { key, value } });
                    return { key, value };
                });

                console.log('Final converted data:', convertedData);
                setMapData(convertedData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching GDP data:", error);
                setLoading(false);
            }
        };

        fetchEconomyData();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 dark:text-white">Economy Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white dark:bg-dark-card rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                                <stat.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                            </div>
                        </div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</h3>
                        <div className="flex items-baseline mt-4">
                            <p className="text-2xl font-semibold dark:text-white">{stat.value}</p>
                            <p className={`ml-2 flex items-center text-sm ${stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                {stat.change}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-6">
                <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm p-6">
                    <h2 className="text-lg font-semibold mb-4 dark:text-white">Global GDP Distribution</h2>
                    <div className="h-[600px] relative">
                        {loading ? (
                            <div className="absolute inset-0 flex justify-center items-center bg-opacity-50 bg-white dark:bg-dark-card">
                                <Audio
                                    height="50"
                                    width="50"
                                    radius="9"
                                    color="#22c55e"
                                    ariaLabel="loading"
                                    wrapperStyle
                                    wrapperClass
                                />
                            </div>
                        ) : (
                            <MapComponent
                                mapName={mapName}
                                mapKey={mapKey}
                                mapType="gdp"
                                data={mapData}
                                onMapChange={handleMapChange}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EconomyDashboard; 