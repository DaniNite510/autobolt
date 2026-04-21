import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getImages, deleteImage, BASE } from '../api.js';

const ImagesPage = () => {
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Törlés modal
  const [torlesOpen, setTorlesOpen] = useState(false);
  const [torlesFilename, setTorlesFilename] = useState('');
  const [torlesHiba, setTorlesHiba] = useState('');
  const [torlesLoading, setTorlesLoading] = useState(false);

  const kepekLekerese = async () => {
    try {
      const result = await getImages();
      if (result.success) {
        const imagesWithUrl = result.images.map(img => ({
          filename: img.filename,
          url: `${BASE}/uploads/${img.filename}`
        }));
        setImages(imagesWithUrl);
      }
    } catch (err) {
      console.error('Képek lekérési hiba:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    kepekLekerese();
  }, []);

  const handleDelete = async () => {
    setTorlesLoading(true);
    try {
      const result = await deleteImage(torlesFilename);
      if (result.success) {
        setTorlesHiba('');
        setTorlesOpen(false);
        setTorlesFilename('');
        kepekLekerese();
      } else {
        setTorlesHiba(result.message || 'Hiba a törlés során!');
      }
    } catch (err) {
      setTorlesHiba('Szerver hiba!');
    } finally {
      setTorlesLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '30px auto', padding: '0 20px' }}>

      {/* FEJLÉC */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '900', margin: 0 }}>Képek kezelése</h1>
          <p style={{ color: '#9ca3af', fontSize: '14px', margin: '5px 0 0 0' }}>{images.length} kép a szerveren</p>
        </div>
        <button
          onClick={() => navigate('/admin')}
          style={{ backgroundColor: '#f3f4f6', border: 'none', padding: '10px 20px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', color: '#4b5563' }}
        >
          ← Vissza
        </button>
      </div>

      {/* KÉPEK RÁCSA */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#9ca3af', fontSize: '16px' }}>Betöltés...</div>
      ) : images.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px', color: '#9ca3af' }}>
          <div style={{ fontSize: '48px', marginBottom: '15px' }}>🖼️</div>
          <div style={{ fontSize: '18px', fontWeight: 'bold' }}>Nincsenek feltöltött képek</div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '15px' }}>
          {images.map((img) => (
            <div key={img.filename} style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
              <img
                src={img.url}
                alt={img.filename}
                style={{ width: '100%', height: '140px', objectFit: 'cover' }}
              />
              <div style={{ padding: '10px' }}>
                <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {img.filename}
                </div>
                <button
                  onClick={() => {
                    setTorlesFilename(img.filename);
                    setTorlesHiba('');
                    setTorlesOpen(true);
                  }}
                  style={{ width: '100%', backgroundColor: '#fee2e2', color: '#E31E24', border: 'none', padding: '8px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}
                >
                  Törlés
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TÖRLÉS MODAL */}
      {torlesOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 999, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '30px', maxWidth: '420px', width: '100%', boxShadow: '0 20px 50px rgba(0,0,0,0.15)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '900', marginBottom: '15px' }}>Kép törlése</h3>

            {torlesHiba && (
              <div style={{ backgroundColor: '#fee2e2', color: '#E31E24', padding: '12px', borderRadius: '10px', fontSize: '14px', marginBottom: '15px', fontWeight: 'bold' }}>
                {torlesHiba}
              </div>
            )}

            <img
              src={`${BASE}/uploads/${torlesFilename}`}
              alt=""
              style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '12px', marginBottom: '15px' }}
            />

            <p style={{ color: '#4b5563', fontSize: '14px', marginBottom: '25px' }}>
              Gondold át nagyon a döntésedet! A művelet nem vonható vissza!
            </p>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => { setTorlesOpen(false); setTorlesHiba(''); }}
                style={{ flex: 1, backgroundColor: '#f3f4f6', border: 'none', padding: '12px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Mégse
              </button>
              <button
                onClick={handleDelete}
                disabled={torlesLoading}
                style={{ flex: 1, backgroundColor: '#E31E24', color: 'white', border: 'none', padding: '12px', borderRadius: '12px', fontWeight: 'bold', cursor: torlesLoading ? 'not-allowed' : 'pointer', opacity: torlesLoading ? 0.7 : 1 }}
              >
                {torlesLoading ? 'Törlés...' : 'Törlés'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagesPage;