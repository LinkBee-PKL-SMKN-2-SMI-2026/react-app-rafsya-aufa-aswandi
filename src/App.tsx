// src/App.tsx
import EmployeeCard from "./components/EmployeeCard";
import EmployeeForm from "./components/EmployeeForm";

// Simulasi data dari Backend (Dummy Data)
const employees = [
  { id: 1, name: "Regi PH", role: "UI/UX", department: "IT", isActive: true },
  { id: 2, name: "Fabian AR", role: "Frontend Developerr", department: "Creative", isActive: true },
  { id: 3, name: "Rafsya AU", role: "Backend Developer", department: "IT", isActive: true },
  { id: 4, name: "hahay", role: "custumor", department: "warga", isActive: false },
  { id: 5, name: "huhuy", role: "custumor", department: "pejabat", isActive: false },
];

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Daftar Pegawai PKL</h1>

      <EmployeeForm></EmployeeForm>
      
      {/* Grid Layout dengan Tailwind */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Mapping Data Array ke Komponen */}
        {employees.map((employee) => (
          <EmployeeCard
            key={employee.id} // "key" wajib ada saat melakukan map di React
            name={employee.name}
            role={employee.role}
            department={employee.department} // <-- Mengirimkan data departemen
            isActive={employee.isActive}
          />
        ))}
      </div>
    </div>
  );
}