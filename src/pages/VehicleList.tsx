import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { type Vehicle } from '../types/vehicle'; // Sesuaikan path jika perlu
import { VehicleCard } from '../components/VehicleCard'; // Sesuaikan path jika perlu

const ADMIN_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5ODc0NmQyMC1lZTZjLTQzMjUtYWEwOC1lYzg2N2IxODM0ZmUiLCJlbWFpbCI6ImFkbWluQHJlbnRjYXIuY29tIiwiaWF0IjoxNzg2Njg5NDA3LCJleHAiOjE3ODY2OTAzMDd9.kG9ERfjO8TGlgROOdHIh_RdcOlN-IxFoaZXzo4zf_QE";

const VehicleList = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const handleDeleteVehicle = async (id: string) => {
    try {
      await axios.delete(`https://rent-car-pkl.linkbee.id/api/vehicles/${id}`, {
        headers: {
          Authorization: `Bearer ${ADMIN_TOKEN}`,
        },
      });
      await fetchVehicles(); // Re-fetch otomatis setelah berhasil DELETE
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
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Katalog Kendaraan</h2>
      </div>

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
  );
};

export default VehicleList;