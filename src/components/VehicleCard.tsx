import React from 'react';
import { type Vehicle } from '../types/vehicle';

interface VehicleCardProps {
  vehicle: Vehicle;
  onDelete: (id: string) => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onDelete }) => {
  const isAutomatic = vehicle.transmission === 'AUTOMATIC';

  const handleDeleteClick = () => {
    const isConfirmed = window.confirm(`Apakah Anda yakin ingin menghapus kendaraan "${vehicle.name}"?`);
    if (isConfirmed) {
      onDelete(vehicle.id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition duration-200 p-5 relative flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-3">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
              {vehicle.brand}
            </span>
            <h3 className="text-lg font-bold text-gray-800 mt-1">{vehicle.name}</h3>
          </div>
          <span className="text-xs font-mono font-medium bg-gray-100 text-gray-700 px-2 py-1 rounded border border-gray-200">
            {vehicle.plateNumber}
          </span>
        </div>

        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-100 text-xs text-gray-600">
          <span
            className={`px-2 py-0.5 rounded font-medium ${
              isAutomatic ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-700'
            }`}
          >
            {vehicle.transmission}
          </span>
          <span className="text-gray-400">•</span>
          <span className="font-medium text-gray-700">
            Kategori: {vehicle.category?.name || 'Umum'}
          </span>
        </div>
      </div>

      {/* Tombol Hapus di bagian bawah/sudut */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
        <button
          onClick={handleDeleteClick}
          className="text-xs bg-red-50 hover:bg-red-100 text-red-600 font-medium px-3 py-1.5 rounded-lg transition duration-200"
        >
          Hapus
        </button>
      </div>
    </div>
  );
};