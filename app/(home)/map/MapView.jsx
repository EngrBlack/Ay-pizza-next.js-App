"use client";

import React, { use, useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import { useGeolocate } from "@/app/_hooks/useGeolocate";
import Button from "@/app/_components/Button";
import { HiArrowPath } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { getAddress } from "@/app/_libs/data-utils";
import toast from "react-hot-toast";

// Set default icon globally using CDN URLs
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function MapView() {
  const { isLoading, error, lat, lng, getPosition } = useGeolocate();
  const [mapPosition, setMapPosition] = useState([
    lat || 6.5244,
    lng || 3.3792,
  ]);

  useEffect(() => {
    if (lat && lng) setMapPosition([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    async function fetchAddress() {
      try {
        if (!lat || !lng) return; // guard
        const data = await getAddress(lat, lng);
        console.log("Address:", data);
      } catch (err) {
        toast.error(err.message);
      }
    }

    fetchAddress();
  }, [lat, lng]);

  function handlePosition() {
    getPosition();
  }

  if (error)
    return (
      <p className="fond-bold text-center p-20 text-brown-300 mx-auto ">
        Could not Load Map, please check your network.
      </p>
    );

  return (
    <div className="relative my-20" style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={mapPosition}
        zoom={14}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={mapPosition}>
          <Popup>
            Ay-Pizza Location
            <br /> Lagos, Nigeria
          </Popup>
        </Marker>
        <ChangeCenter mapPosition={mapPosition} />
        <DetectClick setMapPosition={setMapPosition} />
      </MapContainer>
      {!lat && !lng && (
        <div className="absolute top-4 right-4  z-40">
          <Button
            type="danger"
            onClick={handlePosition}
            icon={isLoading && <HiArrowPath className="animate-spin" />}
          >
            {isLoading ? (
              <span className="font-bold ">Getting location...</span>
            ) : (
              <span className="font-bold uppercase">Get My Position</span>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

function ChangeCenter({ mapPosition }) {
  const map = useMap();
  map.setView(mapPosition);
  return null;
}

function DetectClick({ setMapPosition }) {
  const router = useRouter();
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      router.push(`/map?lat=${lat}&lng=${lng}`);
      setMapPosition([lat, lng]);
      getAddress(lat, lng).then((data) => {
        console.log("Clicked address:", data);
      });
    },
  });
}
