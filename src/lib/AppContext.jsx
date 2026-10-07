import React, { createContext, useContext, useState, useCallback } from "react";

const AppContext = createContext(null);

const STORAGE_KEY = "smart_farm_state_v2";

function defaults() {
  return {
    points: 1250,
    steps: 0,
    stepThreshold: 20000,
    stepReward: 1000,
    badges: ["b1", "b2", "b3"],
    bookings: [],
    visits: [],
    redeemed: [],
    activeVisit: null,
    serviceSubs: [],
    laborRequests: [],
    pesticideResults: [],
    weevilAnalyses: []
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaults(), ...JSON.parse(raw) };
  } catch (e) {}
  return defaults();
}

export function AppProvider({ children }) {
  const [state, setState] = useState(loadState);

  const addBooking = useCallback((booking) => {
    setState((s) => {
      const next = { ...s, bookings: [...s.bookings, booking] };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) {}
      return next;
    });
  }, []);

  const redeemReward = useCallback((reward) => {
    let ok = false;
    setState((s) => {
      if (s.points < reward.cost) return s;
      ok = true;
      const next = { ...s, points: s.points - reward.cost, redeemed: [...s.redeemed, { id: reward.id, title: reward.title, date: new Date().toISOString() }] };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) {}
      return next;
    });
    return ok;
  }, []);

  const startVisit = useCallback((farmId, farmName) => {
    const visit = { id: "v" + Date.now(), farmId, farmName, startedAt: new Date().toISOString(), steps: 0, rewarded: false, activitiesDone: 0 };
    setState((s) => {
      const next = { ...s, activeVisit: visit };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) {}
      return next;
    });
    return visit;
  }, []);

  const addSteps = useCallback((newSteps) => {
    setState((s) => {
      if (!s.activeVisit) return s;
      const totalSteps = s.activeVisit.steps + newSteps;
      const threshold = s.stepThreshold || 20000;
      const crossed = !s.activeVisit.rewarded && s.activeVisit.steps < threshold && totalSteps >= threshold;
      const visit = { ...s.activeVisit, steps: totalSteps, rewarded: s.activeVisit.rewarded || crossed };
      const pointsGain = crossed ? (s.stepReward || 1000) : 0;
      const next = { ...s, activeVisit: visit, steps: s.steps + newSteps, points: s.points + pointsGain };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) {}
      return next;
    });
  }, []);

  const completeActivity = useCallback(() => {
    setState((s) => {
      if (!s.activeVisit) return s;
      const visit = { ...s.activeVisit, activitiesDone: s.activeVisit.activitiesDone + 1 };
      const next = { ...s, activeVisit: visit, points: s.points + 50 };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) {}
      return next;
    });
  }, []);

  const endVisit = useCallback(() => {
    setState((s) => {
      if (!s.activeVisit) return s;
      const visit = { ...s.activeVisit, endedAt: new Date().toISOString() };
      const next = { ...s, activeVisit: null, visits: [...s.visits, visit], points: s.points + 100 };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) {}
      return next;
    });
  }, []);

  const subscribeService = useCallback((serviceId) => {
    setState((s) => {
      if (s.serviceSubs.includes(serviceId)) return s;
      const next = { ...s, serviceSubs: [...s.serviceSubs, serviceId] };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) {}
      return next;
    });
  }, []);

  const addLaborRequest = useCallback((req) => {
    setState((s) => {
      const entry = { id: "LR" + Date.now(), status: "available", ...req, createdAt: new Date().toISOString() };
      const next = { ...s, laborRequests: [entry, ...s.laborRequests] };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) {}
      return next;
    });
  }, []);

  const addPesticideResult = useCallback((r) => {
    setState((s) => {
      const entry = { id: "PR" + Date.now(), ...r, createdAt: new Date().toISOString() };
      const next = { ...s, pesticideResults: [entry, ...s.pesticideResults] };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) {}
      return next;
    });
  }, []);

  const addWeevilAnalysis = useCallback((a) => {
    setState((s) => {
      const entry = { id: "WA" + Date.now(), ...a, createdAt: new Date().toISOString() };
      const next = { ...s, weevilAnalyses: [entry, ...s.weevilAnalyses] };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) {}
      return next;
    });
  }, []);

  const setStepThreshold = useCallback((n) => {
    setState((s) => {
      const next = { ...s, stepThreshold: Math.max(1000, Number(n) || 20000) };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) {}
      return next;
    });
  }, []);

  return (
    <AppContext.Provider value={{ state, addBooking, redeemReward, startVisit, addSteps, completeActivity, endVisit, subscribeService, addLaborRequest, addPesticideResult, addWeevilAnalysis, setStepThreshold }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}