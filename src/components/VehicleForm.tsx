import React from 'react';
import { useForm } from 'react-hook-form';
import { type Vehicle,type VehicleFormData } from '../types/vehicle';

interface VehicleFormProps {
  onAddVehicle: (newVehicle: Vehicle) => void;
}

export const VehicleForm: React.FC<VehicleFormProps> = ({ onAddVehicle }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VehicleFormData>({
    defaultValues: {
      transmission: 'AUTOMATIC',
    },
  });

  const onSubmit = (data: VehicleFormData) => {
    // Transformasi data form agar sesuai dengan interface Vehicle (mengubah categoryName jadi object category)
    const newVehicle: Vehicle = {
      id: crypto.randomUUID(),
      name: data.name,
      brand: data.brand,
      plateNumber: data.plateNumber,
      transmission: data.transmission,
      category: {
        id: crypto.randomUUID(),
        name: data.categoryName,
      },
    };

    onAddVehicle(newVehicle);
    reset();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Tambah Kendaraan</h2>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
          <input
            type="text"
            {...register('categoryName', { required: 'Kategori wajib diisi' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Contoh: MPV / SUV / Sedan"
          />
          {errors.categoryName && <p className="text-red-500 text-xs mt-1">{errors.categoryName.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-200 mt-2"
        >
          Simpan Kendaraan
        </button>
      </form>
    </div>
  );
};