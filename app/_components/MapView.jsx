"use client";

import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

import Button from "@/app/_components/Button";
import { useGeolocate } from "@/app/_hooks/useGeolocate";
import { getAddress } from "@/app/_libs/data-utils";
import L from "leaflet";
import toast from "react-hot-toast";
import { HiArrowPath } from "react-icons/hi2";

// Set default icon globally using CDN URLs
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function MapView({
  mapPosition,
  setMapPosition,
  onAddressSelect,
}) {
  const { isLoading, error, lat, lng, getPosition } = useGeolocate();

  useEffect(() => {
    if (lat && lng) setMapPosition([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    async function fetchAddress() {
      try {
        if (!lat || !lng) return; // guard
        const data = await getAddress(lat, lng);
        if (data && onAddressSelect) onAddressSelect(data);
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
    <div className="relative h-[calc(100vh-70vh)] lg:h-full w-full shadow shadow-brown-200/30 rounded overflow-hidden border border-brown-100">
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
        <DetectClick
          setMapPosition={setMapPosition}
          onAddressSelect={onAddressSelect}
        />
      </MapContainer>
      {!lat && !lng && (
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-40">
          <Button
            type="danger"
            onClick={handlePosition}
            icon={isLoading && <HiArrowPath className="animate-spin" />}
          >
            <span>{isLoading ? "Getting address..." : "Get My Address"}</span>
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

function DetectClick({ setMapPosition, onAddressSelect }) {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      setMapPosition([lat, lng]);
      try {
        const data = await getAddress(lat, lng);
        if (data && onAddressSelect) onAddressSelect(data);
      } catch (error) {
        toast.error("Could not fetch address from map click");
      }
    },
  });
}
