"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const reports = [
    { id: 1, lat: -6.2088, lng: 106.8456, title: "Jalan berlubang Jl. Raya Bogor", status: "Diproses", votes: 342 },
    { id: 2, lat: -6.1751, lng: 106.8272, title: "Sampah liar kali Ciliwung", status: "Terverifikasi", votes: 218 },
    { id: 3, lat: -6.2615, lng: 106.7810, title: "Dugaan markup anggaran RT 05", status: "Eskalasi", votes: 487 },
    { id: 4, lat: -6.3000, lng: 107.0000, title: "Puskesmas tutup jam operasional", status: "Selesai", votes: 156 },
];

export default function MapView() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Fix icon Leaflet
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
            center={[-6.2088, 106.8456]}
            zoom={12}
            className="w-full h-full"
            scrollWheelZoom={true}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            {reports.map((r) => (
                <Marker key={r.id} position={[r.lat, r.lng]}>
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