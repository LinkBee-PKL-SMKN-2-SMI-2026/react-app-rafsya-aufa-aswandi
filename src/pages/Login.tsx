import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/api';
import { useAuthStore } from '../store/useAuthStore';

export default function Login() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      const response = await api.post('/auth/login', data);
      
      // Ambil accessToken langsung dari response.data (atau fallback ke data.data)
      const token = response.data.accessToken || response.data?.data?.accessToken; 

      if (token) {
        login(token);
        navigate('/vehicles');
      } else {
        alert('Token tidak ditemukan dari response server.');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      const message = error.response?.data?.message || 'Login gagal, periksa email & password!';
      alert(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              {...register('email', { required: true })} 
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              {...register('password', { required: true })} 
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:bg-indigo-400"
          >
            {isSubmitting ? 'Loading...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}