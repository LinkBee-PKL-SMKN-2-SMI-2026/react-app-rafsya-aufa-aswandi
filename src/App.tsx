import { useState, useEffect } from 'react';
import axios from 'axios';
import { type Vehicle } from './types/vehicle';
import { VehicleForm } from './components/VehicleForm';
import { VehicleCard } from './components/VehicleCard';

export function App() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const fetchVehicles = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.get('https://rent-car-pkl.linkbee.id/api/vehicles');
      
      // Ambil array dari response.data atau response.data.data
      const resultData = Array.isArray(response.data) 
        ? response.data 
        : (response.data?.data || []);

      setVehicles(resultData);
    } catch (err) {
      setError('Gagal mengambil data kendaraan dari server. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  fetchVehicles();
}, []);

  const handleAddVehicle = (newVehicle: Vehicle) => {
    setVehicles((prev) => [newVehicle, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Sistem Manajemen Rent Car</h1>
          <p className="text-gray-600 mt-1">Kelola dan pantau seluruh armada kendaraan secara terpusat.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Kolom Kiri: Form */}
          <div className="lg:col-span-1">
            <VehicleForm onAddVehicle={handleAddVehicle} />
          </div>

          {/* Kolom Kanan: Daftar Katalog Kendaraan */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Katalog Kendaraan</h2>

            {isLoading && (
              <div className="flex items-center justify-center p-12 bg-white rounded-xl border border-gray-100">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                <span className="ml-3 text-gray-600 font-medium">Memuat data kendaraan...</span>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                <p className="font-semibold">Terjadi Kesalahan!</p>
                <p className="text-sm">{error}</p>
              </div>
            )}

            {!isLoading && !error && vehicles.length === 0 && (
              <div className="text-center p-8 bg-white rounded-xl border border-gray-100 text-gray-500">
                Belum ada data kendaraan yang tersedia.
              </div>
            )}

            {!isLoading && !error && vehicles.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vehicles.map((item) => (
                  <VehicleCard key={item.id} vehicle={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;