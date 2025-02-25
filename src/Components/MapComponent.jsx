// import React, { useEffect, useRef, useState } from 'react';
// import Highcharts from 'highcharts';
// import HighchartsMapModule from 'highcharts/modules/map';
// import HighchartsDrilldown from 'highcharts/modules/drilldown';
// import HighchartsAccessibility from 'highcharts/modules/accessibility';

// // Import the Highcharts map module
// // HighchartsMapModule(Highcharts);
// // HighchartsDrilldown(Highcharts);
// // HighchartsAccessibility(Highcharts);

// const MapComponent = ({ mapName, mapKey, data, onMapChange }) => {
//   const chartRef = useRef(null);
//   const [countryData, setCountryData] = useState(null);
//   const [country, setCountry] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   // Fetch the country data from the API
//   const fetchCountry = async (country) => {
//     try {
//       const response = await fetch(`https://sidi-be.onrender.com/api/populationData`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           country_name: country,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error('Error fetching country data:', error);
//       return null;
//     }
//   };

//   // Fetch the map data and render the chart
//   useEffect(() => {
//     const fetchMapData = async () => {
//       const response = await fetch(`https://code.highcharts.com/mapdata/${mapKey}.topo.json`);
//       const topology = await response.json();

//       const chart = Highcharts.mapChart(chartRef.current, {
//         chart: {
//           backgroundColor: null,
//           title: {
//             text: null,
//           },
//           events: {
//             drilldown: async function (e) {
//               const map =
//                 Object.entries(Highcharts.mapDataIndex).find((map) =>
//                   map[0] === e.point.name
//                 ) ||
//                 Object.entries(Highcharts.mapDataIndex).find((map) =>
//                   map[0].indexOf(e.point.name) === 0
//                 );
//               if (map) {
//                 const [mapName, mapKey] = map;
//                 onMapChange(mapName, mapKey);
//               }
//             },
//           },
//         },
//         colorAxis: {
//           min: 0,
//         },
//         mapNavigation: {
//           enabled: true,
//           buttonOptions: {
//             alignTo: 'spacingBox',
//             x: 10,
//           },

//         },

//         tooltip: {
//           useHTML: true,
//           // backgroundColor: 'rgba(0, 0, 0, 0.75)', // Black background with opacity
//           // borderRadius: 2, // Rounded corners for the tooltip
//           // borderWidth: 1, // Border width
//           borderColor: '#FFFFFF', // White border color
//           style: {
//             // color: '#fff', // Text color inside the tooltip
//             // padding: '10px', // Padding inside the tooltip
//             fontSize: '12px', // Font size for the tooltip text
//           },
//           formatter: function () {
//             // Customize the tooltip content (you can use `this.point` for accessing data)
//             return `<strong>${this.point.name}</strong><br>Value: ${this.point.value}`;
//           },
//         },
//         series: [
//           {
//             data,
//             mapData: topology,
//             joinBy: ['hc-key', 'key'],
//             name: country,
//             dataLabels: {
//               formatter: function () {
//                 return this.point.properties && this.point.properties['hc-a2'];
//               },
//             },

//             events: {
//               click: async (e) => {
//                 setCountry(e?.point?.name);
//                 const countryInfo = await fetchCountry(e?.point?.name);  // Fetch data on click
//                 setCountryData(countryInfo);  // Update the country data state
//                 setShowModal(true);  // Show the modal with country info
//               },
//             },
//           },
//         ],
//       });

//       return () => chart.destroy();
//     };

//     fetchMapData();
//   }, [mapName, mapKey, data, onMapChange]);

//   // Modal Close Handler
//   const closeModal = () => {
//     setShowModal(false);  // Hide modal
//     setCountryData(null);  // Clear country data
//   };

//   return (
//     <div>
//       <div ref={chartRef}></div>

//       {/* Modal to show country info */}
//       {showModal && countryData && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-lg max-w-lg w-full">
//             <h1 className="text-2xl font-bold mb-4">{country} Population Growth Trends</h1>
//             <div className="overflow-x-auto max-h-96">
//               <table className="min-w-full border border-gray-300 mb-4 table-fixed">
//                 <thead className=' sticky top-0'>
//                   <tr className="bg-gray-200">
//                     <th className="border px-4 py-2">Year</th>
//                     <th className="border px-4 py-2">Global Rank</th>
//                     <th className="border px-4 py-2">Yearly % Change</th>
//                   </tr>
//                 </thead>
//                 <tbody style={{ maxHeight: '200px', overflowY: 'auto', }}>
//                   {countryData.data.map((item, index) => (
//                     <tr key={index} className="border">
//                       <td className="border px-4 py-2">{item.year}</td>
//                       <td className="border px-4 py-2">{item.country_global_rank}</td>
//                       <td className="border px-4 py-2">{item.yearly_percentage_change}%</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//             <button
//               className="bg-blue-500 text-white px-4 py-2 rounded"
//               onClick={closeModal}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// };

