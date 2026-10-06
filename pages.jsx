// pages.jsx — Home, Browse, Item, Rentals + Rent modal

const { useState: uS, useEffect: uE, useMemo: uM } = React;

// ─────────── Home ───────────
function HomePage({ navigate, openItem, setCart, cart }) {
  const featured = window.CATALOG.slice(0, 6);
  const [heroAlbum, setHeroAlbum] = uS(window.CATALOG[0]);
  return (
    <main>
      <section className="home">
        <div className="hero-text">
          <div className="hero-eyebrow">Second-hand vinyls · rent or own</div>
          <div className="hero-lead">
            Rent your favorite vinyls, enjoy the analog vibe, and share the sound with others.
          </div>
          <div className="hero-quote">"If it's nice, play it twice"</div>
          <div className="hero-stages">
            <span className="stage">Rent</span>
            <span className="arrow">→</span>
            <span className="stage">Listen</span>
            <span className="arrow">→</span>
            <span className="stage">Share Again</span>
          </div>
          <div className="hero-cta-row">
            <button className="btn" onClick={() => navigate('browse')}>Browse Vinyls</button>
            <button className="btn btn-ghost" onClick={() => navigate('how')}>Not sure how it works?</button>
          </div>
          <div className="hero-meta">
            <div>
              <div className="stat-num">2,471</div>
              <div className="stat-label">records in circulation</div>
            </div>
            <div>
              <div className="stat-num">5€</div>
              <div className="stat-label">avg / month rental</div>
            </div>
            <div>
              <div className="stat-num">14 days</div>
              <div className="stat-label">free returns</div>
            </div>
          </div>
        </div>
        <Turntable album={heroAlbum} />
      </section>

      <section className="section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 22 }}>
          <h2 className="section-title">Fresh on the shelf</h2>
          <span className="dim" style={{ fontSize: 14, cursor: 'pointer' }} onClick={() => navigate('browse')}>See all →</span>
        </div>
        <div className="featured-row">
          {featured.map((a) =>
          <div key={a.id} onClick={() => {setHeroAlbum(a);}} onDoubleClick={() => openItem(a.id)} style={{ cursor: 'pointer' }}>
              <VinylCard album={a} onClick={() => openItem(a.id)} />
            </div>
          )}
        </div>
      </section>

      <section className="how" id="how">
        <h2 className="section-title">How it works</h2>
        <div className="how-grid">
          <div className="how-card">
            <div className="step-num">STEP 01</div>
            <h3>Pick a vinyl</h3>
            <p>Browse the shelf, filter by genre, era or condition. Real people graded each record by ear.</p>
          </div>
          <div className="how-card">
            <div className="step-num">STEP 02</div>
            <h3>Rent or buy</h3>
            <p>Take it home for a month, three, or forever. We ship in a padded mailer with a return label inside.</p>
          </div>
          <div className="how-card">
            <div className="step-num">STEP 03</div>
            <h3>Play it twice</h3>
            <p>Drop a note in the sleeve before you send it back. The next listener gets your liner notes.</p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingBottom: 60 }}>
        <h2 className="section-title">Notes from past renters</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {[
          ['"I left a note in the sleeve. Hope the next person sees it."', 'Oliwia, Warsaw'],
          ['"This feels more like sharing music than just renting it."', 'Jihee, Seoul'],
          ['"Found a record I never would\'ve bought. Now I own it."', 'Marko, Lisbon']].
          map(([q, a]) =>
          <div key={a} style={{ padding: 28, border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16 }}>
              <div style={{ fontFamily: "'Raleway', sans-serif", fontStyle: 'italic', fontWeight: 600, fontSize: 18, color: 'var(--accent)', marginBottom: 12 }}>{q}</div>
              <div className="dim" style={{ fontSize: 13 }}>— {a}</div>
            </div>
          )}
        </div>
      </section>
    </main>);

}

// ─────────── Browse ───────────
const GENRES = ['Hip-Hop', 'Soul', 'R&B', 'Pop', 'Rock', 'Indie/Psych', 'Prog Rock', 'Jazz', 'Funk', 'Electronic'];
const ERAS = ['60s', '70s', '80s', '90s', '2000s', '2010s', '2020s'];
const CONDITIONS = ['Like New', 'Gently Used', 'Well-Loved'];
const AVAIL = ['Available Now', 'Reserved', 'Shared Recently'];

