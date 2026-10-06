// app.jsx — root App, routing, tweaks, mount

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#ED9907",
  "action": "#6BED07",
  "marquee": "DON'T STOP THE MUSIC",
  "marqueeSpeed": 32,
  "fontDisplay": "MuseoModerno",
  "background": "#000000",
  "vinylHoverStyle": "slide",
  "rentalFee": 20,
  "saleFee": 15,
  "creditRate": 50,
  "creditCap": 30
}/*EDITMODE-END*/;

const ACCENT_OPTIONS = ['#ED9907', '#6BED07', '#E04848', '#5BB9FF'];
const ACTION_OPTIONS = ['#6BED07', '#ED9907', '#5BB9FF', '#E04848'];
const FONT_OPTIONS = ['MuseoModerno', 'Bebas Neue', 'Anton', 'Archivo Black'];
const BG_OPTIONS = ['#000000', '#0d1218', '#181311', '#10110d'];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = React.useState('home');
  const [currentItem, setCurrentItem] = React.useState(null);
  const [rentTarget, setRentTarget] = React.useState(null);
  const [rentMode, setRentMode] = React.useState('rent');
  const [rentals, setRentals] = React.useState([]);
  const [saved, setSaved] = React.useState([]); // array of album ids
  const toggleSave = (id) => {
    setSaved(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  // sync pricing-model tweaks into the global PRICING used by the buyout math
  React.useEffect(() => {
    window.PRICING.RENTAL_FEE = t.rentalFee / 100;
    window.PRICING.SALE_FEE = t.saleFee / 100;
    window.PRICING.CREDIT_RATE = t.creditRate / 100;
    window.PRICING.CREDIT_CAP = t.creditCap / 100;
  }, [t.rentalFee, t.saleFee, t.creditRate, t.creditCap]);

  // apply tweaks as CSS variables
  React.useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty('--accent', t.accent);
    r.style.setProperty('--action', t.action);
    r.style.setProperty('--bg', t.background);
    r.style.setProperty('--accent-soft', t.accent + '29');
    document.body.style.background = t.background;
    // marquee speed via class? we'll inject keyframe via attr
    document.documentElement.style.setProperty('--marquee-speed', `${t.marqueeSpeed}s`);
  }, [t.accent, t.action, t.background, t.marqueeSpeed]);

  // marquee speed: override the animation via a tiny stylesheet
  React.useEffect(() => {
    const id = 'marquee-speed-style';
    let s = document.getElementById(id);
    if (!s) {
      s = document.createElement('style');
      s.id = id;
      document.head.appendChild(s);
    }
    s.textContent = `.marquee-track { animation-duration: ${t.marqueeSpeed}s !important; }`;
  }, [t.marqueeSpeed]);

  // display font override
  React.useEffect(() => {
    const id = 'display-font-style';
    let s = document.getElementById(id);
    if (!s) { s = document.createElement('style'); s.id = id; document.head.appendChild(s); }
    s.textContent = `
      .logo, .section-title, .item-title, .browse-head h1, .how-card h3, .modal h2, .also-like h2,
      .hero-quote, .cover-art .titles { font-family: '${t.fontDisplay}', sans-serif !important; }
    `;
  }, [t.fontDisplay]);

  const navigate = (r) => {
    setRoute(r);
    window.scrollTo({ top: 0 });
  };
  const openItem = (id) => {
    setCurrentItem(id);
    setRoute('item');
    window.scrollTo({ top: 0 });
  };
  const onRent = (album, mode) => {
    setRentTarget(album);
    setRentMode(mode);
  };
  const confirmRent = (album, duration, mode, ship) => {
    setRentals(prev => [...prev, { albumId: album.id, duration, mode, ship, ts: Date.now() }]);
  };
  const cancelRental = (idx) => {
    setRentals(prev => prev.map((r, i) => i === idx ? { ...r, cancelled: true } : r));
  };
  const renewRental = (idx) => {
    setRentals(prev => prev.map((r, i) => i === idx ? { ...r, duration: r.duration * 2 } : r));
  };
  const buyOut = (idx) => {
    setRentals(prev => prev.map((r, i) => i === idx ? { ...r, mode: 'buy' } : r));
  };

  let view;
  if (route === 'home')       view = <HomePage navigate={navigate} openItem={openItem} cart={rentals} setCart={setRentals} />;
  else if (route === 'browse')view = <BrowsePage openItem={openItem} />;
  else if (route === 'item')  view = <ItemPage albumId={currentItem} navigate={navigate} openItem={openItem} onRent={onRent} saved={saved} onToggleSave={toggleSave} />
  else if (route === 'saved') view = <SavedPage saved={saved} navigate={navigate} openItem={openItem} onToggleSave={toggleSave} />;
  else if (route === 'rentals') view = <RentalsPage rentals={rentals} navigate={navigate} openItem={openItem} onCancel={cancelRental} onRenew={renewRental} onBuyOut={buyOut} />;
  else if (route === 'rent')  view = <SellPage navigate={navigate} openItem={openItem} />;
  else if (route === 'sell')  view = <SellPage navigate={navigate} openItem={openItem} />;
  else if (route === 'how')   view = <HowPage navigate={navigate} />;

  return (
    <div className="app">
      <Header route={route} navigate={navigate} cartCount={rentals.length} savedCount={saved.length} />
      {view}
      <Marquee phrase={t.marquee} />
      {rentTarget && (
        <RentModal
          album={rentTarget}
          mode={rentMode}
          onClose={() => setRentTarget(null)}
          onConfirm={confirmRent}
        />
      )}
      <TweaksPanel title="Tweaks">
        <TweakSection label="Brand">
          <TweakColor label="Accent" value={t.accent} options={ACCENT_OPTIONS} onChange={v => setTweak('accent', v)} />
          <TweakColor label="Action (CTA)" value={t.action} options={ACTION_OPTIONS} onChange={v => setTweak('action', v)} />
          <TweakColor label="Background" value={t.background} options={BG_OPTIONS} onChange={v => setTweak('background', v)} />
        </TweakSection>
        <TweakSection label="Type">
          <TweakSelect label="Display font" value={t.fontDisplay} options={FONT_OPTIONS} onChange={v => setTweak('fontDisplay', v)} />
        </TweakSection>
        <TweakSection label="Marquee">
          <TweakText label="Phrase" value={t.marquee} onChange={v => setTweak('marquee', v)} />
          <TweakSlider label="Speed" value={t.marqueeSpeed} min={8} max={80} step={1} onChange={v => setTweak('marqueeSpeed', v)} unit="s" />
        </TweakSection>
        <TweakSection label="Pricing model">
          <TweakSlider label="Rental fee" value={t.rentalFee} min={0} max={40} step={1} onChange={v => setTweak('rentalFee', v)} unit="%" />
          <TweakSlider label="Sale fee" value={t.saleFee} min={0} max={40} step={1} onChange={v => setTweak('saleFee', v)} unit="%" />
          <TweakSlider label="Buyout credit" value={t.creditRate} min={0} max={100} step={5} onChange={v => setTweak('creditRate', v)} unit="%" />
          <TweakSlider label="Credit cap" value={t.creditCap} min={0} max={100} step={5} onChange={v => setTweak('creditCap', v)} unit="%" />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
