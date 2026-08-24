import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { type Vehicle, type VehicleFormData } from './types/vehicle';
import { VehicleForm } from './components/VehicleForm';
import { VehicleCard } from './components/VehicleCard';

// ⚠️ PASTE TOKEN DARI https://rent-car-pkl.linkbee.id/token.html DI SINI
const ADMIN_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5ODc0NmQyMC1lZTZjLTQzMjUtYWEwOC1lYzg2N2IxODM0ZmUiLCJlbWFpbCI6ImFkbWluQHJlbnRjYXIuY29tIiwiaWF0IjoxNzg2Njg5NDA3LCJleHAiOjE3ODY2OTAzMDd9.kG9ERfjO8TGlgROOdHIh_RdcOlN-IxFoaZXzo4zf_QE";

export function App() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 1. Fungsi Fetching Data di luar useEffect agar dapat dipanggil ulang (re-fetch)
  const fetchVehicles = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.get('https://rent-car-pkl.linkbee.id/api/vehicles');
      const resultData = Array.isArray(response.data) ? response.data : (response.data?.data || []);
      setVehicles(resultData);
    } catch {
      setError('Gagal mengambil data kendaraan dari server. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Memanggil fetchVehicles saat awal komponen di-mount
  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  // 2. Handler untuk POST data baru ke API
  const handleAddVehicle = async (formData: VehicleFormData) => {
    try {
      await axios.post(
        'https://rent-car-pkl.linkbee.id/api/vehicles',
        formData,
        {
          headers: {
            Authorization: `Bearer ${ADMIN_TOKEN}`,
          },
        }
      );

      // Re-fetch otomatis setelah berhasil POST
      await fetchVehicles();
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        const message = err.response.data?.message || 'Gagal menambahkan kendaraan baru.';
        alert(`Gagal: ${message}`);
      } else {
        alert('Terjadi kesalahan koneksi saat menambah data.');
      }
      throw err; // Lempar balik agar form mengetahui request gagal
    }
  };

  // 3. Handler untuk DELETE data kendaraan
  const handleDeleteVehicle = async (id: string) => {
    try {
      await axios.delete(`https://rent-car-pkl.linkbee.id/api/vehicles/${id}`, {
        headers: {
          Authorization: `Bearer ${ADMIN_TOKEN}`,
        },
      });

      // Re-fetch otomatis setelah berhasil DELETE
      await fetchVehicles();
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        const message = err.response.data?.message || 'Gagal menghapus kendaraan.';
        alert(`Gagal: ${message}`);
      } else {
        alert('Terjadi kesalahan koneksi saat menghapus data.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Sistem Manajemen Rent Car</h1>
          <p className="text-gray-600 mt-1">Kelola dan pantau seluruh armada kendaraan secara real-time.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Tambah */}
          <div className="lg:col-span-1">
            <VehicleForm onSubmitForm={handleAddVehicle} />
          </div>

          {/* Catalog / Grid */}
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
                  <VehicleCard
                    key={item.id}
                    vehicle={item}
                    onDelete={handleDeleteVehicle}
                  />
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