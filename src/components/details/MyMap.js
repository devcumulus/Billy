import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const MyMap = ({ x, y }) => {
  const [position, setPosition] = useState({ lat: x, lng: y });

  useEffect(() => {
    if (x !== null && y !== null) {
      setPosition({ lat: Number(x), lng: Number(y) });
    }
  }, [x, y]);

  const containerStyle = {
    width: "100%",
    position: "relative",
    marginTop: "65px",
    marginBottom: "100px",
  };

  const mapStyle = {
    width: "100%",
    height: "400px",
    position: "relative",
    border: "1px solid #2c39b5",
    borderRadius: "10px",
  };

  return (
    <div style={containerStyle}>
      <Map
        center={position}
        level={3}
        style={mapStyle}
        apiKey="0a7b875855336bf31181760c0e9ea9b1"
      >
        {x !== null && y !== null && <MapMarker position={position} />}
      </Map>
    </div>
  );
};

export default MyMap;
