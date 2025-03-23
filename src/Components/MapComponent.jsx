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

const MapComponent = ({ mapName, mapKey, data, onMapChange, mapType }) => {
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



  useEffect(() => {

    console.log(data, "sol");

    const fetchMapData = async () => {
      const response = await fetch(`https://code.highcharts.com/mapdata/${mapKey}.topo.json`);
      const topology = await response.json();

      const chart = Highcharts.mapChart(chartRef.current, {
        chart: {
          backgroundColor: null,
          title: {
            text: null,
            style: {
              display: "none",
            },
          },
          width: window.innerWidth,
          height: window.innerHeight,

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

        title: {
          text: null, // Ensure the title is explicitly set to null
        },
        colorAxis: {
          dataClasses: [
            { to: 20, color: "#FF0000", name: "0 - 20 (Red)" }, // Red
            { from: 20, to: 40, color: "#FFFF00", name: "20 - 40 (Yellow)" }, // Yellow
            { from: 40, to: 60, color: "#FFA500", name: "40 - 60 (Orange)" }, // Orange
            { from: 60, to: 80, color: "#90EE90", name: "60 - 80 (Light Green)" }, // Light Green
            { from: 80, color: "#008000", name: "80+ (Green)" }, // Green
          ],
          showInLegend: true, // Show legend
        },
        legend: {
          layout: "vertical",
          align: "top", // Align to the right side
          verticalAlign: "middle", // Position it in the middle
          floating: false, // Keep it fixed
          backgroundColor: "#FFFFFF", // White background for better visibility
          borderWidth: 1, // Add a border
        },
        mapNavigation: {
          enabled: true,
          buttonOptions: {
            alignTo: "spacingBox",
            x: 10,
          },
        },
        tooltip: {
          useHTML: true,
          borderColor: "#FFFFFF",
          style: { fontSize: "12px" },
          formatter: function () {
            return `<strong>${this.point.name}</strong><br>Value: ${this.point.value}`;
          },
        },
        series: [
          {
            data,
            mapData: topology,
            joinBy: ["hc-key", "key"],
            name: country,
            dataLabels: {
              formatter: function () {
                return this.point.properties && this.point.properties["hc-a2"];
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

      // Function to update chart size on window resize
      const handleResize = () => {
        chart.setSize(window.innerWidth, window.innerHeight, false);
      };

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Cleanup function
      return () => {
        window.removeEventListener("resize", handleResize);
        chart.destroy();
      };
    };

    fetchMapData();
  }, [mapName, mapKey, data, onMapChange, userColor]); // Re-run when dependencies change

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
