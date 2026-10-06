// components.jsx — Header, Marquee, Turntable, VinylCard, Filter, Pagination

const { useState, useEffect, useRef, useMemo } = React;

// ────────── Header ──────────
function Header({ route, navigate, cartCount, savedCount }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const links = [
  ['how', 'How It Works'],
  ['browse', 'Browse'],
  ['sell', 'Sell Yours'],
  ['rentals', 'My Rentals']];

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="logo" onClick={() => navigate('home')}>
        Play it twice<span className="dot" />
      </div>
      <nav className="nav">
        {links.map(([key, label], i) =>
        <React.Fragment key={key}>
            <span
            className={`nav-link ${route === key ? 'active' : ''}`}
            onClick={() => navigate(key)}>
            
              {label}
            </span>
            {i < links.length - 1 && <span className="nav-sep">|</span>}
          </React.Fragment>
        )}
      </nav>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <button className="icon-btn" onClick={() => navigate('saved')} aria-label="Saved" title="Saved">
          <svg width="18" height="18" viewBox="0 0 24 24" fill={savedCount ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
          {savedCount > 0 && <span className="icon-btn-count">{savedCount}</span>}
        </button>
        <button className="cart-btn" onClick={() => navigate('rentals')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" /></svg>
          Cart <span className="count">{cartCount}</span>
        </button>
      </div>
    </header>);

}

// ────────── Marquee — footer easter egg (only visible when scrolled into view) ──────────
function Marquee({ phrase = "DON'T STOP THE MUSIC" }) {
  const [paused, setPaused] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => setRevealed(entry.isIntersecting),
      { threshold: 0.4 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const items = Array.from({ length: 14 });
  return (
    <div
      ref={ref}
      className={`marquee ${revealed ? 'revealed' : ''}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-hidden="true">
      
      <div className={`marquee-track ${paused ? 'paused' : ''}`}>
        {items.map((_, i) =>
        <span className="marquee-item" key={i}>
            {phrase}
            <span className="star">✦</span>
          </span>
        )}
      </div>
    </div>);

}

// ────────── Turntable ──────────
function Turntable({ album }) {
  // Negative angle = parked to the right of platter; positive = swung onto platter
  const [angle, setAngle] = useState(-28);
  const [dragging, setDragging] = useState(false);
  const armRef = useRef(null);

  // Stylus is on the record when the arm is rotated CCW past straight-down
  const playing = angle > 8;

  const startDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  useEffect(() => {
    if (!dragging) return;
    const move = (e) => {
      if (e.cancelable) e.preventDefault();
      const pt = e.touches ? e.touches[0] : e;
      const armEl = armRef.current;
      if (!armEl) return;
      // arm wrapper is 0×0 at the pivot point
      const rect = armEl.getBoundingClientRect();
      const dx = pt.clientX - rect.left;
      const dy = pt.clientY - rect.top;
      // CSS rotate(θ) sends a down-vector (0,1) to (-sin θ, cos θ), so the
      // arm points at the mouse when θ = atan2(-dx, dy).
      let deg = Math.atan2(-dx, dy) * 180 / Math.PI;
      deg = Math.max(-40, Math.min(28, deg));
      setAngle(deg);
    };
    const up = () => setDragging(false);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    window.addEventListener('touchmove', move, { passive: false });
    window.addEventListener('touchend', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('touchmove', move);
      window.removeEventListener('touchend', up);
    };
  }, [dragging]);

  return (
    <div className="hero-vinyl-wrap">
      <div className="turntable" style={{ borderWidth: "1px 2px 2px 0px", borderColor: "rgb(87, 87, 87)", borderStyle: "double" }}>
        <div className="turntable-vinyl">
          <div className={`turntable-disc ${playing ? '' : 'paused'}`}>
            <img src={album.cover.vinyl} alt="" draggable={false} />
          </div>
        </div>
        <div className="turntable-spindle" style={{ opacity: "0" }} />
        <div className="turntable-corner" />
        <div
          ref={armRef}
          className={`turntable-arm ${dragging ? 'dragging' : ''} ${playing ? 'playing' : ''}`}
          style={{ transform: `rotate(${angle}deg)` }}
          onMouseDown={startDrag}
          onTouchStart={startDrag}>
          
          <div className="arm-counter" />
          <div className="arm-shaft" style={{ backgroundPosition: "center center" }} />
          <div className="arm-head" />
          <div className="arm-stylus" />
          <div className="arm-pivot" />
        </div>
        <div className={`arm-hint ${dragging ? 'hidden' : ''}`}>
          {playing ?
          '◉ Playing — drag the arm to pause' :
          '▸ Drag the arm onto the record'}
        </div>
      </div>
      <div className="now-playing">
        <div className="label">{playing ? 'Now spinning' : 'Paused'}</div>
        <div className="title">{album.title} — {album.artist}</div>
      </div>
    </div>);

}

// ────────── VinylCard ──────────
function VinylCard({ album, onClick }) {
  return (
    <div className="card" onClick={() => onClick && onClick(album)}>
      <div className="card-art">
        {album.userListing && <div className="badge user">Your listing</div>}
        {album.avail === 'reserved' && <div className="badge reserved">Reserved</div>}
        {album.year >= 2024 && !album.userListing && <div className="badge new">New In</div>}
        <div className="vinyl">
          <VinylImage album={album} />
        </div>
        <div className="cover">
          <CoverArt album={album} />
        </div>
      </div>
      <div className="card-meta">
        <div className="t">{album.title}</div>
        <div className="a">{album.artist} · {album.year}</div>
        <div className="row">
          <span className="price">{album.price}€/mo · {album.buy}€</span>
          <span className="cond">{album.condition}</span>
        </div>
      </div>
    </div>);

}

// ────────── Filter Group ──────────
function FilterGroup({ title, options, value, onChange, initiallyOpen = false, multi = true, detail = null }) {
  const [open, setOpen] = useState(initiallyOpen);
  const toggle = (opt) => {
    if (multi) {
      const next = value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt];
      onChange(next);
    } else {
      onChange(value === opt ? null : opt);
    }
  };
  return (
    <div className={`filter-group ${open ? 'open' : ''}`}>
      <div className="head" onClick={() => setOpen(!open)}>
        <span className="head-label">{title}</span>
        <svg className="chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
      <div className="body">
        {options.map((opt) => {
          const checked = multi ? value.includes(opt) : value === opt;
          return (
            <div
              key={opt}
              className={`filter-option ${checked ? 'checked' : ''}`}
              onClick={() => toggle(opt)}>
              
              <div className="box" />
              <span>{opt}</span>
            </div>);

        })}
        {detail}
      </div>
    </div>);

}

// ────────── Pagination ──────────
function Pagination({ page, total, onChange }) {
  return (
    <div className="pagination">
      <button className="num" disabled={page === 1} onClick={() => onChange(Math.max(1, page - 1))}>
        {page > 1 && <span>← {page - 1}</span>}
      </button>
      <span className="num active">{page}</span>
      <button className="num" disabled={page === total} onClick={() => onChange(Math.min(total, page + 1))}>
        {page < total && <span>{page + 1} →</span>}
      </button>
    </div>);

}

Object.assign(window, { Header, Marquee, Turntable, VinylCard, FilterGroup, Pagination });