import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsMapModule from 'highcharts/modules/map';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsGlobe from 'highcharts/modules/tilemap';
import { useSelector } from 'react-redux';

// Import the Highcharts map module
// HighchartsMapModule(Highcharts);
// HighchartsDrilldown(Highcharts);
// HighchartsAccessibility(Highcharts);

const MapComponent = ({ mapName, mapKey, data, onMapChange, mapType }) => {
  const chartRef = useRef(null);
  const { mapColor: userColor } = useSelector(state => state.data)

  const getColorAxis = (type) => {
    return {
      dataClasses: [
        { to: 20, color: '#bbf7d0', name: 'Poor' },    // Lightest green
        { from: 20, to: 40, color: '#6ee7b7', name: 'Below Average' },
        { from: 40, to: 60, color: '#34d399', name: 'Average' },
        { from: 60, to: 80, color: '#059669', name: 'Above Average' },
        { from: 80, color: '#065f46', name: 'Good' } // Darkest green
      ]
    };
  };

  const getTooltipFormatter = (type) => {
    return function () {
      return `<strong>${this.point.name}</strong>`;
    };
  };

  useEffect(() => {
    console.log('MapComponent received data:', data);
    if (!data || !mapName) return;

    const chartData = data.map(item => {
      console.log('Processing map item:', item);
      return [item.key, item.value];
    });
    console.log('Processed chart data:', chartData);

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
          margin: [8, 8, 8, 8],
          animation: true,
          height: '60%',
          events: {
            load: function () {
              this.reflow();
            }
          }
        },

        title: {
          text: null,
        },

        // Disable all exporting options
        exporting: {
          enabled: false
        },

        // Disable map navigation buttons (zoom buttons)
        mapNavigation: {
          enabled: false,
          enableDoubleClickZoomTo: true,
          enableMouseWheelZoom: true
        },

        mapView: {
          projection: {
            name: 'Orthographic',
            rotation: [0, -90]
          }
        },

        colorAxis: getColorAxis(mapType),
        legend: {
          layout: "horizontal",
          align: "center",
          verticalAlign: "bottom",
          floating: false,
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          borderWidth: 1,
          borderRadius: 5,
          padding: 12,
          y: -40,
          itemStyle: {
            fontSize: '13px'
          }
        },

        tooltip: {
          useHTML: true,
          borderColor: "#FFFFFF",
          style: { fontSize: "12px" },
          formatter: getTooltipFormatter(mapType)
        },

        series: [{
          name: mapName,
          data: chartData,
          mapData: topology,
          joinBy: ["hc-key", 0],
          borderColor: '#FFF',
          borderWidth: 0.5,
          states: {
            hover: {
              color: '#a4edba',
              borderWidth: 1
            }
          },
          dataLabels: {
            enabled: false
          }
        }],

        credits: {
          enabled: false
        }
      });

      // Add rotation on drag
      let isMouseDown = false;
      let previousX;
      let previousY;

      chart.container.addEventListener('mousedown', (e) => {
        isMouseDown = true;
        previousX = e.pageX;
        previousY = e.pageY;
      });

      document.addEventListener('mousemove', (e) => {
        if (isMouseDown) {
          const deltaX = e.pageX - previousX;
          const deltaY = e.pageY - previousY;

          const projection = chart.mapView.projection;
          const rotation = projection.options.rotation;

          projection.update({
            rotation: [
              rotation[0] + deltaY * 0.5,
              rotation[1] - deltaX * 0.5
            ]
          }, true);

          previousX = e.pageX;
          previousY = e.pageY;
        }
      });

      document.addEventListener('mouseup', () => {
        isMouseDown = false;
      });

      const handleResize = () => {
        chart.setSize(window.innerWidth, window.innerHeight, false);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        chart.destroy();
      };
    };

    fetchMapData();
  }, [mapName, mapKey, data, onMapChange, userColor, mapType]);

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div
        ref={chartRef}
        className="w-full h-[calc(100vh-200px)] flex justify-center items-center"
        style={{ minHeight: '600px' }}
      />
    </div>
  );
};

export default MapComponent;
