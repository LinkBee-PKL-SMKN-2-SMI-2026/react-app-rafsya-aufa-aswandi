import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/api';
import { type Vehicle } from '../types/vehicle';
import { VehicleCard } from '../components/VehicleCard';
import axios from 'axios';
const VehicleList = () => {
  const queryClient = useQueryClient();

  // 1. Refactor GET menggunakan useQuery (menggantikan useState, useEffect, dan useCallback)
  const { data: vehicles = [], isLoading, isError, error: queryError } = useQuery<Vehicle[]>({
    queryKey: ['vehicles'],
    queryFn: async () => {
      const response = await api.get('/vehicles');
      // Menyesuaikan dengan struktur data API Anda
      return Array.isArray(response.data) ? response.data : (response.data?.data || []);
    },
  });

  // 2. Refactor DELETE menggunakan useMutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await api.delete(`/vehicles/${id}`);
    },
    onSuccess: () => {
      // Wajib panggil invalidateQueries agar list kendaraan otomatis diperbarui di background
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
    },
    onError: (err: unknown) => {
      if (axios.isAxiosError(err) && err.response) {
        const message = err.response.data?.message || 'Gagal menghapus kendaraan.';
        alert(`Gagal: ${message}`);
      } else {
        alert('Terjadi kesalahan koneksi saat menghapus data.');
      }
    },
  });

  const handleDeleteVehicle = (id: string) => {
    deleteMutation.mutate(id);
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

      {isError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
          <p className="font-semibold">Terjadi Kesalahan!</p>
          <p className="text-sm">
            {queryError instanceof Error ? queryError.message : 'Gagal mengambil data kendaraan dari server. Silakan coba lagi.'}
          </p>
        </div>
      )}

      {!isLoading && !isError && vehicles.length === 0 && (
        <div className="text-center p-8 bg-white rounded-xl border border-gray-100 text-gray-500">
          Belum ada data kendaraan yang tersedia.
        </div>
      )}

      {!isLoading && !isError && vehicles.length > 0 && (
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