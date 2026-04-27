import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminCars from './pages/AdminCars';
import AddCar from './pages/AddCar';
import EditCar from './pages/EditCar';
import CarDetails from './pages/CarDetails';
import ImagesPage from './pages/ImagesPage';
import { getCars, createCar, deleteCar, logout, getMe } from './api';
import useWindowSize from './hooks/useWindowSize';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const width = useWindowSize();
  const isMobile = width < 768;

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);  // komponens indulásakor loading
  const [cars, setCars] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('Összes autó');
  const [filterOpen, setFilterOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Betöltéskor ellenőrzi, hogy admin-e a user
  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('Checking auth...');
        const res = await getMe();
        console.log('Auth válasz:', res);
        if (res.success && res.user.admin === 1) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (err) {
        console.log('Nincs bejelentkezés / Auth hiba:', err);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const fetchCars = async () => {
    try {
      console.log('Autók letöltése...');
      const data = await getCars();
      console.log('Autók válasz:', data);
      setCars(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Autók letöltési hiba:', err);
      setCars([]);
    }
  };

  useEffect(() => { fetchCars(); }, []);
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const filteredCars = Array.isArray(cars)
    ? cars.filter(car => selectedFilter === 'Összes autó' ? true : car.status === selectedFilter)
    : [];

  const handleDeleteCar = async (id) => {
    if (window.confirm('Biztosan törölni szeretnéd ezt az autót?')) {
      try {
        await deleteCar(id);
        fetchCars();
      } catch (err) {
        console.error('Törlési hiba:', err);
      }
    }
  };

  const handleAddCar = async (newCar) => {
    try {
      await createCar(newCar);
      await fetchCars();
      navigate('/admin');
    } catch (err) {
      console.error('Mentési hiba:', err);
    }
  };

  // Logout - backend API hívás
  const handleLogout = async () => {
    try {
      await logout();  // Backend logout
      setIsAdmin(false);
      navigate('/home');
    } catch (err) {
      console.error('Logout hiba:', err);
    }
  };

  const currentPage = location.pathname.split('/')[1] || 'home';

  const getNavStyle = (page) => ({
    border: 'none',
    backgroundColor: currentPage === page ? '#1f2937' : 'transparent',
    color: currentPage === page ? 'white' : '#6b7280',
    padding: isMobile ? '12px 16px' : '10px 20px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: 'bold',
    width: isMobile ? '100%' : 'auto',
    textAlign: 'left',
    fontSize: '15px',
  });

  const homeProps = {
    filteredCars, selectedFilter, setSelectedFilter,
    filterOpen, setFilterOpen,
    onDetailsClick: (car) => navigate(`/details/${car.id}`)
  };

  const footerLinkStyle = { color: '#6c757d', textDecoration: 'none', padding: '0 15px', cursor: 'pointer', background: 'none', border: 'none', fontSize: '15px' };

  // Loading közben semmi ne jelenjen meg
  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>Betöltés...</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#F3F4F6', fontFamily: 'sans-serif' }}>

      {/* NAVBAR */}
      <nav style={{ backgroundColor: 'white', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 1000, flexWrap: 'wrap', gap: '10px' }}>
        
        <div onClick={() => navigate('/home')} style={{ backgroundColor: 'black', color: 'white', padding: '10px 20px', borderRadius: '12px', fontWeight: '900', cursor: 'pointer' }}>
          AUTOBOLT
        </div>

        {/* Desktop menü */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button onClick={() => navigate('/home')} style={getNavStyle('home')}>Főoldal</button>
            {isAdmin && <button onClick={() => navigate('/admin')} style={{ ...getNavStyle('admin'), color: currentPage === 'admin' ? 'white' : '#E31E24' }}>Autók kezelése</button>}
            <button onClick={() => navigate('/contact')} style={getNavStyle('contact')}>Kapcsolat</button>
            <button onClick={() => navigate('/about')} style={getNavStyle('about')}>Rólunk</button>
            {!isAdmin
              ? <button onClick={() => setIsLoginOpen(true)} style={{ backgroundColor: '#E31E24', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>Bejelentkezés</button>
              : <button onClick={handleLogout} style={{ backgroundColor: '#111', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>Kijelentkezés</button>
            }
          </div>
        )}

        {/* Hamburger gomb */}
        {isMobile && (
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '8px 14px', cursor: 'pointer', fontSize: '20px' }}>
            {menuOpen ? '✕' : '☰'}
          </button>
        )}

        {/* Mobil lenyíló menü */}
        {isMobile && menuOpen && (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '5px', paddingTop: '10px', borderTop: '1px solid #f0f0f0' }}>
            <button onClick={() => navigate('/home')} style={getNavStyle('home')}>Főoldal</button>
            {isAdmin && <button onClick={() => navigate('/admin')} style={{ ...getNavStyle('admin'), color: currentPage === 'admin' ? 'white' : '#E31E24' }}>Autók kezelése</button>}
            <button onClick={() => navigate('/contact')} style={getNavStyle('contact')}>Kapcsolat</button>
            <button onClick={() => navigate('/about')} style={getNavStyle('about')}>Rólunk</button>
            {!isAdmin
              ? <button onClick={() => { setIsLoginOpen(true); setMenuOpen(false); }} style={{ backgroundColor: '#E31E24', color: 'white', border: 'none', padding: '12px 16px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', marginTop: '5px' }}>Bejelentkezés</button>
              : <button onClick={handleLogout} style={{ backgroundColor: '#111', color: 'white', border: 'none', padding: '12px 16px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', marginTop: '5px' }}>Kijelentkezés</button>
            }
          </div>
        )}
      </nav>

      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/"            element={<Home {...homeProps} />} />
          <Route path="/home"        element={<Home {...homeProps} />} />
          <Route path="/details/:id" element={<CarDetails onBack={() => navigate('/home')} onContact={() => navigate('/contact')} />} />
          <Route path="/admin"       element={isAdmin ? <AdminCars cars={cars} deleteCar={handleDeleteCar} onAddClick={() => navigate('/add-car')} onEditClick={(car) => navigate(`/edit-car/${car.id}`)} /> : <Home {...homeProps} />} />
          <Route path="/add-car"     element={isAdmin ? <AddCar onSave={handleAddCar} onCancel={() => navigate('/admin')} /> : null} />
          <Route path="/edit-car/:id" element={isAdmin ? <EditCar onSave={() => { fetchCars(); navigate('/admin'); }} onCancel={() => navigate('/admin')} /> : null} />
          <Route path="/imagespage"  element={isAdmin ? <ImagesPage /> : <Home {...homeProps} />} />
          <Route path="/contact"     element={<Contact />} />
          <Route path="/about"       element={<About />} />
        </Routes>
      </main>

      <footer style={{ backgroundColor: '#fff', borderTop: '1px solid #dee2e6', padding: '30px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px', padding: 0, marginBottom: '15px' }}>
            <li><button onClick={() => navigate('/home')} style={footerLinkStyle}>Főoldal</button></li>
            <li><button onClick={() => navigate('/contact')} style={footerLinkStyle}>Kapcsolatfelvétel</button></li>
            <li><button onClick={() => navigate('/about')} style={footerLinkStyle}>Rólunk</button></li>
          </ul>
          <div style={{ borderBottom: '1px solid #eee', width: '60%', margin: '0 auto 15px auto' }}></div>
          <p style={{ color: '#6c757d', fontSize: '14px', margin: 0 }}>© 2025 Company, Inc</p>
        </div>
      </footer>

      {isLoginOpen && <Login setIsLoginOpen={setIsLoginOpen} setIsAdmin={setIsAdmin} />}
    </div>
  );
}

export default App;
