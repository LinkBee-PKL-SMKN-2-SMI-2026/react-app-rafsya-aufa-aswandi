export interface Category {
  id?: string | number;
  name: string;
}

export interface Vehicle {
  id: string | number;
  name: string;
  brand: string;
  plateNumber: string;
  transmission: 'MANUAL' | 'AUTOMATIC';
  category: Category;
  pricePerDay?: number;
  isAvailable?: boolean;
}

export interface VehicleFormData {
  name: string;
  brand: string;
  plateNumber: string;
  transmission: 'MANUAL' | 'AUTOMATIC';
  categoryName: string;
}