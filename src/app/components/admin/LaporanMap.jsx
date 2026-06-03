// components/admin/LaporanMap.jsx
"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default function LaporanMap({ lat, lng, judul }) {
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
        <div className="h-56 rounded-xl bg-emerald-50 flex items-center justify-center">
            <i className="ti ti-loader-2 animate-spin text-2xl text-emerald-500" />
        </div>
    );

    if (!lat || !lng) return (
        <div className="h-56 rounded-xl bg-gray-50 border border-gray-200 flex flex-col items-center justify-center gap-2">
            <i className="ti ti-map-off text-2xl text-gray-300" />
            <p className="text-[12px] text-gray-400">Koordinat tidak tersedia</p>
        </div>
    );

    return (
        <div className="h-70 rounded-xl overflow-hidden border border-gray-200">
            <MapContainer
                center={[lat, lng]}
                zoom={16}
                style={{ height: "100%", width: "100%" }}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
                <Marker position={[lat, lng]}>
                    <Popup>{judul ?? "Lokasi Laporan"}</Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}