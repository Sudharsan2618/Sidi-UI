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
    switch (type) {
      case 'population':
        return {
          dataClasses: [
            { to: 20, color: "#FF0000", name: "Poor" },
            { from: 20, to: 40, color: "#FFFF00", name: "Below Average" },
            { from: 40, to: 60, color: "#FFA500", name: "Average" },
            { from: 60, to: 80, color: "#90EE90", name: "Above Average" },
            { from: 80, color: "#008000", name: "Good" },
          ]
        };
      case 'gdp':
        return {
          dataClasses: [
            { to: 20, color: "#FF4136", name: "Very Low" },
            { from: 20, to: 40, color: "#FF851B", name: "Low" },
            { from: 40, to: 60, color: "#FFDC00", name: "Medium" },
            { from: 60, to: 80, color: "#2ECC40", name: "High" },
            { from: 80, color: "#01FF70", name: "Very High" },
          ]
        };
      case 'market':
        return {
          dataClasses: [
            { to: 20, color: "#B10DC9", name: "Emerging" },
            { from: 20, to: 40, color: "#F012BE", name: "Developing" },
            { from: 40, to: 60, color: "#85144b", name: "Stable" },
            { from: 60, to: 80, color: "#39CCCC", name: "Growing" },
            { from: 80, color: "#7FDBFF", name: "Mature" },
          ]
        };
      case 'industries':
        return {
          dataClasses: [
            { to: 20, color: "#001f3f", name: "Primary" },
            { from: 20, to: 40, color: "#0074D9", name: "Secondary" },
            { from: 40, to: 60, color: "#7FDBFF", name: "Tertiary" },
            { from: 60, to: 80, color: "#39CCCC", name: "Quaternary" },
            { from: 80, color: "#3D9970", name: "Quinary" },
          ]
        };
      default:
        return {
          dataClasses: [
            { to: 20, color: "#FF0000", name: "Poor" },
            { from: 20, to: 40, color: "#FFFF00", name: "Below Average" },
            { from: 40, to: 60, color: "#FFA500", name: "Average" },
            { from: 60, to: 80, color: "#90EE90", name: "Above Average" },
            { from: 80, color: "#008000", name: "Good" },
          ]
        };
    }
  };

  const getTooltipFormatter = (type) => {
    switch (type) {
      case 'population':
        return function () {
          return `<strong>${this.point.name}</strong><br>Population Share: ${this.point.value.toFixed(2)}%`;
        };
      case 'gdp':
        return function () {
          return `<strong>${this.point.name}</strong><br>GDP Share: ${this.point.value.toFixed(2)}%`;
        };
      case 'market':
        return function () {
          return `<strong>${this.point.name}</strong><br>Market Share: ${this.point.value.toFixed(2)}%`;
        };
      case 'industries':
        return function () {
          return `<strong>${this.point.name}</strong><br>Industry Share: ${this.point.value.toFixed(2)}%`;
        };
      default:
        return function () {
          return `<strong>${this.point.name}</strong><br>Value: ${this.point.value.toFixed(2)}%`;
        };
    }
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

        mapNavigation: {
          enabled: true,
          enableDoubleClickZoomTo: true,
          buttonOptions: {
            verticalAlign: 'bottom',
            align: 'right',
            alignTo: 'spacingBox',
          },
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
            enabled: true,
            format: '{point.properties.hc-a2}',
            style: {
              textOutline: 'none',
              fontWeight: 'normal'
            }
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
