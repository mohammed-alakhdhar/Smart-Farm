import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import { AppProvider } from '@/lib/AppContext';
// Add page imports here
import VisitorLayout from '@/components/VisitorLayout';
import OwnerLayout from '@/components/OwnerLayout';
import Home from '@/pages/Home';
import ExploreFarms from '@/pages/ExploreFarms';
import Experiences from '@/pages/Experiences';
import AIFinder from '@/pages/AIFinder';
import FarmDetails from '@/pages/FarmDetails';
import Booking from '@/pages/Booking';
import MyJourney from '@/pages/MyJourney';
import Rewards from '@/pages/Rewards';
import OwnerDashboard from '@/pages/owner/OwnerDashboard';
import OwnerServices from '@/pages/owner/OwnerServices';
import OwnerOrders from '@/pages/owner/OwnerOrders';
import OwnerAnalytics from '@/pages/owner/OwnerAnalytics';
import OwnerInsights from '@/pages/owner/OwnerInsights';
import AdminDashboard from '@/pages/AdminDashboard';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <AppProvider>
      <Routes>
        {/* Visitor */}
        <Route element={<VisitorLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<ExploreFarms />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/ai-finder" element={<AIFinder />} />
          <Route path="/farms/:id" element={<FarmDetails />} />
          <Route path="/book/:id" element={<Booking />} />
          <Route path="/journey" element={<MyJourney />} />
          <Route path="/rewards" element={<Rewards />} />
        </Route>

        {/* Farm owner */}
        <Route element={<OwnerLayout />}>
          <Route path="/owner" element={<OwnerDashboard />} />
          <Route path="/owner/services" element={<OwnerServices />} />
          <Route path="/owner/orders" element={<OwnerOrders />} />
          <Route path="/owner/analytics" element={<OwnerAnalytics />} />
          <Route path="/owner/insights" element={<OwnerInsights />} />
        </Route>

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </AppProvider>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App