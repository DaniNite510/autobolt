import React, { useState, useEffect } from 'react';
import { Fuel, Gauge, Settings2, Calendar, Search, SlidersHorizontal, X } from 'lucide-react';

const Home = ({ filteredCars, selectedFilter, setSelectedFilter, filterOpen, setFilterOpen, onDetailsClick }) => {
  const [visibleCars, setVisibleCars] = useState(filteredCars);
  const [prevFilter, setPrevFilter] = useState(selectedFilter);

  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showPriceFilter, setShowPriceFilter] = useState(false);

  useEffect(() => {
    if (selectedFilter === prevFilter) return;
    setPrevFilter(selectedFilter);
  }, [selectedFilter]);

  // Szűrés: kategória + keresés + ár
  const displayedCars = filteredCars.filter(car => {
    const matchSearch = car.make.toLowerCase().includes(search.toLowerCase());
    const matchMin = minPrice === '' || car.price >= Number(minPrice);
    const matchMax = maxPrice === '' || car.price <= Number(maxPrice);
    return matchSearch && matchMin && matchMax;
  });

  const hasActiveFilters = search !== '' || minPrice !== '' || maxPrice !== '';

  const clearFilters = () => {
    setSearch('');
    setMinPrice('');
    setMaxPrice('');
  };

  return (
    <div style={{ padding: '40px', backgroundColor: '#F3F4F6', minHeight: '100vh' }}>

      {/* HEADER */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <p style={{ color: '#9ca3af', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
          Találj eladó és bérelhető autókat a közeledben
        </p>
        <h1 style={{ fontSize: '42px', fontWeight: '900', color: '#111827', margin: '10px 0' }}>
          Találd meg álmaid autóját
        </h1>
      </div>

      {/* SZŰRŐDOBOZ */}
      <div style={{ maxWidth: '850px', margin: '0 auto 50px auto', backgroundColor: 'white', padding: '25px', borderRadius: '25px', boxShadow: '0 4px 25px rgba(0,0,0,0.03)' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontSize: '11px', fontWeight: '900', color: '#111827' }}>
          <span style={{ backgroundColor: '#000', color: '#fff', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</span>
          SZŰRÉS KATEGÓRIA SZERINT
        </div>

        {/* Kategória dropdown */}
        <div onClick={() => setFilterOpen(!filterOpen)} style={{ border: '1px solid #f0f0f0', padding: '18px', borderRadius: '15px', display: 'flex', justifyContent: 'space-between', cursor: 'pointer', fontWeight: 'bold', marginBottom: '15px' }}>
          {selectedFilter.toUpperCase()}
          <span style={{ transition: 'transform 0.2s', display: 'inline-block', transform: filterOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
        </div>
        {filterOpen && (
          <div style={{ position: 'absolute', width: '800px', backgroundColor: 'white', marginTop: '-10px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', zIndex: 100 }}>
            {["Összes autó", "Új autók", "Használt autók"].map(f => (
              <div key={f} onClick={() => { setSelectedFilter(f); setFilterOpen(false); }}
                style={{ padding: '15px 20px', cursor: 'pointer', borderBottom: '1px solid #f9f9f9', fontWeight: selectedFilter === f ? 'bold' : 'normal', color: selectedFilter === f ? '#E31E24' : '#111827' }}>
                {f}
              </div>
            ))}
          </div>
        )}

        {/* Keresés + Ár szűrő sor */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          
          {/* Keresőmező */}
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={16} color="#9ca3af" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Keresés autó neve alapján..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', padding: '14px 14px 14px 42px', borderRadius: '12px', border: '1px solid #f0f0f0', fontSize: '14px', outline: 'none', boxSizing: 'border-box', backgroundColor: '#f9fafb' }}
            />
            {search && (
              <button onClick={() => setSearch('')} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex', alignItems: 'center' }}>
                <X size={14} />
              </button>
            )}
          </div>

          {/* Ár szűrő gomb */}
          <button
            onClick={() => setShowPriceFilter(!showPriceFilter)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 20px', borderRadius: '12px', border: '1px solid #f0f0f0', backgroundColor: showPriceFilter || (minPrice || maxPrice) ? '#111827' : '#f9fafb', color: showPriceFilter || (minPrice || maxPrice) ? 'white' : '#6b7280', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px', whiteSpace: 'nowrap' }}
          >
            <SlidersHorizontal size={16} />
            Ár szűrő
            {(minPrice || maxPrice) && <span style={{ backgroundColor: '#E31E24', color: 'white', borderRadius: '50%', width: '8px', height: '8px', display: 'inline-block' }} />}
          </button>
        </div>

        {/* Ár szűrő panel */}
        {showPriceFilter && (
          <div style={{ marginTop: '12px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '15px', display: 'flex', gap: '15px', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '11px', fontWeight: '900', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '6px' }}>Min. ár (Ft)</div>
              <input
                type="number"
                placeholder="pl. 1 000 000"
                value={minPrice}
                onChange={e => setMinPrice(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e5e7eb', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ color: '#9ca3af', fontWeight: 'bold', paddingTop: '20px' }}>—</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '11px', fontWeight: '900', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '6px' }}>Max. ár (Ft)</div>
              <input
                type="number"
                placeholder="pl. 5 000 000"
                value={maxPrice}
                onChange={e => setMaxPrice(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e5e7eb', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
            {(minPrice || maxPrice) && (
              <button onClick={() => { setMinPrice(''); setMaxPrice(''); }} style={{ paddingTop: '20px', background: 'none', border: 'none', color: '#E31E24', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px', whiteSpace: 'nowrap' }}>
                Törlés
              </button>
            )}
          </div>
        )}

        {/* Aktív szűrők + találatok száma */}
        {(hasActiveFilters || displayedCars.length !== filteredCars.length) && (
          <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#9ca3af' }}>
              <span style={{ fontWeight: 'bold', color: '#111827' }}>{displayedCars.length}</span> találat
            </span>
            {hasActiveFilters && (
              <button onClick={clearFilters} style={{ background: 'none', border: 'none', color: '#E31E24', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <X size={13} /> Szűrők törlése
              </button>
            )}
          </div>
        )}
      </div>

      {/* AUTÓK RÁCSA */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '40px', maxWidth: '1200px', margin: '0 auto' }}>
        {displayedCars.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '80px', color: '#9ca3af' }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>🔍</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>Nincs találat</div>
            <div style={{ fontSize: '14px', marginTop: '8px' }}>Próbálj más keresési feltételeket</div>
          </div>
        ) : displayedCars.map((car, index) => (
          <div key={car.id} style={{ backgroundColor: 'white', borderRadius: '40px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.04)', position: 'relative' }}>

            <div style={{ position: 'absolute', top: '25px', left: '25px', backgroundColor: car.status === 'Új autók' ? '#E31E24' : '#1f2937', color: 'white', padding: '6px 14px', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', zIndex: 2 }}>
              {car.status === 'Új autók' ? 'ÚJ' : 'HASZNÁLT'}
            </div>

            <div style={{ height: '280px', cursor: 'pointer' }} onClick={() => onDetailsClick(car)}>
              <img src={car.img ? car.img.split('|||')[0] : ''} alt={car.make} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div style={{ padding: '35px' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '28px', fontWeight: '900', color: '#111827' }}>
                {car.make} - {car.year}
              </h3>
              <p style={{ color: '#9ca3af', fontSize: '14px', margin: '0 0 35px 0' }}>
                Prémium minőségű választás az Ön igényeire szabva.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px', borderTop: '1px solid #f3f4f6', paddingTop: '30px' }}>
                <div style={iconBoxStyle}>
                  <div style={iconCircleStyle}><Gauge size={16} color="#E31E24" /></div>
                  <div style={iconContentStyle}><span style={iconLabelStyle}>Kilométer</span><span style={iconTextStyle}>{car.km}</span></div>
                </div>
                <div style={iconBoxStyle}>
                  <div style={iconCircleStyle}><Fuel size={16} color="#E31E24" /></div>
                  <div style={iconContentStyle}><span style={iconLabelStyle}>Üzemanyag</span><span style={iconTextStyle}>{car.fuel}</span></div>
                </div>
                <div style={iconBoxStyle}>
                  <div style={iconCircleStyle}><Settings2 size={16} color="#E31E24" /></div>
                  <div style={iconContentStyle}><span style={iconLabelStyle}>Váltó</span><span style={iconTextStyle}>{car.gearbox}</span></div>
                </div>
                <div style={iconBoxStyle}>
                  <div style={iconCircleStyle}><Calendar size={16} color="#E31E24" /></div>
                  <div style={iconContentStyle}><span style={iconLabelStyle}>Évjárat</span><span style={iconTextStyle}>{car.year}</span></div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '26px', fontWeight: '900', color: '#111827' }}>
                  {car.price.toLocaleString('de-DE')} Ft
                </div>
                <button onClick={() => onDetailsClick(car)} style={{ backgroundColor: '#f3f4f6', border: 'none', padding: '14px 30px', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer', color: '#6b7280', fontSize: '14px' }}>
                  Részletek
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const iconBoxStyle = { display: 'flex', alignItems: 'center', gap: '12px' };
const iconCircleStyle = { width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#fff5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 };
const iconContentStyle = { display: 'flex', flexDirection: 'column' };
const iconLabelStyle = { fontSize: '10px', color: '#9ca3af', fontWeight: 'bold', textTransform: 'uppercase' };
const iconTextStyle = { fontSize: '13px', fontWeight: '800', color: '#111827' };

export default Home;