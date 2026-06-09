"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { getAllLaporan } from "../../../lib/api/laporan";

export default function MapView() {
    const [mounted, setMounted] = useState(false);
    const [reports, setReports] = useState([]);

    useEffect(() => {
        delete L.Icon.Default.prototype._getIconUrl;

        L.Icon.Default.mergeOptions({
            iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
            iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
            shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        });

        setMounted(true);

        // fetch data
        async function fetchData() {
            try {
                const data = await getAllLaporan();
                setReports(data);
            } catch (err) {
                console.error(err);
            }
        }

        fetchData();
    }, []);

    if (!mounted) return <div>Loading map...</div>;

    return (
        <MapContainer
            center={[-6.2088, 106.8456]}
            zoom={12}
            style={{ height: "500px", width: "100%" }}
        >
            <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />

            {reports.map((r) => {
                if (!r.lat || !r.lng) return null;

                return (
                    <Marker key={r.id} position={[r.lat, r.lng]}>
                        <Popup>
                            <div className="text-sm">
                                <p className="font-semibold">{r.judul}</p>
                                <p className="text-xs text-gray-500">
                                    Status: {r.status}
                                </p>
                                <p className="text-xs text-emerald-600">
                                    ▲ {r.votes || 0} dukungan
                                </p>
                            </div>
                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );
}