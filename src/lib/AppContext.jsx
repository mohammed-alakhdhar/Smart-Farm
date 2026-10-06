import React, { createContext, useContext, useState, useCallback } from "react";

const AppContext = createContext(null);

const STORAGE_KEY = "smart_farm_state_v1";

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return null;
}

export function AppProvider({ children }) {
  const initial = loadState() || {
    points: 1250,
    steps: 0,
    badges: ["b1", "b2", "b3"],
    bookings: [],
    visits: [],
    redeemed: [],
    activeVisit: null
  };
  const [state, setState] = useState(initial);

  const persist = useCallback((next) => {
    setState(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) {}
  }, []);

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
    const visit = { id: "v" + Date.now(), farmId, farmName, startedAt: new Date().toISOString(), steps: 0, points: 0, activitiesDone: 0 };
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
      const earnedPoints = Math.floor(totalSteps / 10) - Math.floor(s.activeVisit.steps / 10);
      const visit = { ...s.activeVisit, steps: totalSteps, points: Math.floor(totalSteps / 10) };
      const next = { ...s, activeVisit: visit, steps: s.steps + newSteps, points: s.points + earnedPoints };
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

  return (
    <AppContext.Provider value={{ state, addBooking, redeemReward, startVisit, addSteps, completeActivity, endVisit }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}