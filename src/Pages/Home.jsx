import React, { useState } from "react";
import { GraduationCap, MessageCircle, Award, Brain, BookOpen, Briefcase } from "lucide-react"
import { Link } from "react-router-dom";
import MapComponent from "../Components/MapComponent";

const Home = () => {

  const [mapName, setMapName] = useState('World, medium resolution');
  const [mapKey, setMapKey] = useState('custom/world');
  const [data, setData] = useState([
    { key: 'us', value: 50, },
    { key: 'ca', value: 70, },
    { key: 'mx', value: 30, },
    { key: 'br', value: 90, },
    { key: 'in', value: 60, }
  ]);

  const handleMapChange = (newMapName, newMapKey) => {
    setMapName(newMapName);
    setMapKey(newMapKey);
  };

  return <>
    <div id="demo-wrapper">
      <div id="map-box">
        <MapComponent mapName={mapName} mapKey={mapKey} data={data} onMapChange={handleMapChange} />
      </div>
    </div>
  </>

}
export default Home;
