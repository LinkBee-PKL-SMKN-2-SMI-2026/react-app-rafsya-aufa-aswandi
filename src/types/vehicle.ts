export interface Category {
  id: string;
  name: string;
}

export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  plateNumber: string;
  transmission: 'MANUAL' | 'AUTOMATIC';
  category: Category;
  pricePerDay?: number;
  isAvailable?: boolean;
}

// Digunakan khusus untuk payload Form Tambah Kendaraan (POST)
export interface VehicleFormData {
  name: string;
  brand: string;
  plateNumber: string;
  transmission: 'MANUAL' | 'AUTOMATIC';
  categoryId: string;
}