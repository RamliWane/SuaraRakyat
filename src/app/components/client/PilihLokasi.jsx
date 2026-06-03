"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

function ClickHandler({ onMapClick }) {
    useMapEvents({
        click: (e) => onMapClick(e.latlng),
    });
    return null;
}

export default function PilihLokasi({ coords, onMapClick }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
            iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
            shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        });
        setMounted(true);
    }, []);

    if (!mounted) return (
        <div className="w-full h-full bg-emerald-50 flex items-center justify-center">
            <i className="ti ti-loader-2 animate-spin text-2xl text-emerald-500" />
        </div>
    );

    return (
        <MapContainer
            center={coords ?? { lat: -6.2088, lng: 106.8456 }}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
            scrollWheelZoom={true}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            <ClickHandler onMapClick={onMapClick} />
            {coords && <Marker position={coords} />}
        </MapContainer>
    );
}