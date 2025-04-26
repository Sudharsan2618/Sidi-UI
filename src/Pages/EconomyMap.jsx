// import React, { useEffect, useState } from 'react';
// import MapComponent from '../Components/MapComponent';
// import { Audio } from "react-loader-spinner";

// const EconomyMap = () => {
//     const [mapName, setMapName] = useState('World, medium resolution');
//     const [mapKey, setMapKey] = useState('custom/world');
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const handleMapChange = (newMapName, newMapKey) => {
//         setMapName(newMapName);
//         setMapKey(newMapKey);
//     };

//     useEffect(() => {
//         const fetchEconomyData = async () => {
//             try {
//                 const response = await fetch(`https://sidi-be.onrender.com/api/gdpPercentage`, {
//                     method: "GET",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                 });

//                 if (!response.ok) {
//                     throw new Error(`HTTP error! Status: ${response.status}`);
//                 }

//                 const rawData = await response.json();
//                 console.log('Raw data from API:', rawData);

//                 if (!Array.isArray(rawData.data)) {
//                     throw new Error("Invalid data format: Expected an array");
//                 }

//                 const convertedData = rawData.data.map(entry => {
//                     const key = entry.country_iso_code.split(" / ")[0].toLowerCase();
//                     const value = parseFloat(entry.gdp_percentage) * 100;
//                     console.log('Converting entry:', { original: entry, converted: { key, value } });
//                     return { key, value };
//                 });

//                 console.log('Final converted data:', convertedData);
//                 setData(convertedData);
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching GDP data:", error);
//                 setLoading(false);
//             }
//         };

//         fetchEconomyData();
//     }, []);

//     return (
//         <div className="min-h-screen flex justify-center items-center">
//             <div id="demo-wrapper" className="w-full p-4">
//                 <div id="map-box" className="relative">
//                     {loading ? (
//                         <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 bg-white">
//                             <Audio
//                                 height="50"
//                                 width="50"
//                                 radius="9"
//                                 color="blue"
//                                 ariaLabel="loading"
//                                 wrapperStyle
//                                 wrapperClass
//                             />
//                         </div>
//                     ) : (
//                         <MapComponent
//                             mapName={mapName}
//                             mapKey={mapKey}
//                             mapType="gdp"
//                             data={data}
//                             onMapChange={handleMapChange}
//                         />
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EconomyMap; 



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
        <div className="min-h-screen flex justify-center items-center">
            <div id="demo-wrapper" className="w-full  p-4">
                <div id="map-box" className="relative">
                    {loading ? (
                        <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 bg-white">
                            {/* <div className="animate-spin rounded-full border-4 border-t-4 border-blue-500 w-16 h-16"></div> */}
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
    );
};

export default EconomyMap;
