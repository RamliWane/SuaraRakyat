// components/client/MapView.jsx
"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix icon default Leaflet yang sering broken di Next.js
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Custom icon emerald
const emeraldIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

const reports = [
    { id: 1, lat: -6.2088, lng: 106.8456, title: "Jalan berlubang Jl. Raya Bogor", status: "Diproses", votes: 342 },
    { id: 2, lat: -6.1751, lng: 106.8272, title: "Sampah liar kali Ciliwung", status: "Terverifikasi", votes: 218 },
    { id: 3, lat: -6.2615, lng: 106.7810, title: "Dugaan markup anggaran RT 05", status: "Eskalasi", votes: 487 },
    { id: 4, lat: -6.3000, lng: 107.0000, title: "Puskesmas tutup jam operasional", status: "Selesai", votes: 156 },
];

export default function MapView() {
    return (
        <MapContainer
            center={[-6.2088, 106.8456]}
            zoom={12}
            style={{ width: "100%", height: "100%" }}  // ← ini yang penting
            scrollWheelZoom={false}
        >
            {/* Tile layer — OpenStreetMap gratis tanpa API key */}
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {reports.map((r) => (
                <Marker key={r.id} position={[r.lat, r.lng]} icon={emeraldIcon}>
                    <Popup>
                        <div className="text-sm">
                            <p className="font-semibold text-gray-900 mb-1">{r.title}</p>
                            <p className="text-gray-500 text-xs mb-1">Status: {r.status}</p>
                            <p className="text-emerald-600 text-xs font-medium">▲ {r.votes} dukungan</p>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}