function BrowsePage({ openItem }) {
  const [filters, setFilters] = uS({ genres: [], eras: [], cond: [], avail: [] });
  const [page, setPage] = uS(1);
  const [sort, setSort] = uS('newest');

  const matchEra = (year, eras) => {
    if (eras.length === 0) return true;
    return eras.some((e) => {
      if (e === '60s') return year >= 1960 && year < 1970;
      if (e === '70s') return year >= 1970 && year < 1980;
      if (e === '80s') return year >= 1980 && year < 1990;
      if (e === '90s') return year >= 1990 && year < 2000;
      if (e === '2000s') return year >= 2000 && year < 2010;
      if (e === '2010s') return year >= 2010 && year < 2020;
      if (e === '2020s') return year >= 2020;
      return false;
    });
  };

  const matchGenre = (g, list) => {
    if (list.length === 0) return true;
    return list.some((x) => g.toLowerCase().includes(x.toLowerCase().split('/')[0]));
  };

  const filtered = uM(() => {
    const out = window.CATALOG.filter((a) =>
    matchGenre(a.genre, filters.genres) &&
    matchEra(a.year, filters.eras) && (
    filters.cond.length === 0 || filters.cond.includes(a.condition)) && (
    filters.avail.length === 0 || filters.avail.includes(a.avail === 'available' ? 'Available Now' : a.avail === 'reserved' ? 'Reserved' : 'Shared Recently'))
    );
    if (sort === 'newest') return [...out].sort((a, b) => b.year - a.year);
    if (sort === 'oldest') return [...out].sort((a, b) => a.year - b.year);
    if (sort === 'price-low') return [...out].sort((a, b) => a.price - b.price);
    return out;
  }, [filters, sort]);

  const perPage = 9;
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const slice = filtered.slice((page - 1) * perPage, page * perPage);
  uE(() => {if (page > totalPages) setPage(1);}, [totalPages]);

  const setF = (k) => (v) => setFilters((prev) => ({ ...prev, [k]: v }));

  const conditionDetail =
  <div className="condition-detail">
      <strong>Like New</strong>Perfect condition, barely played.
      <strong>Gently Used</strong>Minor signs of use, plays smoothly.
      <strong>Well-Loved</strong>Visible wear, still sounds good with a few crackles.
    </div>;


  const anyFilter = filters.genres.length + filters.eras.length + filters.cond.length + filters.avail.length > 0;

  return (
    <main>
      <div className="browse">
        <aside>
          <div className="filters-head">
            <div className="icon"><span /><span /><span /></div>
            <div className="title">Filters</div>
          </div>
          <FilterGroup title="Genre" options={GENRES} value={filters.genres} onChange={setF('genres')} initiallyOpen={true} />
          <FilterGroup title="Era / Decade" options={ERAS} value={filters.eras} onChange={setF('eras')} />
          <FilterGroup title="Vinyl Condition" options={CONDITIONS} value={filters.cond} onChange={setF('cond')} detail={conditionDetail} />
          <FilterGroup title="Availability" options={AVAIL} value={filters.avail} onChange={setF('avail')} />
          {anyFilter &&
          <button className="filter-clear" onClick={() => setFilters({ genres: [], eras: [], cond: [], avail: [] })}>
              Clear all
            </button>
          }
        </aside>
        <div>
          <div className="browse-head">
            <div>
              <h1>All the vinyls</h1>
              <span className="count">{filtered.length} records · page {page} of {totalPages}</span>
            </div>
            <select className="sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="price-low">Price: low to high</option>
            </select>
          </div>
          {slice.length === 0 ?
          <div style={{ padding: 80, textAlign: 'center' }} className="dim">No records match those filters. Try clearing some.</div> :

          <div className="grid">
              {slice.map((a) => <VinylCard key={a.id} album={a} onClick={() => openItem(a.id)} />)}
            </div>
          }
          <Pagination page={page} total={totalPages} onChange={setPage} />
        </div>
      </div>
    </main>);

}

// ─────────── Item page ───────────
function ItemPage({ albumId, navigate, openItem, onRent, saved, onToggleSave }) {
  const album = window.getAlbum(albumId) || window.CATALOG[0];
  const [mode, setMode] = uS('rent');
  const isSaved = saved && saved.includes(album.id);
  const recs = window.CATALOG.filter((a) => a.id !== album.id).slice(0, 6);
  const disc1 = album.tracks.filter((t) => t[2] === 1);
  const disc2 = album.tracks.filter((t) => t[2] === 2);
  return (
    <main>
      <div className="breadcrumb">
        <span className="link" onClick={() => navigate('home')}>Home</span>
        <span className="sep">/</span>
        <span className="link" onClick={() => navigate('browse')}>Browse</span>
        <span className="sep">/</span>
        <span className="current">{album.title}</span>
      </div>
      <div className="item">
        <div className="item-art">
          <div className="vinyl">
            <VinylImage album={album} />
          </div>
          <div className="cover">
            <CoverArt album={album} />
          </div>
        </div>
        <div className="item-info">
          <h1 className="item-title">{album.title}</h1>
          <div className="item-subtitle">by {album.artist} · {album.year} · {album.genre}</div>
          <div className="item-mode">
            <button className={`rent ${mode === 'rent' ? 'active' : ''}`} onClick={() => setMode('rent')}>Rent</button>
            <button className={`buy ${mode === 'buy' ? 'active' : ''}`} onClick={() => setMode('buy')}>Buy</button>
          </div>
          {mode === 'rent' ?
          <div className="item-price">
              <span>{album.price}€</span><span className="per">/ month</span>
              <span className="or">or</span>
              <span className="buy">buy <strong>{album.buy}€</strong></span>
            </div> :

          <div className="item-price">
              <span>{album.buy}€</span><span className="per">one-time</span>
              <span className="or">or</span>
              <span className="buy">rent from <strong>{album.price}€/mo</strong></span>
            </div>
          }
          <div className="item-actions">
            <button className="btn btn-rent" onClick={() => onRent(album, mode)}>
              {mode === 'rent' ? 'RENT NOW' : 'BUY NOW'}
            </button>
            <button className={`btn btn-ghost ${isSaved ? 'btn-saved' : ''}`} onClick={() => onToggleSave(album.id)}>
              {isSaved ? '♥ Saved' : '♡ Save'}
            </button>
          </div>
          {album.quote && <div className="item-quote">"{album.quote}"</div>}
          <p className="item-desc">{album.desc}</p>
          <dl className="item-facts">
            <dt>Genre</dt><dd>{album.genre}</dd>
            <dt>Released</dt><dd>{album.year}</dd>
            <dt>Condition</dt><dd>{album.condition}</dd>
            <dt>Availability</dt><dd className={album.avail === 'available' ? 'avail' : ''}>{album.avail === 'available' ? 'Available now' : 'Reserved'}</dd>
            <dt>Format</dt><dd>{disc2.length ? '2× LP' : 'LP'}</dd>
          </dl>
          <div className="tracklist">
            <h3>Track list</h3>
            {disc1.length > 0 && <div className="disc">Side A</div>}
            <ol>{disc1.map((t, i) => <li key={i}>{t[0]}<span className="dur">{t[1]}</span></li>)}</ol>
            {disc2.length > 0 && <><div className="disc">Side B</div>
              <ol style={{ counterReset: 'track ' + disc1.length }}>{disc2.map((t, i) => <li key={i}>{t[0]}<span className="dur">{t[1]}</span></li>)}</ol></>}
          </div>
        </div>
      </div>
      <section className="also-like">
        <h2>You might also like</h2>
        <div className="also-grid">
          {recs.map((a) => <VinylCard key={a.id} album={a} onClick={() => openItem(a.id)} />)}
        </div>
      </section>
    </main>);

}

