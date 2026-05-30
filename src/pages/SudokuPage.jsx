import { useState } from "react";

const LB_DATA = [
  { n: "Asilbek T.", sc: 5840 },
  { n: "Malika R.", sc: 5210 },
  { n: "Jasur K.", sc: 4890 },
  { n: "Nodira S.", sc: 4100 },
  { n: "Otabek M.", sc: 3980 },
];
const MEDALS = ["🥇", "🥈", "🥉"];

export default function SudokuPage({ navigate, goBack }) {
  const [wins, setWins] = useState(0);
  const [score, setScore] = useState(1200);
  const [best, setBest] = useState(null);

  const fmt = (s) => String(~~(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");

  return (
    <div style={{ paddingBottom: 30 }}>
      {/* TOPBAR */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 18px", background: "#10101a", borderBottom: "1px solid #28283a", position: "sticky", top: 0, zIndex: 10 }}>
        <div onClick={goBack} style={{ width: 38, height: 38, borderRadius: "50%", background: "#181824", border: "1px solid #28283a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, cursor: "pointer" }}>←</div>
        <div style={{ fontSize: 18, fontWeight: 700, flex: 1 }}>🧩 Sudoku</div>
      </div>

      {/* HERO */}
      <div style={{ padding: "28px 20px 24px", background: "linear-gradient(160deg,#12121e,#0e0e18)", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -60, left: "50%", transform: "translateX(-50%)", width: 300, height: 300, background: "radial-gradient(circle,rgba(245,200,66,.1) 0%,transparent 65%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ fontSize: 64, marginBottom: 14, position: "relative", zIndex: 1 }}>🧩</div>
        <div style={{ fontSize: 28, fontWeight: 900, position: "relative", zIndex: 1 }}>Sudoku</div>
        <div style={{ fontSize: 14, color: "#a0a0c0", marginTop: 6, position: "relative", zIndex: 1 }}>9×9 katakchani to'ldiring • Mantiq va diqqat</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 14, flexWrap: "wrap", position: "relative", zIndex: 1 }}>
          {["Oson • O'rta • Qiyin", "🏆 Reyting", "⏱ Taymer"].map((tag, i) => (
            <span key={i} style={{ padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: "rgba(255,255,255,.07)", border: "1px solid #28283a" }}>{tag}</span>
          ))}
        </div>
      </div>

      {/* PLAY BUTTON */}
      <div style={{ padding: 20 }}>
        <button
          onClick={() => navigate("play")}
          style={{ width: "100%", padding: 18, borderRadius: 18, border: "none", background: "linear-gradient(135deg,#f5c842,#e8973a)", color: "#08080e", fontSize: 18, fontWeight: 800, cursor: "pointer", fontFamily: "'Outfit',sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, boxShadow: "0 8px 30px rgba(245,200,66,.25)" }}
        >
          ▶ O'ynash
        </button>
      </div>

      {/* STATS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, padding: "0 20px" }}>
        {[
          { val: wins, lbl: "G'alabalar" },
          { val: best ? fmt(best) : "—", lbl: "Rekord" },
          { val: score, lbl: "Ball" },
        ].map((s, i) => (
          <div key={i} style={{ background: "#181824", border: "1px solid #28283a", borderRadius: 14, padding: "14px 10px", textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", color: "#f5c842" }}>{s.val}</div>
            <div style={{ fontSize: 11, color: "#a0a0c0", marginTop: 3 }}>{s.lbl}</div>
          </div>
        ))}
      </div>

      {/* TOP PLAYERS */}
      <div style={{ padding: "20px 20px 10px" }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>🏆 Top o'yinchilar</div>
        {LB_DATA.map((p, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: "1px solid #28283a" }}>
            <div style={{ width: 32, textAlign: "center", fontSize: i < 3 ? 20 : 14, fontWeight: 700, color: ["#ffd700","#c0c0c0","#cd7f32"][i] || "#606080" }}>
              {i < 3 ? MEDALS[i] : i + 1}
            </div>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#20202e", border: "1px solid #28283a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, flexShrink: 0 }}>
              {p.n[0]}
            </div>
            <div style={{ flex: 1, fontSize: 14, fontWeight: 600 }}>{p.n}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#f5c842", fontFamily: "'JetBrains Mono',monospace" }}>{p.sc.toLocaleString()}</div>
          </div>
        ))}
        <button
          onClick={() => navigate("rating")}
          style={{ width: "100%", marginTop: 14, padding: 13, borderRadius: 13, border: "1px solid #28283a", background: "#181824", color: "#f1f1fa", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}
        >
          Barcha Top 100 ni ko'rish →
        </button>
      </div>
    </div>
  );
      }
