import { useForm, type SubmitHandler } from "react-hook-form";


interface EmployeeFormInputs {
  name: string;
  role: string;
  department: string;
}

export default function EmployeeForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeFormInputs>();

  const onSubmit: SubmitHandler<EmployeeFormInputs> = (data) => {
    console.log("Data Pegawai Baru:", data);
    alert(`Pegawai ${data.name} berhasil ditambahkan! Cek Console.`);
    reset(); 
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 border rounded-xl shadow-md bg-white max-w-md mt-6">
      <h2 className="text-xl font-bold mb-4">Tambah Pegawai Baru</h2>

      {/* Input Nama */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
        <input
          {...register("name", { required: "Nama tidak boleh kosong!" })}
          placeholder="Misal: Budi Santoso"
          className={`w-full border p-2 rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
      </div>

      {/* Input Role */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Role (Jabatan)</label>
        <input
          {...register("role", { required: "Role wajib diisi!" })}
          placeholder="Misal: Frontend Developer"
          className={`w-full border p-2 rounded ${errors.role ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
      </div>

      {/* Input Department */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Departemen</label>
        <select
          {...register("department")}
          className="w-full border border-gray-300 p-2 rounded bg-white"
        >
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
          <option value="Operations">Operations</option>
        </select>
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition">
        Simpan Data
      </button>
    </form>
  );
}