// ─────────── Rent / Buy checkout flow ───────────
// Step 1: configure (duration if rent) → Step 2: shipping address → Step 3: review → Done
function RentModal({ album, mode, onClose, onConfirm }) {
  const [step, setStep] = uS(1);
  const [duration, setDuration] = uS(1);
  const [ship, setShip] = uS({ name: '', street: '', city: '', zip: '', country: 'France' });
  const [pay, setPay] = uS({ method: 'card', card: '', expiry: '', cvc: '', cardName: '' });
  const [touched, setTouched] = uS(false);
  if (!album) return null;

  const total = mode === 'buy' ? album.buy : album.price * duration;
  const shipFilled = ship.name && ship.street && ship.city && ship.zip;
  const payFilled = pay.method !== 'card' ? true :
  pay.card.replace(/\s/g, '').length >= 12 && pay.expiry.length >= 4 && pay.cvc.length >= 3 && pay.cardName;

  const stepLabels = ['Plan', 'Shipping', 'Payment', 'Review'];

  const handleConfirm = () => {
    setStep(5);
    onConfirm(album, duration, mode, ship);
  };

  const next = () => {
    if (step === 2) {setTouched(true);if (!shipFilled) return;setTouched(false);}
    if (step === 3) {setTouched(true);if (!payFilled) return;setTouched(false);}
    setStep(step + 1);
  };

  // ── card number formatter ──
  const fmtCard = (v) => v.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ');
  const fmtExpiry = (v) => {
    const d = v.replace(/\D/g, '').slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal modal-wide" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose}>×</button>

        {step < 5 &&
        <div className="stepper">
            {stepLabels.map((lbl, i) =>
          <React.Fragment key={i}>
                <div className={`stepper-step ${step === i + 1 ? 'active' : step > i + 1 ? 'done' : ''}`}>
                  <div className="num">{step > i + 1 ? '✓' : i + 1}</div>
                  <div className="lbl">{lbl}</div>
                </div>
                {i < stepLabels.length - 1 && <div className={`stepper-line ${step > i + 1 ? 'done' : ''}`} />}
              </React.Fragment>
          )}
          </div>
        }

        {step < 5 &&
        <div className="summary">
            <div className="mini-card"><img src={album.cover.img} alt="" /></div>
            <div className="meta">
              <div className="t">{album.title}</div>
              <div className="a">{album.artist} · {album.condition}</div>
            </div>
            <div className="p">{mode === 'buy' ? `${album.buy}€` : `${album.price}€/mo`}</div>
          </div>
        }

        {/* Step 1 — plan/duration */}
        {step === 1 &&
        <>
            <h2 style={{ marginTop: 20 }}>{mode === 'buy' ? 'Confirm your order' : 'Pick a rental length'}</h2>
            {mode === 'rent' ?
          <>
                <p className="sub">Cancel anytime. Decide to keep it later and part of your rent counts toward the buy price.</p>
                <div className="duration-row">
                  {[1, 3, 6, 12].map((m) =>
              <button key={m} className={`duration-pill ${duration === m ? 'active' : ''}`} onClick={() => setDuration(m)}>
                      <div className="d">{m} {m === 1 ? 'month' : 'months'}</div>
                      <div className="p">{album.price * m}€</div>
                    </button>
              )}
                </div>
                {(() => {
                  const q = window.buyoutQuote(album, duration);
                  return (
                    <div className="keep-it-note">
                      <strong>Want to keep it later?</strong> You'll have paid <strong>{q.rentPaid}€</strong> in rent over {duration} {duration === 1 ? 'month' : 'months'}. We put <strong>{q.credit}€</strong> of that toward the {album.buy}€ buy price{q.capped ? ' (credit caps at 30%)' : ''} — so you'd pay <strong>{q.remaining}€</strong> to own it.
                    </div>
                  );
                })()}
              </> :

          <p className="sub">It's yours to keep — original sleeve, original disc, in {album.condition.toLowerCase()} condition.</p>
          }
            <div className="total-row">
              <span className="lbl">Subtotal</span>
              <span className="val">{total}€</span>
            </div>
            <button className="btn btn-rent" style={{ width: '100%', padding: '14px' }} onClick={next}>
              Continue to shipping →
            </button>
          </>
        }

        {/* Step 2 — shipping */}
        {step === 2 &&
        <>
            <h2 style={{ marginTop: 20 }}>Where should we send it?</h2>
            <p className="sub">We ship in a padded mailer with a prepaid return label inside.</p>
            <div className="form-grid">
              <Field label="Full name" value={ship.name} onChange={(v) => setShip({ ...ship, name: v })} error={touched && !ship.name} span={2} />
              <Field label="Street address" value={ship.street} onChange={(v) => setShip({ ...ship, street: v })} error={touched && !ship.street} span={2} placeholder="123 Rue de la Musique, Apt 4B" />
              <Field label="City" value={ship.city} onChange={(v) => setShip({ ...ship, city: v })} error={touched && !ship.city} />
              <Field label="Postal code" value={ship.zip} onChange={(v) => setShip({ ...ship, zip: v })} error={touched && !ship.zip} />
              <FieldSelect label="Country" value={ship.country} onChange={(v) => setShip({ ...ship, country: v })} span={2}
            options={['France', 'Germany', 'Netherlands', 'Belgium', 'Italy', 'Spain', 'Portugal', 'UK', 'Other EU']} />
            </div>
            {touched && !shipFilled && <div className="error-msg">Please fill in the required fields.</div>}
            <div className="step-actions">
              <button className="btn btn-ghost" onClick={() => {setTouched(false);setStep(1);}}>← Back</button>
              <button className="btn btn-rent" onClick={next}>Continue to payment →</button>
            </div>
          </>
        }

        {/* Step 3 — payment */}
        {step === 3 &&
        <>
            <h2 style={{ marginTop: 20 }}>Payment</h2>
            <p className="sub">Encrypted, never stored on our servers. We charge today, no surprises later.</p>
            <div className="pay-methods">
              {[
            ['card', 'Card', <svg key="c" width="22" height="14" viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="1" width="22" height="14" rx="2" /><line x1="1" y1="6" x2="23" y2="6" /></svg>],
            ['paypal', 'PayPal', <span key="p" style={{ fontWeight: 800, fontStyle: 'italic', fontFamily: 'serif' }}>P</span>],
            ['apple', 'Apple Pay', <span key="a" style={{ fontSize: 16 }}></span>]].
            map(([id, name, icon]) =>
            <button key={id} className={`pay-method ${pay.method === id ? 'active' : ''}`} onClick={() => setPay({ ...pay, method: id })}>
                  <span className="pm-icon">{icon}</span>
                  <span>{name}</span>
                </button>
            )}
            </div>
            {pay.method === 'card' &&
          <div className="form-grid" style={{ marginTop: 18 }}>
                <Field label="Card number" value={pay.card} onChange={(v) => setPay({ ...pay, card: fmtCard(v) })} error={touched && pay.card.replace(/\s/g, '').length < 12} span={2} placeholder="4242 4242 4242 4242" />
                <Field label="MM / YY" value={pay.expiry} onChange={(v) => setPay({ ...pay, expiry: fmtExpiry(v) })} error={touched && pay.expiry.length < 4} placeholder="12/27" />
                <Field label="CVC" value={pay.cvc} onChange={(v) => setPay({ ...pay, cvc: v.replace(/\D/g, '').slice(0, 4) })} error={touched && pay.cvc.length < 3} placeholder="123" />
                <Field label="Cardholder name" value={pay.cardName} onChange={(v) => setPay({ ...pay, cardName: v })} error={touched && !pay.cardName} span={2} />
              </div>
          }
            {pay.method === 'paypal' &&
          <div className="alt-pay">
                You'll be redirected to PayPal to complete payment after confirming.
              </div>
          }
            {pay.method === 'apple' &&
          <div className="alt-pay">
                You'll be prompted by Apple Pay after confirming.
              </div>
          }
            {touched && !payFilled && <div className="error-msg">Please complete the card fields.</div>}
            <div className="step-actions">
              <button className="btn btn-ghost" onClick={() => {setTouched(false);setStep(2);}}>← Back</button>
              <button className="btn btn-rent" onClick={next}>Continue to review →</button>
            </div>
          </>
        }

        {/* Step 4 — review */}
        {step === 4 &&
        <>
            <h2 style={{ marginTop: 20 }}>Review your {mode === 'buy' ? 'order' : 'rental'}</h2>
            <p className="sub">Last look. We'll charge <strong>{total}€</strong> to your {pay.method === 'card' ? `card ending ${pay.card.slice(-4) || '••••'}` : pay.method === 'paypal' ? 'PayPal account' : 'Apple Pay'} once you confirm.</p>
            <div className="review-blocks">
              <div className="review-block">
                <div className="rb-label">Plan</div>
                <div className="rb-value">
                  {mode === 'buy' ?
                'One-time purchase' :
                `${duration} ${duration === 1 ? 'month' : 'months'} rental · ${album.price}€/mo · auto-return reminder`}
                  <button className="link-btn" onClick={() => setStep(1)}>Edit</button>
                </div>
              </div>
              <div className="review-block">
                <div className="rb-label">Ship to</div>
                <div className="rb-value">
                  {ship.name}<br />{ship.street}<br />{ship.city}, {ship.zip}<br />{ship.country}
                  <button className="link-btn" onClick={() => setStep(2)}>Edit</button>
                </div>
              </div>
              <div className="review-block">
                <div className="rb-label">Payment</div>
                <div className="rb-value">
                  {pay.method === 'card' && <>Visa / Mastercard · •••• {pay.card.slice(-4)}</>}
                  {pay.method === 'paypal' && 'PayPal'}
                  {pay.method === 'apple' && 'Apple Pay'}
                  <button className="link-btn" onClick={() => setStep(3)}>Edit</button>
                </div>
              </div>
              <div className="review-block">
                <div className="rb-label">Delivery</div>
                <div className="rb-value">Tracked mail · 2–4 business days · free both ways</div>
              </div>
            </div>
            <div className="total-row">
              <span className="lbl">Total today</span>
              <span className="val">{total}€</span>
            </div>
            <div className="step-actions">
              <button className="btn btn-ghost" onClick={() => setStep(3)}>← Back</button>
              <button className="btn btn-rent" onClick={handleConfirm}>
                {mode === 'buy' ? `Pay ${total}€ · Place order` : `Pay ${total}€ · Confirm rental`}
              </button>
            </div>
          </>
        }

        {/* Step 5 — confirmation */}
        {step === 5 &&
        <div style={{ textAlign: 'center', padding: '24px 0 8px' }}>
            <div className="success-icon" />
            <h2>You got it.</h2>
            <p className="sub" style={{ marginBottom: 22 }}>
              {mode === 'buy' ?
            `${album.title} is yours. We'll ship it to ${ship.city} within 24h.` :
            `${album.title} is on its way to ${ship.city}. Check your email for tracking and the digital sleeve note from the last listener.`}
            </p>
            <div className="conf-card">
              <div><span className="dim">Order</span> <strong>#PIT-{Math.floor(Math.random() * 900000 + 100000)}</strong></div>
              <div><span className="dim">Total charged</span> <strong>{total}€</strong></div>
              {mode === 'rent' &&
            <div><span className="dim">Return by</span> <strong>{new Date(Date.now() + duration * 30 * 86400000).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</strong></div>
            }
            </div>
            <button className="btn btn-rent" style={{ width: '100%', padding: '14px', marginTop: 20 }} onClick={onClose}>
              Done
            </button>
          </div>
        }
      </div>
    </div>);

}

function Field({ label, value, onChange, error, placeholder, span = 1 }) {
  return (
    <label className={`field ${error ? 'error' : ''}`} style={{ gridColumn: `span ${span}` }}>
      <span className="field-label">{label}</span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)} />
      
    </label>);

}
function FieldSelect({ label, value, onChange, options, span = 1 }) {
  return (
    <label className="field" style={{ gridColumn: `span ${span}` }}>
      <span className="field-label">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>);

}

