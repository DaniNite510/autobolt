import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useResponsiveStyles from '../hooks/useResponsiveStyles';
import EditableRow from '../components/EditableRow';
import ImageGallery from '../components/ImageGallery';
import { getCarById, updateCar } from '../api';

const SEP = '|||';

const EditCar = ({ onSave }) => {
  const { id } = useParams();
  const { s } = useResponsiveStyles();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeField, setActiveField] = useState(null);
  const [tempValue, setTempValue] = useState('');
  const [saving, setSaving] = useState(false);
  const [savedField, setSavedField] = useState(null);
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const data = await getCarById(id);
        setFormData(data);
        setImages(data.img ? data.img.split(SEP).filter(Boolean).map(url => ({
          preview: url,
          url: url,
          filename: url.split('/').pop()
        })) : []);
      } catch (err) {
        console.error('Hiba:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  const handleImagesChange = async (newImages) => {
    setImages(newImages);
    const updatedCar = { ...formData, img: newImages.map(img => img.url).join(SEP) };
    setFormData(updatedCar);
    try {
      await updateCar(id, updatedCar);
    } catch {
      alert('Hiba történt a képek mentésekor!');
    }
  };

  const saveField = async (name) => {
    const finalValue = (name === 'price' || name === 'year') ? Number(tempValue) : tempValue;
    const updatedCar = { ...formData, [name]: finalValue };
    setFormData(updatedCar);
    setSaving(true);
    try {
      const data = await updateCar(id, updatedCar);
      if (data.message !== 'Sikeres módosítás') throw new Error();
      setSavedField(name);
      setTimeout(() => setSavedField(null), 2000);
    } catch {
      alert('Hiba történt a mentés során!');
    } finally {
      setSaving(false);
    }
    setActiveField(null);
  };

  if (loading) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#F3F4F6', padding: s('20px', '40px') }}><div style={{ textAlign: 'center', color: '#9ca3af' }}><div style={{ fontSize: '32px', marginBottom: '16px' }}>⏳</div><div style={{ fontSize: s('16px', '18px') }}>Betöltés...</div></div></div>;
  if (!formData) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#F3F4F6', padding: s('20px', '40px') }}><div style={{ textAlign: 'center', color: '#9ca3af' }}><div style={{ fontSize: '32px', marginBottom: '16px' }}>🚫</div><div style={{ fontSize: s('16px', '18px') }}>Az autó nem található.</div></div></div>;

  const rowProps = { formData, activeField, setActiveField, tempValue, setTempValue, saving, savedField, onSave: saveField };

  return (
    <div style={{ maxWidth: '900px', margin: s('20px 0', '40px auto'), padding: s('20px 15px', '40px'), backgroundColor: '#F3F4F6', minHeight: '100vh' }}>
      <div style={{ backgroundColor: 'white', padding: s('20px', '40px'), borderRadius: s('20px', '35px'), boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}>
        <div style={{ marginBottom: s('24px', '30px') }}>
          <h2 style={{ fontSize: s('22px', '28px'), fontWeight: '900', marginBottom: '8px', color: '#111827' }}>Autó szerkesztése</h2>
          <p style={{ color: '#9ca3af', fontSize: s('13px', '14px'), margin: 0 }}>A mentés után ezen az oldalon maradsz.</p>
        </div>

        <div style={{ marginBottom: s('20px', '30px') }}>
          <ImageGallery images={images} onImagesChange={handleImagesChange} uploading={uploading} onUploadingChange={setUploading} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <EditableRow label="Megnevezés"      name="make"         {...rowProps} />
          <EditableRow label="Alcím"            name="subtitle"     {...rowProps} />
          <EditableRow label="Vételár"          name="price"        type="number" {...rowProps} />
          <EditableRow label="Évjárat"          name="year"         type="number" {...rowProps} />
          <EditableRow label="Kilométer"        name="km"           {...rowProps} />
          <EditableRow label="Üzemanyag"        name="fuel"         isSelect options={['Benzin', 'Dízel', 'Hibrid', 'Elektromos']} {...rowProps} />
          <EditableRow label="Váltó"            name="gearbox"      isSelect options={['Manuális', 'Automata']} {...rowProps} />
          <EditableRow label="Státusz"          name="status"       isSelect options={['Új autók', 'Használt autók']} {...rowProps} />
          <EditableRow label="Csomagtér (L)"   name="csomagter"    {...rowProps} />
          <EditableRow label="Tömeg (kg)"      name="tomeg"        {...rowProps} />
          <EditableRow label="Hajtás"           name="hajtas"       isSelect options={['Elsőkerék', 'Hátsókerék', 'Összkerék']} {...rowProps} />
          <EditableRow label="Teljesítmény (LE)" name="teljesitmeny" {...rowProps} />
          <EditableRow label="Leírás"           name="description"  multiline {...rowProps} />
        </div>

        <div style={{ marginTop: s('24px', '40px'), paddingTop: s('20px', '30px'), borderTop: '2px solid #f3f4f6' }}>
          <button onClick={onSave} style={{ width: '100%', backgroundColor: '#111', color: 'white', padding: s('14px', '15px'), borderRadius: s('12px', '15px'), border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: s('15px', '16px'), transition: 'background-color 0.2s' }} onMouseEnter={e => e.target.style.backgroundColor = '#333'} onMouseLeave={e => e.target.style.backgroundColor = '#111'}>✓ Vissza az autók kezeléséhez</button>
        </div>
      </div>
    </div>
  );
};

export default EditCar;