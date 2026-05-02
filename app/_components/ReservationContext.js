"use client";
import { createContext, useContext, useState } from "react";

const ReservationContext = createContext(null);
const initialState = { from: undefined, to: undefined };

function ReservationProvider({ children }) {
  const [range, setRange] = useState(initialState);
  const restRange = () => setRange(initialState);
  return (
    <ReservationContext.Provider value={{ range, setRange, restRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (context === null || context === undefined) {
    return {
      range: initialState,
      setRange: () => {},
      restRange: () => {},
    };
  }
  return context;
}

export { ReservationProvider, useReservation };