// ─────────── My Rentals ───────────
function RentalsPage({ rentals, navigate, openItem, onCancel, onRenew, onBuyOut }) {
  const [toast, setToast] = uS(null);
  if (rentals.length === 0) {
    return (
      <main style={{ padding: 80, textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
        <h1 style={{ fontFamily: "'MuseoModerno',sans-serif", fontWeight: 700, fontSize: 36, marginBottom: 12 }}>No rentals yet</h1>
        <p className="dim">When you rent a record, it'll show up here with its return date and the note from the last listener.</p>
        <button className="btn" style={{ marginTop: 24 }} onClick={() => navigate('browse')}>Find your first record</button>
      </main>);

  }

  const ping = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  };

  const downloadIcs = (album, returnDate) => {
    // Standard iCalendar VEVENT — opens any calendar app
    const dt = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const startDate = new Date(returnDate);
    startDate.setHours(10, 0, 0, 0);
    const endDate = new Date(startDate);
    endDate.setHours(10, 30, 0, 0);
    const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Play it twice//EN',
    'BEGIN:VEVENT',
    `UID:${album.id}-${Date.now()}@playittwice`,
    `DTSTAMP:${dt(new Date())}`,
    `DTSTART:${dt(startDate)}`,
    `DTEND:${dt(endDate)}`,
    `SUMMARY:Return "${album.title}" — Play it twice`,
    `DESCRIPTION:Your rental of ${album.title} by ${album.artist} is due back today. Drop it at any post office with the prepaid label inside the sleeve.`,
    'BEGIN:VALARM',
    'TRIGGER:-P2D',
    'ACTION:DISPLAY',
    `DESCRIPTION:Return "${album.title}" in 2 days`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'].
    join('\r\n');
    const blob = new Blob([ics], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `return-${album.id}.ics`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    ping(`📅 Calendar reminder downloaded for ${album.title}`);
  };

  return (
    <main style={{ padding: '48px 60px 40px', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "'MuseoModerno',sans-serif", fontWeight: 700, fontSize: 40, margin: '0 0 6px' }}>My rentals</h1>
          <div className="dim" style={{ fontSize: 14 }}>{rentals.length} active · keep them spinning</div>
        </div>
        <button className="btn btn-ghost" onClick={() => navigate('browse')}>Browse more →</button>
      </div>

      <div style={{ display: 'grid', gap: 16 }}>
        {rentals.map((r, i) => {
          const a = window.getAlbum(r.albumId);
          if (!a) return null;
          const start = new Date(r.ts);
          const returnDate = new Date(r.ts + r.duration * 30 * 86400000);
          const now = Date.now();
          const daysLeft = Math.ceil((returnDate.getTime() - now) / 86400000);
          const expiring = r.mode === 'rent' && daysLeft <= 7 && daysLeft > 0;
          const isPurchase = r.mode === 'buy';
          return (
            <div key={i} className={`rental-card ${expiring ? 'expiring' : ''} ${r.cancelled ? 'cancelled' : ''}`}>
              <div className="rc-art" onClick={() => openItem(a.id)}>
                <img src={a.cover.img} alt={a.title} />
              </div>
              <div className="rc-info">
                <div className="rc-title">{a.title}</div>
                <div className="rc-sub">{a.artist} · {a.genre} · {a.condition}</div>
                <div className="rc-status">
                  {isPurchase ?
                  <span className="tag green">Owned · shipping</span> :
                  r.cancelled ?
                  <span className="tag" style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--fg-dim)' }}>Cancelled · returning</span> :
                  expiring ?
                  <span className="tag orange">Due in {daysLeft} {daysLeft === 1 ? 'day' : 'days'}</span> :

                  <span className="tag green">Active</span>
                  }
                  {!isPurchase &&
                  <span className="dim" style={{ fontSize: 13, marginLeft: 10 }}>
                      {r.cancelled ? 'Return by' : 'Auto-return'} {returnDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  }
                </div>
                {!isPurchase &&
                <div className="rc-progress">
                    <div className="rc-progress-bar"
                  style={{ width: `${Math.max(0, Math.min(100, (r.duration * 30 - daysLeft) / (r.duration * 30) * 100))}%` }} />
                  </div>
                }
              </div>
              <div className="rc-price">
                <div className="rc-price-val">{isPurchase ? `${a.buy}€` : `${a.price}€/mo`}</div>
                <div className="rc-price-lbl">{isPurchase ? 'paid' : `× ${r.duration} mo`}</div>
              </div>
              <div className="rc-actions">
                {!isPurchase && !r.cancelled &&
                <>
                    <button className="btn-mini" onClick={() => downloadIcs(a, returnDate)}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                      Calendar reminder
                    </button>
                    <button className="btn-mini" onClick={() => {onRenew(i);ping(`🔁 ${a.title} renewed for ${r.duration} more ${r.duration === 1 ? 'month' : 'months'}`);}}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></svg>
                      Renew
                    </button>
                    <button className="btn-mini accent" onClick={() => {
                    const q = window.buyoutQuote(a, r.duration);
                    const msg = `Pay ${q.remaining}€ to keep "${a.title}"?\n\nYou've paid ${q.rentPaid}€ in rent so far — we credit ${q.credit}€ of that toward the ${a.buy}€ buy price${q.capped ? ' (credit caps at 30% of the price)' : ''}.`;
                    if (confirm(msg)) {onBuyOut(i, a);ping(`🎉 You now own ${a.title}`);}
                  }}>
                      Keep it · {window.buyoutQuote(a, r.duration).remaining}€ left
                    </button>
                    <button className="btn-mini danger" onClick={() => {if (confirm(`Cancel rental of "${a.title}"? We'll email a prepaid return label.`)) {onCancel(i);ping(`↩ ${a.title} return label sent to your email`);}}}>
                      Cancel
                    </button>
                  </>
                }
                {!isPurchase && r.cancelled &&
                <span className="dim" style={{ fontSize: 12 }}>Return label emailed</span>
                }
                {isPurchase &&
                <button className="btn-mini" onClick={() => openItem(a.id)}>View order</button>
                }
              </div>
            </div>);

        })}
      </div>

      <div className="rentals-help">
        <div className="rh-card">
          <h3>Need to return something?</h3>
          <p>Every rental ships with a prepaid label tucked in the sleeve. Drop it at any post office — that's it.</p>
        </div>
        <div className="rh-card">
          <h3>Love it? Keep it.</h3>
          <p>Half your rent (up to 30% of the price) counts toward buying. Rent a 28€ record 3 months at 5€ and you'd owe ~20€ to own it forever.</p>
        </div>
        <div className="rh-card">
          <h3>Auto-reminders</h3>
          <p>We'll email you 5 days before each rental ends. Or add it to your calendar with one click.</p>
        </div>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </main>);

}

// ─────────── How It Works ───────────
function HowPage({ navigate }) {
  return (
    <main style={{ padding: '48px 60px 60px', maxWidth: 980, margin: '0 auto' }}>
      <h1 style={{ fontFamily: "'MuseoModerno',sans-serif", fontWeight: 700, fontSize: 56, margin: '0 0 18px', letterSpacing: '-1px' }}>How it works</h1>
      <p style={{ fontSize: 20, color: 'var(--fg-dim)', maxWidth: 640, lineHeight: 1.5, marginBottom: 50 }}>
        Play it twice is a circle. You rent a record, give it a good few weeks, then send it on to the next listener. Or — keep it. Many do.
      </p>
      <div style={{ display: 'grid', gap: 14 }}>
        {[
        ['Pick a record', 'Filter by genre, era or condition. Every record is graded by a real human listener, not a database lookup.'],
        ['Choose rent or buy', 'Rent from 1–12 months, or own outright. Switch a rental to a purchase anytime — we credit what you\'ve paid.'],
        ['We ship in 24h', 'Padded mailer, return label inside the sleeve. We pay shipping both ways.'],
        ['Play it. Then play it twice', 'Listen. Write a quick note for the next person if you want — they\'ll find it tucked in the sleeve.'],
        ['Send it home, or keep it', 'Drop the package at any post office, or hit "buy" in your dashboard. That\'s it.']].
        map(([h, p], i) =>
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 24, padding: '24px 0', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontFamily: "'MuseoModerno',sans-serif", fontWeight: 700, fontSize: 48, color: 'var(--accent)', lineHeight: 1 }}>{String(i + 1).padStart(2, '0')}</div>
            <div>
              <h3 style={{ fontFamily: "'MuseoModerno',sans-serif", fontWeight: 700, fontSize: 24, margin: '0 0 6px' }}>{h}</h3>
              <p style={{ margin: 0, color: 'var(--fg-dim)', fontSize: 16, lineHeight: 1.55 }}>{p}</p>
            </div>
          </div>
        )}
      </div>
      <div style={{ marginTop: 40 }}>
        <button className="btn" onClick={() => navigate('browse')}>Browse the shelf →</button>
      </div>
    </main>);

}

