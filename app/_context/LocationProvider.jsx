"use client";
import { createContext, useContext, useState } from "react";
import { locations } from "../_helper/helper";

const LocatioContext = createContext();

function LocationProvider({ children }) {
  const [selectedLocation, setSelectedLocation] = useState("");
  const deliveryPrice =
    locations.find((location) => location.name === selectedLocation)?.price ||
    0;

  return (
    <LocatioContext.Provider
      value={{ selectedLocation, setSelectedLocation, deliveryPrice }}
    >
      {children}
    </LocatioContext.Provider>
  );
}

function useClosestLocation() {
  const context = useContext(LocatioContext);
  if (context === undefined) {
    throw new Error(
      "useClosestLocation must be used within a LocationProvider"
    );
  }
  return context;
}
export { LocationProvider, useClosestLocation };
