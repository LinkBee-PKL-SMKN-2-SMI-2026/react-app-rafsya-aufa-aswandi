import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/api';
import { type VehicleFormData } from '../types/vehicle';
import axios from 'axios';

export default function VehicleAdd() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VehicleFormData>({
    defaultValues: {
      transmission: 'AUTOMATIC',
      categoryId: '39a7b75a-e7c6-4d2a-89a3-d1f56b9c9f01',
    },
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Refactor POST menggunakan useMutation
  const mutation = useMutation({
    mutationFn: async (newData: VehicleFormData) => {
      return await api.post('/vehicles', newData);
    },
    onSuccess: () => {
      // Wajib panggil invalidateQueries agar list kendaraan diperbarui
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      alert('Kendaraan berhasil ditambahkan!');
      navigate('/vehicles');
    },
    onError: (err: unknown) => {
      if (axios.isAxiosError(err) && err.response) {
        const message = err.response.data?.message || 'Gagal menyimpan kendaraan baru.';
        alert(`Gagal: ${message}`);
      } else {
        alert('Terjadi kesalahan koneksi saat menambah data.');
      }
      
    }
  });

  const onSubmit = (data: VehicleFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-xl bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Tambah Kendaraan Baru</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nama Kendaraan</label>
          <input
            type="text"
            {...register('name', { required: 'Nama kendaraan wajib diisi' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Contoh: Avanza Veloz"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Merek (Brand)</label>
          <input
            type="text"
            {...register('brand', { required: 'Merek wajib diisi' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Contoh: Toyota"
          />
          {errors.brand && <p className="text-red-500 text-xs mt-1">{errors.brand.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Plat</label>
          <input
            type="text"
            {...register('plateNumber', { required: 'Nomor plat wajib diisi' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Contoh: B 1234 CD"
          />
          {errors.plateNumber && <p className="text-red-500 text-xs mt-1">{errors.plateNumber.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Transmisi</label>
          <select
            {...register('transmission', { required: 'Pilih transmisi' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
          >
            <option value="AUTOMATIC">AUTOMATIC</option>
            <option value="MANUAL">MANUAL</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Kategori (ID)</label>
          <select
            {...register('categoryId', { required: 'Pilih kategori' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
          >
            <option value="39a7b75a-e7c6-4d2a-89a3-d1f56b9c9f01">SUV / MPV</option>
            <option value="f8c1a123-4567-89ab-cdef-0123456789ab">Sedan</option>
          </select>
          {errors.categoryId && <p className="text-red-500 text-xs mt-1">{errors.categoryId.message}</p>}
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className={`w-full text-white font-medium py-2.5 px-4 rounded-lg transition duration-200 mt-2 ${
            mutation.isPending
              ? 'bg-indigo-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {mutation.isPending ? 'Menyimpan...' : 'Simpan Kendaraan'}
        </button>
      </form>
    </div>
  );
}