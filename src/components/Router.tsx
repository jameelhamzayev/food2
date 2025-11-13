import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import { Navbar } from '@/components/ui/navbar';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';

// Pages
import HomePage from '@/components/pages/HomePage';
import MarketplacePage from '@/components/pages/MarketplacePage';
import ServicesPage from '@/components/pages/ServicesPage';
import ImpactPage from '@/components/pages/ImpactPage';
import ListWastePage from '@/components/pages/ListWastePage';
import ProfilePage from '@/components/pages/ProfilePage';

// Layout component that includes ScrollToTop and Navbar
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "marketplace",
        element: <MarketplacePage />,
      },
      {
        path: "services",
        element: <ServicesPage />,
      },
      {
        path: "impact",
        element: <ImpactPage />,
      },
      {
        path: "list-waste",
        element: <ListWastePage />,
      },
      {
        path: "profile",
        element: (
          <MemberProtectedRoute>
            <ProfilePage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
