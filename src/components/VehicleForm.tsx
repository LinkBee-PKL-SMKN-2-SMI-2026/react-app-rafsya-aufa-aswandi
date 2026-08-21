import React from 'react';
import { useForm } from 'react-hook-form';
import {type VehicleFormData } from '../types/vehicle';

interface VehicleFormProps {
  onSubmitForm: (data: VehicleFormData) => Promise<void>;
}

export const VehicleForm: React.FC<VehicleFormProps> = ({ onSubmitForm }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<VehicleFormData>({
    defaultValues: {
      transmission: 'AUTOMATIC',
      // Gunakan ID kategori default/hardcoded yang valid dari database API
      categoryId: '39a7b75a-e7c6-4d2a-89a3-d1f56b9c9f01',
    },
  });

  const onSubmit = async (data: VehicleFormData) => {
    try {
      await onSubmitForm(data);
      reset(); // Reset form jika sukses
    } catch {
      // Error penanganan ditangani oleh fungsi induk di App.tsx
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Tambah Kendaraan Baru</h2>
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
            {/* Opsi statis kategori UUID dari server */}
            <option value="39a7b75a-e7c6-4d2a-89a3-d1f56b9c9f01">SUV / MPV</option>
            <option value="f8c1a123-4567-89ab-cdef-0123456789ab">Sedan</option>
          </select>
          {errors.categoryId && <p className="text-red-500 text-xs mt-1">{errors.categoryId.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full text-white font-medium py-2.5 px-4 rounded-lg transition duration-200 mt-2 ${
            isSubmitting
              ? 'bg-indigo-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {isSubmitting ? 'Menyimpan...' : 'Simpan Kendaraan'}
        </button>
      </form>
    </div>
  );
};