// export default MapComponent;


import React, { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsMapModule from 'highcharts/modules/map';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import { useSelector } from 'react-redux';

// Import the Highcharts map module
// HighchartsMapModule(Highcharts);
// HighchartsDrilldown(Highcharts);
// HighchartsAccessibility(Highcharts);

const MapComponent = ({ mapName, mapKey, data, onMapChange }) => {
  const chartRef = useRef(null);
  const [countryData, setCountryData] = useState(null);
  const [country, setCountry] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { mapColor: userColor } = useSelector(state => state.data)

  // Fetch the country data from the API
  const fetchCountry = async (country) => {
    try {
      const response = await fetch(`https://sidi-be.onrender.com/api/populationData`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          country_name: country,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching country data:', error);
      return null;
    }
  };

  // Fetch the map data and render the chart
  useEffect(() => {
    const fetchMapData = async () => {
      const response = await fetch(`https://code.highcharts.com/mapdata/${mapKey}.topo.json`);
      const topology = await response.json();

      const chart = Highcharts.mapChart(chartRef.current, {
        chart: {
          backgroundColor: null,
          title: {
            text: null,
          },
          events: {
            drilldown: async function (e) {
              const map =
                Object.entries(Highcharts.mapDataIndex).find((map) =>
                  map[0] === e.point.name
                ) ||
                Object.entries(Highcharts.mapDataIndex).find((map) =>
                  map[0].indexOf(e.point.name) === 0
                );
              if (map) {
                const [mapName, mapKey] = map;
                onMapChange(mapName, mapKey);
              }
            },
          },
        },
        colorAxis: {
          min: 0,
          minColor: '#ffffff', // Lightest color for low values
          maxColor: userColor, // User-selected color for high values
        },
        mapNavigation: {
          enabled: true,
          buttonOptions: {
            alignTo: 'spacingBox',
            x: 10,
          },
        },
        tooltip: {
          useHTML: true,
          borderColor: '#FFFFFF',
          style: {
            fontSize: '12px',
          },
          formatter: function () {
            return `<strong>${this.point.name}</strong><br>Value: ${this.point.value}`;
          },
        },
        series: [
          {
            data,
            mapData: topology,
            joinBy: ['hc-key', 'key'],
            name: country,
            dataLabels: {
              formatter: function () {
                return this.point.properties && this.point.properties['hc-a2'];
              },
            },
            events: {
              click: async (e) => {
                setCountry(e?.point?.name);
                const countryInfo = await fetchCountry(e?.point?.name);
                setCountryData(countryInfo);
                setShowModal(true);
              },
            },
          },
        ],
      });

      return () => chart.destroy();
    };

    fetchMapData();
  }, [mapName, mapKey, data, onMapChange, userColor]); // Re-run when user selects a new color


  // Modal Close Handler
  const closeModal = () => {
    setShowModal(false);
    setCountryData(null);
  };

  return (
    <div>


      <div ref={chartRef}></div>

      {/* Modal to show country info */}
      {showModal && countryData && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <h1 className="text-2xl font-bold mb-4">{country} Population Growth Trends</h1>
            <div className="overflow-x-auto max-h-96">
              <table className="min-w-full border border-gray-300 mb-4 table-fixed">
                <thead className='sticky top-0'>
                  <tr className="bg-gray-200">
                    <th className="border px-4 py-2">Year</th>
                    <th className="border px-4 py-2">Global Rank</th>
                    <th className="border px-4 py-2">Yearly % Change</th>
                  </tr>
                </thead>
                <tbody>
                  {countryData.data.map((item, index) => (
                    <tr key={index} className="border">
                      <td className="border px-4 py-2">{item.year}</td>
                      <td className="border px-4 py-2">{item.country_global_rank}</td>
                      <td className="border px-4 py-2">{item.yearly_percentage_change}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
