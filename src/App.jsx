import { Routes, Route } from 'react-router-dom';
import { Toast } from './components/Toast';
import { AppProvider } from './AppContext';
import { LoadingOverlay } from './components/LoadingScreen';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import EventPage from './pages/Event';
import VerifyRegistration from './pages/Verify';
import MiniEventPage from './pages/Event/minified';

function App() {
  return (
    <>
      <AppProvider>
        <LoadingOverlay />
        <Toast />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events/:slug" element={<EventPage />} />
            <Route
              path="/events/registrations/:slug"
              element={<MiniEventPage />}
            />
            <Route path="/verify" element={<VerifyRegistration />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </AppProvider>
    </>
  );
}

export default App;
