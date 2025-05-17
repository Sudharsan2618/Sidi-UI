import React, { useEffect, useState } from 'react';
import MapComponent from '../Components/MapComponent';
import { Audio } from "react-loader-spinner";

const MarketMap = () => {
    const [mapName, setMapName] = useState('World, medium resolution');
    const [mapKey, setMapKey] = useState('custom/world');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleMapChange = (newMapName, newMapKey) => {
        setMapName(newMapName);
        setMapKey(newMapKey);
    };

    useEffect(() => {
        const fetchMarketData = async () => {
            try {
                const response = await fetch(`https://sidi-be.onrender.com/api/marketShare`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const rawData = await response.json();

                if (!Array.isArray(rawData.data)) {
                    throw new Error("Invalid data format: Expected an array");
                }

                const convertedData = rawData.data.map(entry => {
                    const key = entry.country_iso_code.split(" / ")[0].toLowerCase();
                    const value = parseFloat(entry.market_share) * 100;
                    return { key, value };
                });

                setData(convertedData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching market data:", error);
                setLoading(false);
            }
        };

        fetchMarketData();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-2 dark:text-white">Global Market Share Distribution</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Visualizing market share distribution across the globe.</p>
            <div className="flex justify-center items-center">
                <div id="demo-wrapper" className="w-full p-4">
                    <div id="map-box" className="relative">
                        {loading ? (
                            <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 bg-white">
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
                                mapType="market"
                                data={data}
                                onMapChange={handleMapChange}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketMap; 