import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
 
import MainLayout from './components/MainLayout';
import VehicleList from './pages/VehicleList';
import VehicleAdd from './pages/VehicleAdd';

// 1. Tambahkan import untuk komponen Login dan ProtectedRoute
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

export function App() {

  return (

    <BrowserRouter>
      <Routes>
        {/* Route Publik: Halaman Login */}
        <Route path="/login" element={<Login />} />

        {/* Route utama / otomatis di-redirect ke /vehicles */}
        <Route path="/" element={<Navigate to="/vehicles" replace />} />

        {/* 2. Bungkus MainLayout dengan ProtectedRoute */}
        <Route element={<ProtectedRoute />}>
          {/* Nested Routes menggunakan MainLayout */}
          <Route element={<MainLayout />}>
            <Route path="/vehicles" element={<VehicleList />} />
            <Route path="/vehicles/new" element={<VehicleAdd />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}