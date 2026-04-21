import React, { useState } from 'react';
import useResponsiveStyles from '../hooks/useResponsiveStyles';
import { uploadImage, deleteImage, BASE } from '../api';

const SEP = '|||';

const AddCar = ({ onSave, onCancel }) => {
  const { s } = useResponsiveStyles();

  const [formData, setFormData] = useState({
    make: '', subtitle: '', price: '', year: '', km: '',
    fuel: 'Benzin', gearbox: 'Manuális', csomagter: '', tomeg: '',
    hajtas: 'Elsőkerék', teljesitmeny: '', status: 'Új autók',
    img: '', description: ''
  });

  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: (name === 'price' || name === 'year') ? Number(value) : value }));
  };

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    e.target.value = '';

    const remaining = 4 - images.length;
    if (remaining <= 0) { alert('Maximum 4 kép tölthető fel!'); return; }

    const allowed = files.slice(0, remaining);
    setUploading(true);

    const newImages = [];
    for (const file of allowed) {
      const preview = URL.createObjectURL(file);
      try {
        const data = await uploadImage(file);
        if (data.success) {
          const url = `${BASE}/uploads/${data.filename}`;
          newImages.push({ preview, url, filename: data.filename });
        } else {
          alert('Hiba a kép feltöltésekor!');
          URL.revokeObjectURL(preview);
        }
      } catch (err) {
        alert('Nem sikerült feltölteni a képet!');
        URL.revokeObjectURL(preview);
      }
    }

    if (newImages.length > 0) {
      setImages(prev => [...prev, ...newImages]);
    }
    setUploading(false);
  };

  const handleDeleteImage = async (index) => {
    const img = images[index];
    try {
      await deleteImage(img.filename);
    } catch (err) {
      console.error('Kép törlési hiba:', err);
    }
    URL.revokeObjectURL(img.preview);
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (images.length === 0) { alert('Legalább egy képet tölts fel!'); return; }
    const imgString = images.map(img => img.url).join(SEP);
    onSave({ ...formData, img: imgString });
  };

  const inputStyle = { width: '100%', padding: s('12px', '14px'), borderRadius: '12px', border: '1px solid #e5e7eb', backgroundColor: '#f9fafb', marginBottom: s('12px', '15px'), boxSizing: 'border-box', fontSize: s('14px', '14px') };
  const labelStyle = { display: 'block', fontSize: s('10px', '11px'), fontWeight: '900', textTransform: 'uppercase', marginBottom: '8px', color: '#6b7280', letterSpacing: '0.5px' };
  const gridTwo = { display: 'grid', gridTemplateColumns: s('1fr', '1fr 1fr'), gap: s('0', '30px'), marginBottom: s('12px', '0') };

  return (
    <div style={{ maxWidth: '800px', margin: s('20px 0', '30px auto'), padding: s('20px 15px', '40px'), backgroundColor: 'white', borderRadius: s('20px', '30px'), boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
      <h2 style={{ fontSize: s('22px', '28px'), fontWeight: '900', marginBottom: s('20px', '25px') }}>Új autó hozzáadása</h2>

      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>Autó megnevezése</label>
        <input name="make" value={formData.make} onChange={handleChange} style={inputStyle} placeholder="Pl: Opel Corsa C" required />

        <label style={labelStyle}>Alcím</label>
        <input name="subtitle" value={formData.subtitle} onChange={handleChange} style={inputStyle} placeholder="Pl: Exclusive belső, újszerű állapot..." />

        <div style={gridTwo}>
          <div><label style={labelStyle}>Ár (Ft)</label><input name="price" type="number" value={formData.price} onChange={handleChange} style={inputStyle} required /></div>
          <div><label style={labelStyle}>Évjárat</label><input name="year" type="number" value={formData.year} onChange={handleChange} style={inputStyle} required /></div>
        </div>

        <div style={gridTwo}>
          <div><label style={labelStyle}>Kilométer</label><input name="km" type='number' value={formData.km} onChange={handleChange} style={inputStyle} placeholder="Pl: 120000" required /></div>
          <div><label style={labelStyle}>Üzemanyag</label>
            <select name="fuel" value={formData.fuel} onChange={handleChange} style={inputStyle}>
              <option>Benzin</option><option>Dízel</option><option>Hibrid</option><option>Elektromos</option>
            </select>
          </div>
        </div>

        <div style={gridTwo}>
          <div><label style={labelStyle}>Váltó</label>
            <select name="gearbox" value={formData.gearbox} onChange={handleChange} style={inputStyle}>
              <option>Manuális</option><option>Automata</option>
            </select>
          </div>
          <div><label style={labelStyle}>Státusz</label>
            <select name="status" value={formData.status} onChange={handleChange} style={inputStyle}>
              <option>Új autók</option><option>Használt autók</option>
            </select>
          </div>
        </div>

        <div style={gridTwo}>
          <div><label style={labelStyle}>Csomagtér (L)</label><input type="number" name="csomagter" value={formData.csomagter} onChange={handleChange} style={inputStyle} required /></div>
          <div><label style={labelStyle}>Tömeg (kg)</label><input type="number" name="tomeg" value={formData.tomeg} onChange={handleChange} style={inputStyle} required /></div>
        </div>

        <div style={gridTwo}>
          <div><label style={labelStyle}>Hajtás</label>
            <select name="hajtas" value={formData.hajtas} onChange={handleChange} style={inputStyle}>
              <option>Elsőkerék</option><option>Hátsókerék</option><option>Összkerék</option>
            </select>
          </div>
          <div><label style={labelStyle}>Teljesítmény (LE)</label><input type="number" name="teljesitmeny" value={formData.teljesitmeny} onChange={handleChange} style={inputStyle} required /></div>
        </div>

        {/* KÉPEK */}
        <label style={labelStyle}>Képek</label>
        <div style={{ marginBottom: s('20px', '20px') }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: s('8px', '10px'), marginBottom: s('10px', '10px') }}>
            {images.map((img, i) => (
              <div key={i} style={{ position: 'relative' }}>
                <img src={img.preview} alt="" style={{ width: s('80px', '90px'), height: s('60px', '65px'), objectFit: 'cover', borderRadius: '10px', border: i === 0 ? '3px solid #E31E24' : '2px solid #eee' }} />
                {i === 0 && <div style={{ position: 'absolute', top: '4px', left: '4px', backgroundColor: '#E31E24', color: 'white', fontSize: s('8px', '9px'), fontWeight: 'bold', padding: s('2px 4px', '2px 6px'), borderRadius: '4px' }}>FŐ</div>}
                <button type="button" onClick={() => handleDeleteImage(i)} style={{ position: 'absolute', top: '4px', right: '4px', backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', borderRadius: '50%', width: s('22px', '20px'), height: s('22px', '20px'), cursor: 'pointer', fontSize: s('12px', '11px'), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
              </div>
            ))}

            {images.length < 4 && !uploading && (
              <label style={{ width: s('80px', '90px'), height: s('60px', '65px'), borderRadius: '10px', border: '2px dashed #d1d5db', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#9ca3af', flexDirection: 'column', gap: '2px', transition: 'border-color 0.2s' }} onMouseEnter={e => e.currentTarget.style.borderColor = '#E31E24'} onMouseLeave={e => e.currentTarget.style.borderColor = '#d1d5db'}>
                <span style={{ fontSize: s('20px', '22px') }}>+</span>
                <span style={{ fontSize: s('9px', '10px'), fontWeight: 'bold' }}>Hozzáadás</span>
                <input type="file" multiple accept="image/*" onChange={handleFileSelect} style={{ display: 'none' }} />
              </label>
            )}

            {uploading && (
              <div style={{ width: s('80px', '90px'), height: s('60px', '65px'), borderRadius: '10px', border: '2px dashed #d1d5db', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontSize: s('10px', '11px'), fontWeight: 'bold' }}>
                ⏳ Feltöltés...
              </div>
            )}
          </div>
          <div style={{ fontSize: s('11px', '12px'), color: '#9ca3af' }}>Az első kép lesz a borítókép. Max. 4 kép ({images.length}/4).</div>
        </div>

        <label style={labelStyle}>Leírás</label>
        <textarea name="description" value={formData.description} onChange={handleChange} style={{ ...inputStyle, height: s('120px', '120px'), resize: 'vertical' }} placeholder="Felszereltség, állapot..." required />

        <div style={{ display: 'flex', gap: s('10px', '12px'), marginTop: s('16px', '10px'), flexDirection: s('column', 'row') }}>
          <button type="submit" disabled={uploading} style={{ flex: s(1, 2), backgroundColor: uploading ? '#9ca3af' : '#E31E24', color: 'white', padding: s('14px', '15px'), borderRadius: '12px', border: 'none', fontWeight: 'bold', cursor: uploading ? 'not-allowed' : 'pointer', fontSize: s('15px', '16px'), transition: 'background-color 0.2s' }} onMouseEnter={e => !uploading && (e.target.style.backgroundColor = '#c41f1f')} onMouseLeave={e => !uploading && (e.target.style.backgroundColor = '#E31E24')}>Mentés</button>
          <button type="button" onClick={onCancel} style={{ flex: s(1, 1), backgroundColor: '#f3f4f6', color: '#111827', padding: s('14px', '15px'), borderRadius: '12px', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: s('15px', '16px'), transition: 'background-color 0.2s' }} onMouseEnter={e => e.target.style.backgroundColor = '#e5e7eb'} onMouseLeave={e => e.target.style.backgroundColor = '#f3f4f6'}>Mégse</button>
        </div>
      </form>
    </div>
  );
};

export default AddCar;