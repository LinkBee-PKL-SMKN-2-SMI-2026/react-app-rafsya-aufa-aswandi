// 1. Tambahkan BrowserRouter di dalam kurung kurawal ini
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 
import MainLayout from './components/MainLayout';
import VehicleList from './pages/VehicleList';
import VehicleAdd from './pages/VehicleAdd';

export function App() {
  
  return (
    // 2. Bungkus <Routes> dengan <BrowserRouter>
    <BrowserRouter>
      <Routes>
        {/* Route utama / otomatis di-redirect ke /vehicles */}
        <Route path="/" element={<Navigate to="/vehicles" replace />} />

        {/* Nested Routes menggunakan MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/vehicles" element={<VehicleList />} />
          <Route path="/vehicles/new" element={<VehicleAdd />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}