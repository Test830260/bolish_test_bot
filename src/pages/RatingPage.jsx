import { useState } from "react";
const LB_DATA = [
  { n: "Asilbek T.", sc: 5840 },
  { n: "Malika R.", sc: 5210 },
  { n: "Jasur K.", sc: 4890 },
  { n: "Nodira S.", sc: 4100 },
  { n: "Otabek M.", sc: 3980 },
  { n: "Sarvar N.", sc: 3750 },
  { n: "Dilnoza A.", sc: 3620 },
  { n: "Bobur T.", sc: 3410 },
  { n: "Feruza K.", sc: 3200 },
  { n: "Ulugbek M.", sc: 3050 },
  { n: "Zulfiya R.", sc: 2940 },
  { n: "Sherzod B.", sc: 2810 },
  { n: "Kamola O.", sc: 2700 },
  { n: "Doniyor A.", sc: 2590 },
  { n: "Maftuna S.", sc: 2480 },
];
for (let i = 16; i <= 100; i++) LB_DATA.push({ n: "O'yinchi " + i, sc: Math.max(100, 2400 - i * 22) });

const MEDALS = ["🥇", "🥈", "🥉"];

export default function RatingPage({ navigate, goBack }) {
  const [tab, setTab] = useState("all");
  const data = tab === "weekly"
    ? [...LB_DATA].map(p => ({ ...p, sc: Math.floor(p.sc * 0.3) })).sort((a, b) => b.sc - a.sc)
    : LB_DATA;

  return (
    <div style={{ paddingBottom: "90px" }}>
      {/* TOPBAR */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 18px", background: "#10101a", borderBottom: "1px solid #28283a", position: "sticky", top: 0, zIndex: 10 }}>
        <div onClick={goBack} style={{ width: 38, height: 38, borderRadius: "50%", background: "#181824", border: "1px solid #28283a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, cursor: "pointer" }}>←</div>
        <div style={{ fontSize: 18, fontWeight: 700, flex: 1 }}>🏆 Reyting</div>
      </div>

      {/* HEADER */}
      <div style={{ padding: "24px 20px 20px", background: "linear-gradient(160deg,#12121e,#0e0e18)" }}>
        <div style={{ fontSize: 26, fontWeight: 900 }}>Top 100</div>
        <div style={{ fontSize: 13, color: "#a0a0c0", marginTop: 4 }}>Eng yaxshi o'yinchilar reytingi</div>
      </div>

      {/* MY RANK */}
      <div style={{ margin: "16px 20px 0", background: "linear-gradient(135deg,rgba(245,200,66,.1),rgba(232,151,58,.06))", border: "1px solid rgba(245,200,66,.3)", borderRadius: 18, padding: 16, display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ fontSize: 28, fontWeight: 900, color: "#f5c842", fontFamily: "'JetBrains Mono',monospace", width: 48, textAlign: "center" }}>#—</div>
        <div style={{ width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg,#f5c842,#e8973a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800, color: "#08080e", flexShrink: 0 }}>S</div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700 }}>Siz</div>
          <div style={{ fontSize: 12, color: "#a0a0c0", marginTop: 2 }}>Sizning o'rningiz</div>
        </div>
        <div style={{ marginLeft: "auto", textAlign: "right" }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#f5c842", fontFamily: "'JetBrains Mono',monospace" }}>1200</div>
          <div style={{ fontSize: 11, color: "#a0a0c0" }}>ball</div>
        </div>
      </div>

      {/* TABS */}
      <div style={{ display: "flex", gap: 8, padding: "16px 20px 0" }}>
        {[
          { key: "all", label: "Umumiy" },
          { key: "sudoku", label: "Sudoku" },
          { key: "weekly", label: "Haftalik" },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{ flex: 1, padding: 10, borderRadius: 12, border: tab === t.key ? "1px solid rgba(245,200,66,.4)" : "1px solid #28283a", background: tab === t.key ? "rgba(245,200,66,.15)" : "#181824", color: tab === t.key ? "#f5c842" : "#606080", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* LEADERBOARD */}
      <div style={{ padding: "12px 20px 20px" }}>
        {data.map((p, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: "1px solid #28283a" }}>
            <div style={{ width: 32, textAlign: "center", fontSize: i < 3 ? 20 : 14, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", color: i < 3 ? ["#ffd700","#c0c0c0","#cd7f32"][i] : "#606080", flexShrink: 0 }}>
              {i < 3 ? MEDALS[i] : i + 1}
            </div>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#20202e", border: "1px solid #28283a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, flexShrink: 0 }}>
              {p.n[0]}
            </div>
            <div style={{ flex: 1, fontSize: 14, fontWeight: 600 }}>{p.n}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#f5c842", fontFamily: "'JetBrains Mono',monospace" }}>
              {p.sc.toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {/* BOTTOM NAV */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#10101a", borderTop: "1px solid #28283a", display: "flex", padding: "8px 0 20px", zIndex: 100 }}>
        <div onClick={() => navigate("home")} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer" }}>
          <div style={{ fontSize: 22 }}>🏠</div>
          <div style={{ fontSize: 10, color: "#606080", fontWeight: 600 }}>Bosh sahifa</div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer" }}>
          <div style={{ fontSize: 22 }}>🏆</div>
          <div style={{ fontSize: 10, color: "#f5c842", fontWeight: 600 }}>Reyting</div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer" }}>
          <div style={{ fontSize: 22 }}>👤</div>
          <div style={{ fontSize: 10, color: "#606080", fontWeight: 600 }}>Profil</div>
        </div>
      </div>
    </div>
  );
}
