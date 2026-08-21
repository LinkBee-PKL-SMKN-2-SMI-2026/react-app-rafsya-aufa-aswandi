import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { type VehicleFormData } from '../types/vehicle'; // Sesuaikan path
import { VehicleForm } from '../components/VehicleForm'; // Sesuaikan path

const ADMIN_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5ODc0NmQyMC1lZTZjLTQzMjUtYWEwOC1lYzg2N2IxODM0ZmUiLCJlbWFpbCI6ImFkbWluQHJlbnRjYXIuY29tIiwiaWF0IjoxNzg2Njg5NDA3LCJleHAiOjE3ODY2OTAzMDd9.kG9ERfjO8TGlgROOdHIh_RdcOlN-IxFoaZXzo4zf_QE";

const VehicleAdd = () => {
  const navigate = useNavigate();

  const handleAddVehicle = async (formData: VehicleFormData) => {
    try {
      await axios.post(
        'https://rent-car-pkl.linkbee.id/api/vehicles',
        formData,
        {
          headers: {
            Authorization: `Bearer ${ADMIN_TOKEN}`,
          },
        }
      );
      
      // Jika sukses, muncul alert dan otomatis tendang/redirect user ke halaman daftar
      alert('Kendaraan berhasil ditambahkan!');
      navigate('/vehicles');
      
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        const message = err.response.data?.message || 'Gagal menambahkan kendaraan baru.';
        alert(`Gagal: ${message}`);
      } else {
        alert('Terjadi kesalahan koneksi saat menambah data.');
      }
      throw err; 
    }
  };

  return (
    <div className="max-w-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Tambah Kendaraan Baru</h2>
      <VehicleForm onSubmitForm={handleAddVehicle} />
    </div>
  );
};

export default VehicleAdd;