import { createContext, useContext, useState } from 'react';
import api from './api';
import { showToast } from './components/Toast';
import { startLoading, stopLoading } from './components/LoadingScreen';

const AppContext = createContext();

export function handleError(error) {
  if (error.response) {
    showToast(error.response.data.message);
  } else {
    showToast('Something went wrong!');
  }
}

export function AppProvider({ children }) {
  // ================================================================
  // ---------------------------------------------------------------

  // events
  const [events, setEvents] = useState(undefined);
  const getEvents = ({ size = 10, page = 1 }) => {
    startLoading();
    api
      .get(`/open_events?size=${size}&page=${page}`)
      .then((response) => {
        setEvents(response.data.data);
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(stopLoading);
  };

  // affiliation
  const [affiliations, setAffiliations] = useState(undefined);
  const getAffiliations = () => {
    startLoading();
    api
      .get('/affiliations')
      .then((response) => {
        setAffiliations(response.data.data);
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(stopLoading);
  };

  // ================================================================
  return (
    <AppContext.Provider
      value={{
        events,
        getEvents,
        affiliations,
        getAffiliations,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
