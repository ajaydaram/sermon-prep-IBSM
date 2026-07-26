import React, { createContext, useContext, useState, ReactNode } from "react";

interface ObservationContextType {
  observations: string[];
  addObservation: (obs: string) => void;
  removeObservation: (index: number) => void;
  setObservations: (obs: string[]) => void;
  bypassGate: boolean;
  setBypassGate: (bypass: boolean) => void;
  minRequiredObservations: number;
  isConsultationUnlocked: boolean;
}

const ObservationContext = createContext<ObservationContextType | undefined>(undefined);

const DEFAULT_OBSERVATIONS = [
  "The passage in Acts 1:8 begins with the adversative connective 'but'.",
  "'Shall receive' is a future active indicative verb denoting future experience.",
  "The recipient of power is explicitly identified by the plural pronoun 'you'.",
  "The coming of the Holy Spirit has a condition: 'when' it has come.",
  "The geographical boundaries show a structured expansion: Jerusalem, Judea, Samaria, and the end of the earth.",
  "'Witnesses' is coupled with the personal pronoun 'My', denoting ownership."
];

export function ObservationProvider({ children }: { children: ReactNode }) {
  const [observations, setObservationsState] = useState<string[]>(DEFAULT_OBSERVATIONS);
  const [bypassGate, setBypassGate] = useState<boolean>(false);
  const minRequiredObservations = 10;

  const addObservation = (obs: string) => {
    const trimmed = obs.trim();
    if (trimmed && !observations.includes(trimmed)) {
      setObservationsState((prev) => [...prev, trimmed]);
    }
  };

  const removeObservation = (index: number) => {
    setObservationsState((prev) => prev.filter((_, i) => i !== index));
  };

  const setObservations = (obsList: string[]) => {
    setObservationsState(obsList);
  };

  const isConsultationUnlocked = bypassGate || observations.length >= minRequiredObservations;

  return (
    <ObservationContext.Provider
      value={{
        observations,
        addObservation,
        removeObservation,
        setObservations,
        bypassGate,
        setBypassGate,
        minRequiredObservations,
        isConsultationUnlocked,
      }}
    >
      {children}
    </ObservationContext.Provider>
  );
}

export function useObservations() {
  const context = useContext(ObservationContext);
  if (!context) {
    throw new Error("useObservations must be used within an ObservationProvider");
  }
  return context;
}