// ─────────── Saved (wishlist) ───────────
function SavedPage({ saved, navigate, openItem, onToggleSave }) {
  const items = saved.map((id) => window.getAlbum(id)).filter(Boolean);
  if (items.length === 0) {
    return (
      <main style={{ padding: 80, textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
        <div style={{ fontSize: 48, color: 'var(--accent)', marginBottom: 16 }}>♡</div>
        <h1 style={{ fontFamily: "'MuseoModerno',sans-serif", fontWeight: 700, fontSize: 36, marginBottom: 12 }}>Nothing saved yet</h1>
        <p className="dim">Tap the heart on any record to keep track of records you might want later.</p>
        <button className="btn" style={{ marginTop: 24 }} onClick={() => navigate('browse')}>Browse the shelf</button>
      </main>);

  }
  return (
    <main style={{ padding: '48px 60px 60px', maxWidth: 1100, margin: '0 auto' }}>
      <h1 style={{ fontFamily: "'MuseoModerno',sans-serif", fontWeight: 700, fontSize: 40, margin: '0 0 28px' }}>Saved records</h1>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {items.map((a) =>
        <div key={a.id} style={{ position: 'relative' }}>
            <VinylCard album={a} onClick={() => openItem(a.id)} />
            <button
            className="saved-remove"
            onClick={(e) => {e.stopPropagation();onToggleSave(a.id);}}
            aria-label="Remove from saved"
            title="Remove from saved">
            ♥</button>
          </div>
        )}
      </div>
    </main>);

}

// ─────────── Sell Your Vinyls (Vinted-style upload) ───────────
function SellPage({ navigate, openItem }) {
  const [draft, setDraft] = uS({
    title: '', artist: '', year: '',
    genre: 'Hip-Hop', condition: 'Like New', avail: 'available',
    listingMode: 'both', price: 5, buy: 25,
    desc: '', quote: '',
    coverImg: null, vinylImg: null
  });
  const [submitted, setSubmitted] = uS(false);
  const [touched, setTouched] = uS(false);

  const set = (k) => (v) => setDraft((d) => ({ ...d, [k]: v }));

  const handleFile = (key) => (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => setDraft((d) => ({ ...d, [key]: r.result }));
    r.readAsDataURL(f);
  };

  const valid = draft.title.trim() && draft.artist.trim() && draft.coverImg && (
  draft.listingMode === 'buy' || draft.price > 0) && (
  draft.listingMode === 'rent' || draft.buy > 0);

  const handleList = () => {
    setTouched(true);
    if (!valid) return;
    const id = `user-${Date.now()}`;
    // pick a fallback vinyl image based on the listing's genre
    const fallbacks = ['assets/vinyl-flower-boy.png', 'assets/vinyl-2.png', 'assets/vinyl-3.png', 'assets/vinyl-5.png', 'assets/vinyl-6.png', 'assets/vinyl-7.png', 'assets/vinyl-8.png', 'assets/vinyl-9.png', 'assets/vinyl-10.png', 'assets/vinyl-11.png', 'assets/vinyl-12.png'];
    const fallback = window.R(fallbacks[Math.floor(Math.random() * fallbacks.length)]);
    const album = {
      id,
      title: draft.title.trim(),
      artist: draft.artist.trim(),
      year: parseInt(draft.year) || new Date().getFullYear(),
      genre: draft.genre,
      condition: draft.condition,
      avail: 'available',
      price: parseInt(draft.price) || 5,
      buy: parseInt(draft.buy) || 25,
      listingMode: draft.listingMode,
      quote: draft.quote.trim(),
      desc: draft.desc.trim() || `Listed by a fellow collector. ${draft.condition} condition.`,
      cover: { img: draft.coverImg, vinyl: draft.vinylImg || fallback, accent: '#ed9907' },
      tracks: [],
      userListing: true,
      sellerName: 'You'
    };
    window.CATALOG.unshift(album);
    setSubmitted(true);
    setTimeout(() => openItem(id), 1600);
  };

  const previewAlbum = {
    ...draft,
    id: 'preview',
    title: draft.title || 'Your album title',
    artist: draft.artist || 'Artist name',
    year: draft.year || new Date().getFullYear(),
    cover: {
      img: draft.coverImg || null,
      vinyl: draft.vinylImg || window.R('assets/vinyl-flower-boy.png'),
      accent: '#ed9907'
    }
  };

  if (submitted) {
    return (
      <main style={{ padding: 80, textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
        <div className="success-icon" />
        <h1 style={{ fontFamily: "'MuseoModerno',sans-serif", fontWeight: 700, fontSize: 36, marginBottom: 12 }}>It's live.</h1>
        <p className="dim">"{draft.title}" is now on the shelf. Taking you to your listing…</p>
      </main>);

  }

  const P = window.PRICING;
  const sellerRental = 1 - P.RENTAL_FEE; // 0.80
  const sellerSale = 1 - P.SALE_FEE;     // 0.85
  const earnings = draft.listingMode === 'rent' ?
  `Up to ${Math.round(draft.price * 12 * sellerRental)}€ a year` :
  draft.listingMode === 'buy' ?
  `${Math.round(draft.buy * sellerSale)}€ when it sells` :
  `${Math.round(draft.price * 12 * sellerRental)}€/year renting · or ${Math.round(draft.buy * sellerSale)}€ if it sells`;

  return (
    <main className="sell-page">
      <div className="sell-hero">
        <div className="sell-hero-text">
          <span className="hero-eyebrow">Sell or rent out your records</span>
          <h1 className="sell-h1">Got vinyls collecting dust?</h1>
          <p className="sell-lead">List them on Play it twice — rent, sell, or both. We handle shipping labels, payments, and reminders. You keep <strong>80% of every rental</strong> and <strong>85% of each sale</strong>.</p>
          <div className="sell-stats">
            <div><div className="num">80%</div><div className="lbl">of rental income</div></div>
            <div><div className="num">85%</div><div className="lbl">of each sale</div></div>
            <div><div className="num">24h</div><div className="lbl">listings go live</div></div>
          </div>
        </div>
      </div>

      <div className="sell-grid">
        <div className="sell-form">
          <h2 className="sell-section-title">1. Photos</h2>
          <p className="sell-section-sub">Square images work best. The cover is required, the vinyl shot is optional — we'll generate one if you skip it.</p>
          <div className="dropzone-row">
            <Dropzone
              label="Album cover"
              hint="Front of the sleeve · required"
              image={draft.coverImg}
              onChange={handleFile('coverImg')}
              onClear={() => set('coverImg')(null)}
              error={touched && !draft.coverImg}
              shape="square" />
            
            <Dropzone
              label="Vinyl photo"
              hint="The disc, with label · optional"
              image={draft.vinylImg}
              onChange={handleFile('vinylImg')}
              onClear={() => set('vinylImg')(null)}
              shape="round" />
            
          </div>

          <h2 className="sell-section-title">2. The basics</h2>
          <div className="form-grid">
            <Field label="Album title" value={draft.title} onChange={set('title')} error={touched && !draft.title.trim()} span={2} placeholder="e.g. Blue Train" />
            <Field label="Artist" value={draft.artist} onChange={set('artist')} error={touched && !draft.artist.trim()} placeholder="e.g. John Coltrane" />
            <Field label="Year released" value={draft.year} onChange={(v) => set('year')(v.replace(/\D/g, '').slice(0, 4))} placeholder="1957" />
            <FieldSelect label="Genre" value={draft.genre} onChange={set('genre')} options={GENRES} />
            <FieldSelect label="Condition" value={draft.condition} onChange={set('condition')} options={CONDITIONS} />
          </div>
          <div className="condition-hint">
            <strong>{draft.condition}</strong> ·{' '}
            {draft.condition === 'Like New' ? 'Perfect condition, barely played.' :
            draft.condition === 'Gently Used' ? 'Minor signs of use, plays smoothly.' :
            'Visible wear, still sounds good with a few crackles.'}
          </div>

          <h2 className="sell-section-title">3. How do you want to list it?</h2>
          <div className="mode-row">
            {[
            ['rent', 'Rent only', 'Stays yours — they pay monthly to borrow it.'],
            ['buy', 'Sell only', 'One-time sale, the record changes hands.'],
            ['both', 'Rent or sell', 'Renters can also buy it out at the end (recommended).']].
            map(([id, name, desc]) =>
            <button
              key={id}
              className={`mode-card ${draft.listingMode === id ? 'active' : ''}`}
              onClick={() => set('listingMode')(id)}>
              
                <div className="mc-radio" />
                <div className="mc-name">{name}</div>
                <div className="mc-desc">{desc}</div>
              </button>
            )}
          </div>

          <h2 className="sell-section-title">4. Pricing</h2>
          <div className="form-grid">
            {(draft.listingMode === 'rent' || draft.listingMode === 'both') &&
            <Field
              label="Rental per month (€)"
              value={draft.price}
              onChange={(v) => set('price')(v.replace(/\D/g, '').slice(0, 3))}
              error={touched && draft.listingMode !== 'buy' && !draft.price}
              placeholder="5" />

            }
            {(draft.listingMode === 'buy' || draft.listingMode === 'both') &&
            <Field
              label="Buy price (€)"
              value={draft.buy}
              onChange={(v) => set('buy')(v.replace(/\D/g, '').slice(0, 4))}
              error={touched && draft.listingMode !== 'rent' && !draft.buy}
              placeholder="25" />

            }
          </div>
          <div className="earnings-card">
            <div className="ec-label">You'd earn</div>
            <div className="ec-value">{earnings}</div>
            <div className="ec-fine">Play it twice keeps {Math.round(P.RENTAL_FEE*100)}% of rentals and {Math.round(P.SALE_FEE*100)}% of sales to cover shipping, payments, and support. If a renter later buys your record, {Math.round(P.CREDIT_RATE*100)}% of the rent they paid (max {Math.round(P.CREDIT_CAP*100)}% of your price) comes off their buy price — the rest is yours.</div>
          </div>

          <h2 className="sell-section-title">5. Tell the story (optional)</h2>
          <div className="form-grid">
            <Field label="One-line quote" value={draft.quote} onChange={set('quote')} span={2} placeholder='e.g. "Sounds even better at midnight"' />
            <label className="field" style={{ gridColumn: 'span 2' }}>
              <span className="field-label">Description</span>
              <textarea
                value={draft.desc}
                onChange={(e) => set('desc')(e.target.value)}
                rows={4}
                placeholder="Why is this record special? Original pressing? Came with a poster? Heard it on a road trip?" />
              
            </label>
          </div>

          <div className="sell-submit-row">
            <button className="btn btn-ghost" onClick={() => navigate('home')}>Cancel</button>
            <button className="btn btn-rent" onClick={handleList} disabled={!valid && touched}>
              List my record →
            </button>
          </div>
          {touched && !valid &&
          <div className="error-msg" style={{ marginTop: 10 }}>
              Add a title, artist and cover photo at minimum — and a price for your chosen listing type.
            </div>
          }
        </div>

        <aside className="sell-preview">
          <div className="sell-preview-sticky">
            <div className="sell-preview-label">Live preview</div>
            <VinylCard album={previewAlbum} onClick={() => {}} />
            <div className="sell-tips">
              <h4>Tips for a great listing</h4>
              <ul>
                <li>Good light, square crop. The cover sells the record before the title does.</li>
                <li>Be honest about the condition. Returns are free, but trust isn't.</li>
                <li>Set rental at ~1/6 of the buy price to start. Adjust later.</li>
                <li>"Rent or sell" gets <strong>3× more views</strong> than rent-only.</li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </main>);

}

function Dropzone({ label, hint, image, onChange, onClear, error, shape }) {
  const ref = React.useRef(null);
  return (
    <div className={`dropzone ${error ? 'error' : ''} ${shape}`} onClick={() => ref.current && ref.current.click()}>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        onChange={onChange}
        style={{ display: 'none' }} />
      
      {image ?
      <>
          <img src={image} alt="" />
          <button className="dz-clear" onClick={(e) => {e.stopPropagation();onClear();}} aria-label="Remove">×</button>
        </> :

      <div className="dz-empty">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="9" cy="9" r="2" /><path d="M21 15l-5-5L5 21" /></svg>
          <div className="dz-label">{label}</div>
          <div className="dz-hint">{hint}</div>
        </div>
      }
    </div>);

}

Object.assign(window, { HomePage, BrowsePage, ItemPage, RentModal, RentalsPage, HowPage, SavedPage, SellPage });