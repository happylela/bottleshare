aimport { useState } from "react";

const listings = [
  { id: 1, name: "Maria S.", location: "Rosenheim Innenstadt", count: 12, type: "give", time: "vor 5 Min.", emoji: "🍾", note: "Verschiedene Glasflaschen, bitte heute noch abholen!" },
  { id: 2, name: "Thomas K.", location: "Rosenheim West", count: 8, type: "give", time: "vor 23 Min.", emoji: "🧴", note: "Plastikflaschen vom Kindergeburtstag" },
  { id: 3, name: "Anonym", location: "Rosenheim Süd", count: 24, type: "give", time: "vor 1 Std.", emoji: "🍺", note: "Bierflaschen vom Grillen, gerne mitnehmen!" },
  { id: 4, name: "Sandra L.", location: "Kolbermoor", count: 6, type: "give", time: "vor 2 Std.", emoji: "🥤", note: "Wasserflaschen, sauber gespült" },
];

const stats = [
  { label: "Flaschen verschenkt", value: "12.480", emoji: "🍾" },
  { label: "Glückliche Abholer", value: "3.241", emoji: "😊" },
  { label: "Städte aktiv", value: "47", emoji: "📍" },
];

export default function BottleShare() {
  const [activeTab, setActiveTab] = useState("home");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", location: "", count: "", note: "", anonym: false });
  const [submitted, setSubmitted] = useState(false);
  const [contactId, setContactId] = useState(null);

  const handleSubmit = () => {
    setSubmitted(true);
    setShowForm(false);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div style={{
      fontFamily: "'Nunito', 'Quicksand', sans-serif",
      background: "linear-gradient(135deg, #fff8f0 0%, #fff3e8 50%, #fef0fb 100%)",
      minHeight: "100vh",
      maxWidth: 480,
      margin: "0 auto",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Pacifico&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .card { background: white; border-radius: 20px; padding: 16px; margin-bottom: 12px; box-shadow: 0 4px 20px rgba(255,140,60,0.10); transition: transform 0.15s; }
        .card:hover { transform: translateY(-2px); }
        .btn-primary { background: linear-gradient(135deg, #ff8c3c, #ff5fa0); color: white; border: none; border-radius: 50px; padding: 14px 28px; font-family: 'Nunito', sans-serif; font-weight: 800; font-size: 16px; cursor: pointer; box-shadow: 0 4px 15px rgba(255,95,160,0.3); transition: transform 0.15s, box-shadow 0.15s; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(255,95,160,0.4); }
        .btn-secondary { background: white; color: #ff8c3c; border: 2px solid #ff8c3c; border-radius: 50px; padding: 12px 24px; font-family: 'Nunito', sans-serif; font-weight: 700; font-size: 15px; cursor: pointer; transition: all 0.15s; }
        .btn-secondary:hover { background: #fff3e8; }
        .tab { flex: 1; padding: 12px; border: none; background: transparent; font-family: 'Nunito', sans-serif; font-weight: 700; font-size: 13px; cursor: pointer; color: #bbb; transition: color 0.2s; display: flex; flex-direction: column; align-items: center; gap: 3px; }
        .tab.active { color: #ff8c3c; }
        .badge { background: linear-gradient(135deg, #ff8c3c, #ff5fa0); color: white; border-radius: 50px; padding: 3px 10px; font-size: 12px; font-weight: 700; }
        .input { width: 100%; padding: 12px 16px; border: 2px solid #ffe0c8; border-radius: 14px; font-family: 'Nunito', sans-serif; font-size: 15px; outline: none; transition: border-color 0.2s; background: #fff9f5; }
        .input:focus { border-color: #ff8c3c; }
        .toast { position: fixed; top: 20px; left: 50%; transform: translateX(-50%); background: linear-gradient(135deg, #ff8c3c, #ff5fa0); color: white; padding: 14px 28px; border-radius: 50px; font-weight: 800; font-size: 15px; z-index: 9999; box-shadow: 0 8px 30px rgba(255,95,160,0.4); animation: slideDown 0.3s ease; }
        @keyframes slideDown { from { top: -60px; opacity: 0; } to { top: 20px; opacity: 1; } }
        .bubble { position: absolute; border-radius: 50%; opacity: 0.07; animation: float 6s ease-in-out infinite; }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        .listing-contact { background: linear-gradient(135deg, #ff8c3c20, #ff5fa020); border: 2px solid #ff8c3c40; border-radius: 14px; padding: 12px; margin-top: 10px; }
      `}</style>

      {/* Decorative bubbles */}
      <div className="bubble" style={{ width: 200, height: 200, background: "#ff8c3c", top: -60, right: -60, animationDelay: "0s" }} />
      <div className="bubble" style={{ width: 150, height: 150, background: "#ff5fa0", bottom: 100, left: -50, animationDelay: "2s" }} />
      <div className="bubble" style={{ width: 100, height: 100, background: "#ffd93d", top: 300, right: -20, animationDelay: "4s" }} />

      {submitted && <div className="toast">🎉 Danke! Dein Inserat ist online!</div>}

      {/* Header */}
      <div style={{ padding: "24px 20px 12px", position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontFamily: "'Pacifico', cursive", fontSize: 28, color: "#ff8c3c", lineHeight: 1 }}>
              Bottle<span style={{ color: "#ff5fa0" }}>Share</span>
            </div>
            <div style={{ fontSize: 12, color: "#aaa", fontWeight: 600, marginTop: 2 }}>Pfand verschenken. Freude schenken. 🍾</div>
          </div>
          <button className="btn-primary" style={{ padding: "10px 18px", fontSize: 13 }} onClick={() => setShowForm(true)}>
            + Inserieren
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "0 20px", paddingBottom: 80 }}>

        {activeTab === "home" && (
          <>
            {/* Hero */}
            <div style={{ background: "linear-gradient(135deg, #ff8c3c, #ff5fa0)", borderRadius: 24, padding: "24px 20px", marginBottom: 20, color: "white", position: "relative", overflow: "hidden" }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>🍾</div>
              <div style={{ fontWeight: 900, fontSize: 20, lineHeight: 1.3, marginBottom: 6 }}>Du hast Pfandflaschen?<br />Jemand freut sich!</div>
              <div style={{ fontSize: 14, opacity: 0.9, lineHeight: 1.5 }}>Einfach inserieren – kostenlos, anonym, sofort. Wer abholt, freut sich. Du auch.</div>
              <div style={{ position: "absolute", right: -20, top: -20, fontSize: 100, opacity: 0.1 }}>♻️</div>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
              {stats.map((s, i) => (
                <div key={i} style={{ flex: 1, background: "white", borderRadius: 16, padding: "12px 8px", textAlign: "center", boxShadow: "0 4px 15px rgba(255,140,60,0.08)" }}>
                  <div style={{ fontSize: 22 }}>{s.emoji}</div>
                  <div style={{ fontWeight: 900, fontSize: 16, color: "#ff8c3c" }}>{s.value}</div>
                  <div style={{ fontSize: 10, color: "#aaa", fontWeight: 600, lineHeight: 1.3 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Listings */}
            <div style={{ fontWeight: 800, fontSize: 17, color: "#333", marginBottom: 12 }}>📍 Aktuelle Angebote in deiner Nähe</div>
            {listings.map(l => (
              <div key={l.id} className="card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <div style={{ fontSize: 36, lineHeight: 1 }}>{l.emoji}</div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 15, color: "#333" }}>{l.name}</div>
                      <div style={{ fontSize: 13, color: "#999", fontWeight: 600 }}>📍 {l.location}</div>
                      <div style={{ fontSize: 12, color: "#ccc", marginTop: 2 }}>{l.time}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span className="badge">{l.count} Flaschen</span>
                  </div>
                </div>
                <div style={{ marginTop: 10, fontSize: 13, color: "#777", lineHeight: 1.5, background: "#fff9f5", borderRadius: 10, padding: "8px 12px" }}>
                  "{l.note}"
                </div>
                {contactId === l.id ? (
                  <div className="listing-contact">
                    <div style={{ fontWeight: 800, color: "#ff8c3c", fontSize: 14, marginBottom: 4 }}>✅ Anfrage gesendet!</div>
                    <div style={{ fontSize: 13, color: "#888" }}>Der Geber wird benachrichtigt und meldet sich bei dir.</div>
                  </div>
                ) : (
                  <button className="btn-primary" style={{ width: "100%", marginTop: 12, padding: "11px", fontSize: 14 }}
                    onClick={() => setContactId(l.id)}>
                    🙋 Ich hole das ab!
                  </button>
                )}
              </div>
            ))}
          </>
        )}

        {activeTab === "give" && (
          <>
            <div style={{ fontWeight: 800, fontSize: 20, color: "#333", marginBottom: 6 }}>Flaschen verschenken 🎁</div>
            <div style={{ fontSize: 14, color: "#999", marginBottom: 20 }}>Trag dein Angebot ein – komplett kostenlos und anonym wenn du möchtest.</div>
            <div className="card">
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "#888", marginBottom: 6 }}>DEIN NAME (optional)</div>
                  <input className="input" placeholder="z.B. Maria oder anonym lassen" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "#888", marginBottom: 6 }}>STADTTEIL / ORT</div>
                  <input className="input" placeholder="z.B. Rosenheim Innenstadt" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "#888", marginBottom: 6 }}>ANZAHL FLASCHEN</div>
                  <input className="input" type="number" placeholder="z.B. 12" value={formData.count} onChange={e => setFormData({...formData, count: e.target.value})} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "#888", marginBottom: 6 }}>KURZE NOTIZ</div>
                  <textarea className="input" rows={3} placeholder="Was für Flaschen? Wann abholen?" value={formData.note} onChange={e => setFormData({...formData, note: e.target.value})} style={{ resize: "none" }} />
                </div>
                <button className="btn-primary" onClick={handleSubmit}>🍾 Jetzt kostenlos inserieren</button>
              </div>
            </div>
          </>
        )}

        {activeTab === "about" && (
          <>
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ fontFamily: "'Pacifico', cursive", fontSize: 36, color: "#ff8c3c" }}>Bottle<span style={{ color: "#ff5fa0" }}>Share</span></div>
              <div style={{ fontSize: 60, margin: "16px 0" }}>🍾❤️</div>
              <div style={{ fontWeight: 800, fontSize: 18, color: "#333", marginBottom: 10 }}>Eine Idee mit Herz</div>
              <div style={{ fontSize: 14, color: "#888", lineHeight: 1.8, marginBottom: 20 }}>
                Jeden Tag suchen Menschen im Pfandbereich nach Flaschen – und andere sind froh, wenn jemand sie mitnimmt. BottleShare bringt beide zusammen. Einfach, kostenlos, menschlich.
              </div>
            </div>
            <div className="card" style={{ background: "linear-gradient(135deg, #fff8f0, #fff0fb)", border: "2px solid #ffe0c8" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>💡</div>
                <div style={{ fontWeight: 800, fontSize: 15, color: "#333", marginBottom: 6 }}>Eine Idee von</div>
                <div style={{ fontWeight: 900, fontSize: 18, color: "#ff8c3c" }}>Benjamin Attenberger</div>
                <div style={{ fontSize: 13, color: "#aaa", marginTop: 4, fontWeight: 600 }}>presented by LELA World</div>
                <div style={{ marginTop: 14, fontSize: 13, color: "#888", lineHeight: 1.6 }}>
                  "Weil kleine Gesten die Welt ein bisschen besser machen."
                </div>
              </div>
            </div>
            <div className="card">
              <div style={{ fontWeight: 800, fontSize: 15, color: "#333", marginBottom: 12 }}>So funktioniert's</div>
              {[
                { emoji: "📝", title: "Inserat erstellen", text: "Einfach eintragen wie viele Flaschen du hast & wo du bist." },
                { emoji: "📍", title: "Jemand sieht's", text: "Andere in deiner Nähe sehen dein Angebot sofort." },
                { emoji: "🤝", title: "Abholung klären", text: "Kurze Nachricht – fertig! Pfand geht an jemanden, der sich freut." },
              ].map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: i < 2 ? 14 : 0 }}>
                  <div style={{ fontSize: 30, minWidth: 40 }}>{step.emoji}</div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 14, color: "#333" }}>{step.title}</div>
                    <div style={{ fontSize: 13, color: "#888", marginTop: 2 }}>{step.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Bottom nav */}
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, background: "white", borderTop: "1px solid #f0f0f0", display: "flex", boxShadow: "0 -4px 20px rgba(0,0,0,0.06)" }}>
        {[
          { id: "home", emoji: "🏠", label: "Entdecken" },
          { id: "give", emoji: "🍾", label: "Verschenken" },
          { id: "about", emoji: "💡", label: "Über uns" },
        ].map(t => (
          <button key={t.id} className={`tab ${activeTab === t.id ? "active" : ""}`} onClick={() => setActiveTab(t.id)}>
            <span style={{ fontSize: 22 }}>{t.emoji}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
