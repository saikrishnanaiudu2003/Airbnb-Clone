"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import { userCountires } from "@/app/lib/getCountries";
import { icon } from "leaflet";

const ICON = icon({
    iconUrl:"https://res.cloudinary.com/tadipatri/image/upload/v1710407508/location_s8e2ap.png",
    iconSize:[50,50]
})

const Map = ({getLocation}:{getLocation:string}) => {
    const {getAllCountryByValue}=userCountires();
    const latLang = getAllCountryByValue(getLocation)?.latLang


  return (
    <MapContainer
      scrollWheelZoom={false}
      className="h-[50vh] rounded-lg relative z-0"
      center={ latLang ??[52.505, -0.09]}
      zoom={3}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={latLang ??[52.505, -0.09]} icon={ICON} />
    </MapContainer>
  );
};

export default Map;
