import { useEffect, useState } from "react";
import languages from "./i18n.js";
const works = ["Lâmina Sussurro #014", "Kunai Flor", "Coleção Serenidade"];
const saved = (key, fallback) => {
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
};
export default function App() {
  const [lang, setLang] = useState(() =>
    saved(
      "lang",
      location.hostname.replace(/^www\./, "") === "zenweaponnft.com"
        ? "en"
        : "pt",
    ),
  );
  const [theme, setTheme] = useState(() => saved("theme", "dark"));
  const [feed, setFeed] = useState([]),
    [message, setMessage] = useState(""),
    [busy, setBusy] = useState(false);
  const t = languages[lang] || languages.pt;
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("lang", lang);
      localStorage.setItem("theme", theme);
    } catch {}
  }, [lang, theme]);
  useEffect(() => {
    let active = true;
    fetch("/api/feed")
      .then((r) => {
        if (!r.ok) throw Error();
        return r.json();
      })
      .then((d) => {
        if (active) setFeed(d.pulse);
      })
      .catch(() => {
        if (active) setFeed(null);
      });
    return () => {
      active = false;
    };
  }, []);
  async function act(endpoint, body = {}) {
    setBusy(true);
    setMessage("");
    try {
      const r = await fetch("/api/" + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const d = await r.json();
      setMessage(
        d.error === "AUTH_NOT_CONFIGURED" ? t[15] : r.ok ? t[13] : t[14],
      );
    } catch {
      setMessage(t[14]);
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <header>
        <a className="brand" href="#">
          {lang === "en" ? (
            <>
              <span className="zen" tabIndex="0">
                <span>ZEN</span>
                <strong>WEAPON</strong>
              </span>{" "}
              NFT
            </>
          ) : (
            <>
              Arma<span>Zen</span>NFT
            </>
          )}
        </a>
        <nav>
          <a href="#garden">{t[4]}</a>
          <a href="#showcase">{t[5]}</a>
          <a href="#pulse">{t[6]}</a>
        </nav>
        <div className="settings">
          <button
            aria-label={t[10]}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? "☀" : "☾"}
          </button>
          <select
            aria-label={t[11]}
            value={lang}
            onChange={(e) => {
              setLang(e.target.value);
              setMessage("");
            }}
          >
            {Object.entries(languages).map(([key, row]) => (
              <option key={key} value={key}>
                {row[0]}
              </option>
            ))}
          </select>
        </div>
      </header>
      <main className="min-w-0">
        <section className="hero" id="garden">
          <div className="hero-copy">
            <p className="eyebrow">ARMAZENNFT = ZENWEAPONNFT</p>
            <h1>{t[2]}</h1>
            <p className="manifesto">{t[1]}</p>
            <p>{t[3]}</p>
            <a className="primary" href="#showcase">
              {t[17]} ↗
            </a>
          </div>
          <div className="garden-art" aria-hidden="true">
            <div className="orbit one" />
            <div className="orbit two" />
            <div className="orbit three" />
            <span>✳</span>
            <p>ALMA ZEN · 001</p>
          </div>
        </section>
        <section id="showcase">
          <div className="section-title">
            <h2>{t[5]}</h2>
            <p>{t[18]}</p>
          </div>
          <div className="works">
            {works.map((work, i) => (
              <article key={work}>
                <div className={"art art-" + i} aria-hidden="true">
                  <span>{["✧", "✳", "◉"][i]}</span>
                  <small>0{i + 1} / ZEN</small>
                </div>
                <div className="card-copy">
                  <p className="eyebrow">ARMAZEN · BIOGRAPHIC ART</p>
                  <h3>{work}</h3>
                  <div className="actions">
                    <button
                      disabled={busy}
                      onClick={() => act("biscuit", { amount: 1 })}
                    >
                      🍪 {t[7]}
                    </button>
                    <button
                      disabled={busy}
                      onClick={() => act("offer", { artwork: work })}
                    >
                      {t[8]} ↗
                    </button>
                    <button
                      disabled={busy}
                      onClick={() => act("exchange", { artwork: work })}
                    >
                      {t[9]} ⇄
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="pulse" id="pulse">
          <h2>
            {t[6]} <span className="dot" />
          </h2>
          {feed === null ? (
            <p>{t[14]}</p>
          ) : feed.length ? (
            feed.map((item, i) => (
              <p className="feed-row" key={item}>
                <span>0{i + 1}</span>
                {item}
                <span>✦</span>
              </p>
            ))
          ) : (
            <p>{t[16]}</p>
          )}
        </section>
        <section className="access">
          <p>{t[12]}</p>
          <div className="actions">
            {["google", "flow"].map((provider) => (
              <button
                disabled={busy}
                key={provider}
                onClick={() => act("auth/" + provider)}
              >
                {t[19]} {provider === "google" ? "Google" : "Flow"}
              </button>
            ))}
          </div>
        </section>
        <p className="status" role="status" aria-live="polite">
          {busy ? t[16] : message}
        </p>
      </main>
      <footer>
        <span>ArmaZenNFT = ZenWeaponNFT</span>
        <span>{t[1]}</span>
      </footer>
    </>
  );
}
