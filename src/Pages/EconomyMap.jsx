import React, { useEffect, useState } from "react";
import { GraduationCap, MessageCircle, Award, Brain, BookOpen, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import MapComponent from "../Components/MapComponent";
import { Audio } from "react-loader-spinner";

const EconomyMap = () => {
    const [mapName, setMapName] = useState('World, medium resolution');
    const [mapKey, setMapKey] = useState('custom/world');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);  // State to manage loader visibility

    const handleMapChange = (newMapName, newMapKey) => {
        setMapName(newMapName);
        setMapKey(newMapKey);
    };

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch(`https://sidi-be.onrender.com/api/populationPercentage`, {
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
                    const value = parseFloat(entry.country_share_of_world_population) * 100;

                    return { key, value };
                });

                setData(convertedData);
                setLoading(false);  // Set loading to false when data is fetched
            } catch (error) {
                console.error("Error fetching country data:", error);
                setLoading(false);  // Set loading to false even if there's an error
            }
        };

        fetchCountries();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-2 dark:text-white">Global Economy Distribution</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Visualizing the world economy distribution by country.</p>
            <div className="flex justify-center items-center">
                <div id="demo-wrapper" className="w-full  p-4">
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
                            <MapComponent mapName={mapName} mapKey={mapKey} mapType={"population"} data={data} onMapChange={handleMapChange} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EconomyMap;
