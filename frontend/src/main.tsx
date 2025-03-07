import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import Login from './pages/Login.tsx';
import Signup from './pages/Signup.tsx';
import Appointment from './pages/Appointment.tsx';
import Telemedicine from './pages/Telemedicine.tsx';
import ProfileEdit from './pages/ProfileEdit.tsx';
import BedAvailability from './pages/BedAvailability.tsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/dashboard',
    element: <App />,
  },
  {
    path: '/appointment',
    element: <Appointment />,
  },
  {
    path: '/telemedicine',
    element: <Telemedicine />,
  },
  {
    path: '/profile/edit',
    element: <ProfileEdit />,
  },
  {
    path: '/bed-availability',
    element: <BedAvailability />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);