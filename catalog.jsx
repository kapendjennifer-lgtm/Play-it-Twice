// catalog.jsx — vinyl data + cover art generator
// Original placeholder cover designs (typographic / geometric) — no copyrighted artwork.

const CATALOG = [
  {
    id: 'flower-boy', title: 'Flower Boy', artist: 'Tyler, The Creator', year: 2017,
    genre: 'Hip-Hop', condition: 'Like New', avail: 'available',
    price: 5, buy: 28,
    quote: 'A dreamy soundtrack for introspection and golden-hour bike rides',
    desc: 'One of Tyler\'s most honest and soft albums. It mixes calm beats with real feelings — the kind of music you listen to when you want to relax, think, or just feel something. Perfect for quiet days or walks with music in your ears.',
    cover: { img: 'assets/cover-flower-boy.png', vinyl: 'assets/vinyl-flower-boy.png', accent: '#e9a23a' },
    tracks: [['Foreword','3:14',1],['Where This Flower Blooms','3:14',1],['Sometimes...','0:36',1],['See You Again','3:00',1],['Who Dat Boy','3:25',1],['Pothole','3:56',1],['Garden Shed','3:43',1],['Boredom','5:20',2],['I Ain\'t Got Time!','3:26',2],['911 / Mr. Lonely','4:15',2],['Droppin\' Seeds','1:00',2],['November','3:45',2],['Glitter','3:44',2],['Enjoy Right Now, Today','3:56',2]],
  },
  {
    id: 'silk-sonic', title: 'An Evening with Silk Sonic', artist: 'Silk Sonic', year: 2021,
    genre: 'Soul/Funk', condition: 'Gently Used', avail: 'available', price: 4, buy: 24,
    quote: 'Velvet, brass and butter — every track a slow dance',
    desc: 'A retro-soul love letter that pulls you straight onto a 70s dancefloor. Lush strings, falsetto, and a swagger you won\'t shake off for days.',
    cover: { img: 'assets/cover-silk-sonic.png', vinyl: 'assets/vinyl-silk-sonic.png', accent: '#c97a3a' },
    tracks: [['Silk Sonic Intro','1:03',1],['Leave the Door Open','4:02',1],['Fly as Me','3:39',1],['After Last Night','4:09',1],['Smokin Out the Window','3:17',1],['Put On a Smile','4:15',2],['777','2:58',2],['Skate','3:23',2],['Blast Off','4:45',2]],
  },
  {
    id: 'because-the-internet', title: 'Because the Internet', artist: 'Childish Gambino', year: 2013,
    genre: 'Hip-Hop', condition: 'Like New', avail: 'available', price: 5, buy: 30,
    quote: 'A restless, panoramic record for online insomnia',
    desc: 'A genre-bending opus that ranges from minimalist piano sketches to maximalist trap bangers. Listen with headphones; the layers reward it.',
    cover: { img: 'assets/cover-childish-gambino.png', vinyl: 'assets/vinyl-5.png', accent: '#9c9fa3' },
    tracks: [['The Library (Intro)','0:05',1],['I. Crawl','3:29',1],['II. WORLDSTAR','4:05',1],['Dial Up','0:45',1],['I. The Worst Guys','3:40',1],['II. Shadows','3:52',1],['III. Telegraph Ave. ("Oakland" by Lloyd)','3:31',1],['IV. Sweatpants','3:01',1],['V. 3005','3:54',1],['Playing Around Before the Party Starts','0:54',1],['I. The Party','1:31',2],['II. No Exit','2:52',2],['Death by Numbers','0:44',2],['I. Flight of the Navigator','5:44',2],['II. Zealots of Stockholm [Free Information]','4:51',2],['III. Urn','1:13',2],['I. Pink Toes','3:27',2],['II. Earth: The Oldest Computer (The Last Night)','4:42',2],['III. Life: The Biggest Troll [Andrew Auernheimer]','5:42',2]],
  },
  {
    id: 'alligator-bites', title: 'Alligator Bites Never Heal', artist: 'Doechii', year: 2024,
    genre: 'Hip-Hop', condition: 'Like New', avail: 'available', price: 5, buy: 28,
    cover: { img: 'assets/cover-doechii.png', vinyl: 'assets/vinyl-8.png', accent: '#6bed07' },
    quote: 'A mixtape that bites back — sharp, theatrical, exhilarating',
    desc: 'Doechii at her most ferocious and free. Switches voices like outfits, lands every joke, and somehow makes the whole thing feel intimate.',
    tracks: [['Stanka Pooh','2:01',1],['Bullfrog','1:34',1],['Boiled Peanuts','2:01',1],['Denial Is a River','2:39',1],['Catfish','2:13',1],['Skipp','1:40',1],['Hide N Seek','2:29',1],['Bloom','2:13',1],['Wait','3:04',1],['Death Roll','2:19',1],['Profit','1:35',2],['Boom Bap','2:10',2],['Nissan Altima','2:06',2],['GTFO','2:40',2],['Huh!','2:16',2],['Slide','2:54',2],['Fireflies','4:25',2],['Beverly Hills','3:38',2],['Alligator Bites Never Heal','2:55',2]],
  },
  {
    id: 'songs-in-the-key', title: 'Songs in the Key of Life', artist: 'Stevie Wonder', year: 1976,
    genre: 'Soul', condition: 'Well-Loved', avail: 'reserved', price: 6, buy: 38,
    cover: { img: 'assets/cover-stevie.png', vinyl: 'assets/vinyl-7.png', accent: '#ed9907' },
    quote: 'The high-water mark of joy on record',
    desc: 'A sprawling double-album that contains multitudes: jazz, funk, ballads, kids singing, prayer. The kind of record you grow with for a lifetime.',
    tracks: [['Love\'s in Need of Love Today','7:05',1],['Have a Talk with God','2:42',1],['Village Ghetto Land','2:55',1],['Contusion','3:46',1],['Sir Duke','3:54',1],['I Wish','4:12',1],['Knocks Me Off My Feet','3:36',1],['Pastime Paradise','3:28',1],['Summer Soft','4:14',1],['Ordinary Pain','6:23',2],['Isn\'t She Lovely','6:34',2],['Joy Inside My Tears','6:30',2],['Black Man','8:29',2],['Ngiculela – Es una Historia – I Am Singing','3:48',2],['If It\'s Magic','3:12',2],['As','7:08',2],['Another Star','8:28',2]],
  },
  {
    id: 'currents', title: 'Currents', artist: 'Tame Impala', year: 2015,
    genre: 'Indie/Psych', condition: 'Like New', avail: 'available', price: 5, buy: 30,
    cover: { img: 'assets/cover-tame.png', vinyl: 'assets/vinyl-2.png', accent: '#d04a2a' },
    quote: 'A pop-psych slow-mo somersault',
    desc: 'Kevin Parker rebuilds himself in technicolor synths. Sweeps, washes, and one of the most cathartic basslines of the decade.',
    tracks: [['Let It Happen','7:47',1],['Nangs','1:47',1],['The Moment','4:15',1],['Yes I\'m Changing','4:30',1],['Eventually','5:19',1],['Gossip','0:55',1],['The Less I Know the Better','3:36',1],['Past Life','3:48',2],['Disciples','1:48',2],['\'Cause I\'m a Man','4:01',2],['Reality in Motion','4:12',2],['Love/Paranoia','3:05',2],['New Person, Same Old Mistakes','6:03',2]],
  },
  {
    id: 'happier-than-ever', title: 'Happier Than Ever', artist: 'Billie Eilish', year: 2021,
    genre: 'Pop', condition: 'Like New', avail: 'available', price: 5, buy: 28,
    cover: { img: 'assets/cover-billie.png', vinyl: 'assets/vinyl-12.png', accent: '#8b6a3a' },
    quote: 'Whispered confessions that hit like a kick drum',
    desc: 'Where vulnerability meets bite. The title track alone is worth the price of admission.',
    tracks: [['Getting Older','4:04',1],['I Didn\'t Change My Number','2:38',1],['Billie Bossa Nova','3:16',1],['my future','3:30',1],['Oxytocin','3:30',1],['GOLDWING','2:31',1],['Lost Cause','3:32',1],['Halley\'s Comet','3:54',1],['Not My Responsibility','3:47',2],['OverHeated','3:34',2],['Everybody Dies','3:26',2],['Your Power','4:05',2],['NDA','3:15',2],['Therefore I Am','2:54',2],['Happier Than Ever','4:58',2],['Male Fantasy','3:14',2]],
  },
  {
    id: 'ctrl', title: 'SOS', artist: 'SZA', year: 2022,
    genre: 'R&B', condition: 'Gently Used', avail: 'available', price: 4, buy: 24,
    cover: { img: 'assets/cover-sza.png', vinyl: 'assets/vinyl-3.png', accent: '#6e85a0' },
    quote: 'Twenty-three songs of revenge fantasies and soft confessions',
    desc: 'SZA\'s second album moves between R&B, pop-punk and acoustic ballads, with Kill Bill, Snooze and Good Days among its 23 tracks. Pressed as a double LP.',
    tracks: [['SOS','1:57',1],['Kill Bill','2:33',1],['Seek & Destroy','3:23',1],['Low','3:01',1],['Love Language','3:03',1],['Blind','2:30',1],['Used (feat. Don Toliver)','2:26',1],['Snooze','3:21',1],['Notice Me','2:40',1],['Gone Girl','4:04',1],['Smoking on My Ex Pack','1:23',1],['Ghost in the Machine (feat. Phoebe Bridgers)','3:38',1],['F2F','3:05',2],['Nobody Gets Me','3:00',2],['Conceited','2:31',2],['Special','2:38',2],['Too Late','2:44',2],['Far','3:00',2],['Shirt','3:01',2],['Open Arms (feat. Travis Scott)','3:59',2],['I Hate U','2:53',2],['Good Days','4:38',2],['Forgiveless (feat. Ol\' Dirty Bastard)','2:21',2]],
  },
  {
    id: 'lauryn-hill', title: 'The Miseducation of Lauryn Hill', artist: 'Lauryn Hill', year: 1998,
    genre: 'Hip-Hop / Soul', condition: 'Well-Loved', avail: 'available', price: 5, buy: 32,
    cover: { img: 'assets/cover-lauryn.png', vinyl: 'assets/vinyl-9.png', accent: '#c0843f' },
    quote: 'Wisdom set to a backbeat',
    desc: 'Generational. Effortlessly bridges hip-hop, soul and reggae, with a moral clarity nobody has matched since.',
    tracks: [['Intro','0:47',1],['Lost Ones','5:33',1],['Ex-Factor','5:26',1],['To Zion','6:09',1],['Doo Wop (That Thing)','5:20',1],['Superstar','4:57',1],['Final Hour','4:16',1],['When It Hurts So Bad','5:42',1],['I Used to Love Him','5:39',2],['Forgive Them Father','5:15',2],['Every Ghetto, Every City','5:14',2],['Nothing Even Matters','5:50',2],['Everything Is Everything','4:53',2],['The Miseducation of Lauryn Hill','4:17',2],['Can\'t Take My Eyes Off of You','3:42',2],['Tell Him','4:41',2]],
  },
  {
    id: 'pink-floyd-moon', title: 'The Dark Side of the Moon', artist: 'Pink Floyd', year: 1973,
    genre: 'Prog Rock', condition: 'Gently Used', avail: 'available', price: 6, buy: 40,
    cover: { img: 'assets/cover-pink-floyd.png', vinyl: 'assets/vinyl-6.png', accent: '#ff4444' },
    quote: 'A prism in vinyl form',
    desc: 'The album to test a stereo with. Every drum hit, every breath, every footstep is engineered to feel inevitable.',
    tracks: [['Speak to Me','1:07',1],['Breathe (In the Air)','2:49',1],['On the Run','3:45',1],['Time','6:53',1],['The Great Gig in the Sky','4:44',1],['Money','6:23',2],['Us and Them','7:49',2],['Any Colour You Like','3:26',2],['Brain Damage','3:46',2],['Eclipse','2:12',2]],
  },
  {
    id: 'kendrick-tpab', title: 'DAMN', artist: 'Kendrick Lamar', year: 2017,
    genre: 'Hip-Hop', condition: 'Like New', avail: 'available', price: 5, buy: 32,
    cover: { img: 'assets/cover-kendrick.png', vinyl: 'assets/vinyl-7.png', accent: '#f0c060' },
    quote: 'Wickedness or weakness — fourteen tracks to decide',
    desc: 'Kendrick Lamar\'s fourth album, with HUMBLE., DNA. and LOYALTY. It won the 2018 Pulitzer Prize for Music, a first for a hip-hop record.',
    tracks: [['BLOOD.','1:58',1],['DNA.','3:05',1],['YAH.','2:40',1],['ELEMENT.','3:28',1],['FEEL.','3:34',1],['LOYALTY. (feat. Rihanna)','3:47',1],['PRIDE.','4:35',1],['HUMBLE.','2:57',2],['LUST.','5:08',2],['LOVE. (feat. Zacari)','3:31',2],['XXX. (feat. U2)','4:14',2],['FEAR.','6:54',2],['GOD.','4:08',2],['DUCKWORTH.','4:08',2]],
  },
  {
    id: 'sade-promise', title: 'Promise', artist: 'Sade', year: 1985,
    genre: 'Soul / Jazz', condition: 'Gently Used', avail: 'available', price: 4, buy: 24,
    cover: { img: 'assets/cover-sade.png', vinyl: 'assets/vinyl-10.png', accent: '#e6c98a' },
    quote: 'Smoke and silk and patience',
    desc: 'Late-night listening. The bass is round, the saxophone is restrained, Sade glides above it all.',
    tracks: [['Is It a Crime','6:18',1],['The Sweetest Taboo','4:35',1],['War of the Hearts','6:47',1],['Jezebel','5:30',1],['Mr Wrong','2:50',1],['Never as Good as the First Time','5:01',2],['Fear','4:05',2],['Tar Baby','3:58',2],['Maureen','4:22',2]],
  },
  {
    id: 'amy-back-to-black', title: 'Back to Black', artist: 'Amy Winehouse', year: 2006,
    genre: 'Soul', condition: 'Like New', avail: 'reserved', price: 5, buy: 28,
    cover: { img: 'assets/cover-amy.png', vinyl: 'assets/vinyl-11.png', accent: '#e6dcc0' },
    quote: 'A voice you can\'t teach',
    desc: 'A modern soul classic with bite. The Dap-Kings band, Mark Ronson production, and one of the most singular voices in pop.',
    tracks: [['Rehab','3:34',1],['You Know I\'m No Good','4:16',1],['Me & Mr Jones','2:33',1],['Just Friends','3:13',1],['Back to Black','4:01',1],['Love Is a Losing Game','2:35',1],['Tears Dry on Their Own','3:06',2],['Wake Up Alone','3:42',2],['Some Unholy War','2:22',2],['He Can Only Hold Her','2:46',2],['Addicted','2:45',2]],
  },
  {
    id: 'futuresex', title: 'FutureSex / LoveSounds', artist: 'Justin Timberlake', year: 2006,
    genre: 'Pop / R&B', condition: 'Gently Used', avail: 'available', price: 4, buy: 22,
    cover: { img: 'assets/cover-justin.png', vinyl: 'assets/vinyl-5.png', accent: '#dadada' },
    quote: 'The pop record that took its time',
    desc: 'Long synth runs, sticky hooks, and Timbaland at his most playful. Cliché says ten minute pop songs are indulgent — this one says try again.',
    tracks: [['FutureSex / LoveSound','4:01',1],['SexyBack (feat. Timbaland)','4:02',1],['Sexy Ladies / Let Me Talk to You (Prelude)','5:32',1],['My Love (feat. T.I.)','4:36',1],['LoveStoned / I Think She Knows (Interlude)','7:24',1],['What Goes Around... / ...Comes Around (Interlude)','7:28',1],['Chop Me Up (feat. Timbaland & Three 6 Mafia)','5:04',2],['Damn Girl (feat. will.i.am)','5:12',2],['Summer Love / Set the Mood (Prelude)','6:24',2],['Until the End of Time','5:22',2],['Losing My Way','5:22',2],['(Another Song) All Over Again','5:45',2]],
  },
  {
    id: 'brandy', title: 'Never Say Never', artist: 'Brandy', year: 1998,
    genre: 'R&B', condition: 'Gently Used', avail: 'available', price: 4, buy: 22,
    cover: { img: 'assets/cover-brandy.png', vinyl: 'assets/vinyl-1.png', accent: '#7a3a86' },
    quote: 'A blueprint for layered pop-R&B',
    desc: 'Lush stacked vocals, Rodney Jerkins production, and a teenager casually pulling off duets with Monica that we\'re still talking about.',
    tracks: [['Intro','0:51',1],['Angel in Disguise','4:48',1],['The Boy Is Mine (with Monica)','4:55',1],['Learn the Hard Way','4:51',1],['Almost Doesn\'t Count','3:37',1],['Top of the World (feat. Mase)','4:41',1],['U Don\'t Know Me (Like U Used To)','4:29',1],['Never Say Never','5:10',1],['Truthfully','4:57',2],['Have You Ever?','4:36',2],['Put That on Everything','4:51',2],['In the Car (Interlude)','1:10',2],['Happy','4:06',2],['One Voice','4:07',2],['Tomorrow','5:21',2],['(Everything I Do) I Do It for You','4:10',2]],
  },
];

