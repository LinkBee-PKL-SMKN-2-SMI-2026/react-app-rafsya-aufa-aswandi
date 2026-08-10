// src/components/EmployeeCard.tsx

// 1. Mendefinisikan Tipe Data dengan TypeScript (Interface)
interface EmployeeProps {
  name: string;
  role: string;
  department: string; // <-- Tambahan untuk tugas mandiri
  isActive: boolean;
}

// 2. Membuat Komponen yang menerima Props
export default function EmployeeCard({ name, role, department, isActive }: EmployeeProps) {
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
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