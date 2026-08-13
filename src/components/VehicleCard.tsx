import React from 'react';
import {type Vehicle } from '../types/vehicle';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  const isAutomatic = vehicle.transmission === 'AUTOMATIC';

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition duration-200 p-5">
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
  );
};