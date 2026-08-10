// src/components/EmployeeCard.tsx

// 1. Mendefinisikan Tipe Data dengan TypeScript (Interface)
interface EmployeeProps {
  name: string;
  role: string;
  department: string; // <-- Tambahan untuk tugas mandiri
  isActive: boolean;
}

// Map warna border berdasarkan nama departemen
const departmentStyles: Record<string, string> = {
  IT: 'border-green-500 shadow-blue-100',
  Creative: 'border-green-500 shadow-red-100',
  HR: 'border-pink-500 shadow-pink-100',
  warga: 'border-red-500 shadow-red-100',
  pejabat: 'border-red-500 shadow-red-100',
};

// 2. Membuat Komponen yang menerima Props
export default function EmployeeCard({ name, role, department, isActive }: EmployeeProps) {
  // Ambil style warna sesuai departemen, jika nama departemen tidak terdaftar gunakan default (gray)
  const currentDeptStyle = departmentStyles[department] || 'border-gray-300 shadow-gray-100';

  return (
    <div className={`border-2 p-4 rounded-lg shadow-md bg-white ${currentDeptStyle}`}>
      <h2 className="text-xl font-bold text-gray-800">{name}</h2>
      <p className="text-gray-600">{role}</p>

      {/* Menampilkan Departemen */}
      <p className="text-sm font-medium text-blue-600 mt-1">
        Departemen: {department}
      </p>

      {/* Rendering kondisional (If-Else ala React) */}
      <span className={`inline-block mt-2 px-3 py-1 text-sm font-semibold rounded-full ${
        isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
      }`}>
        {isActive ? 'Aktif' : 'Non-Aktif'}
      </span>
    </div>
  );
}