import { Link, Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <nav style={{ 
        width: '250px', 
        backgroundColor: '#1f2937', 
        color: 'white', 
        padding: '20px',
        position: 'fixed', /* Menetap di kiri */
        height: '100vh'
      }}>
        <h2>Menu Kendaraan</h2>
        <ul style={{ listStyleType: 'none', padding: 0, marginTop: '20px' }}>
          <li style={{ marginBottom: '10px' }}>
            <Link to="/vehicles" style={{ color: 'white', textDecoration: 'none' }}>
              Katalog Kendaraan
            </Link>
          </li>
          <li>
            <Link to="/vehicles/new" style={{ color: 'white', textDecoration: 'none' }}>
              Tambah Kendaraan
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content Area */}
      <main style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
        {/* Outlet adalah tempat komponen halaman (pages) akan di-render */}
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;