window.R = function(p) { if (!p || p.startsWith('data:')) return p; const id = 'a_' + p.replace(/^assets\//,'').replace(/\.png$/,'').replace(/[^a-zA-Z0-9]/g,'_'); return (window.__resources && window.__resources[id]) || p; };
CATALOG.forEach(a => { a.cover.img = window.R(a.cover.img); a.cover.vinyl = window.R(a.cover.vinyl); });
window.CATALOG = CATALOG;
window.getAlbum = function(id) { return CATALOG.find(a => a.id === id); };

// ─── Marketplace pricing model (5+1) ───────────────────────────────
// Platform is a marketplace: it never owns inventory, it takes commission.
//   • Rentals: platform keeps RENTAL_FEE of each cycle, seller gets the rest.
//   • Sales:   platform keeps SALE_FEE of the sale price.
// Buyout credit is a *capped, partial* renter perk funded by the seller:
//   credit = min( CREDIT_RATE × rent_paid , CREDIT_CAP × buy_price )
// so a record can never be ground down to free, and the seller always nets
// a real sale on top of the rental income already earned.
window.PRICING = {
  RENTAL_FEE: 0.20,   // platform cut of each rental cycle
  SALE_FEE:   0.15,   // platform cut of each sale
  CREDIT_RATE: 0.50,  // share of rent paid that counts toward a buyout
  CREDIT_CAP:  0.30,  // max credit as a share of buy price
};

// Returns the economics of keeping a rented record.
window.buyoutQuote = function(album, monthsPaid) {
  const P = window.PRICING;
  const rentPaid = album.price * monthsPaid;
  const rawCredit = rentPaid * P.CREDIT_RATE;
  const maxCredit = album.buy * P.CREDIT_CAP;
  const credit = Math.round(Math.min(rawCredit, maxCredit));
  const remaining = Math.max(0, album.buy - credit);
  return { rentPaid, credit, remaining, capped: rawCredit > maxCredit };
};

// ─── CoverArt: real cover image (or empty-state placeholder) ───
function CoverArt({ album }) {
  if (!album.cover.img) {
    return (
      <div className="cover-empty">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/></svg>
        <span>Cover preview</span>
      </div>
    );
  }
  return (
    <img
      src={album.cover.img}
      alt={`${album.title} cover`}
      className="cover-img"
      draggable={false}
    />
  );
}

function VinylImage({ album, className = 'vinyl-img' }) {
  return (
    <img
      src={album.cover.vinyl}
      alt=""
      aria-hidden="true"
      className={className}
      draggable={false}
    />
  );
}

window.CoverArt = CoverArt;
window.VinylImage = VinylImage;
