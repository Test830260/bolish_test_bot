import { useState, useEffect } from "react";

const tg = window.Telegram?.WebApp;

export default function HomePage({ navigate }) {
  const [user, setUser] = useState({ name: "O'yinchi", wins: 0, games: 0, score: 1200, coins: 0 });

  useEffect(() => {
    if (tg) {
      tg.ready();
      tg.expand();
      const u = tg.initDataUnsafe?.user;
      if (u) setUser(prev => ({ ...prev, name: u.first_name || "O'yinchi" }));
    }
  }, []);

  const letter = user.name[0].toUpperCase();

  return (
    <div style={{ paddingBottom: "90px" }}>
      {/* HERO */}
      <div style={{ padding: "44px 20px 28px", background: "linear-gradient(160deg,#12121e,#0e0e18)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -60, left: -60, width: 240, height: 240, background: "radial-gradient(circle,rgba(245,200,66,.12) 0%,transparent 70%)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: -40, right: -40, width: 180, height: 180, background: "radial-gradient(circle,rgba(232,151,58,.1) 0%,transparent 70%)", borderRadius: "50%" }} />

        {/* User row */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, position: "relative", zIndex: 1 }}>
          <div style={{ width: 54, height: 54, borderRadius: "50%", background: "linear-gradient(135deg,#f5c842,#e8973a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 800, color: "#08080e", boxShadow: "0 0 0 3px rgba(245,200,66,.2)", flexShrink: 0 }}>
            {letter}
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800 }}>{user.name}</div>
            <div style={{ fontSize: 12, color: "#f5c842", fontWeight: 600, marginTop: 3 }}>⭐ Havaskor daraja</div>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 7, background: "rgba(245,200,66,.12)", border: "1px solid rgba(245,200,66,.25)", borderRadius: 22, padding: "8px 14px", fontSize: 15, fontWeight: 700, color: "#f5c842" }}>
            🪙 {user.coins}
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginTop: 20, position: "relative", zIndex: 1 }}>
          {[
            { val: user.wins, lbl: "G'alabalar", color: "#34d399" },
            { val: user.games, lbl: "O'yinlar", color: "#f5c842" },
            { val: user.score, lbl: "Ball", color: "#60a5fa" },
          ].map((s, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,.05)", border: "1px solid #28283a", borderRadius: 14, padding: "14px 10px", textAlign: "center" }}>
              <div style={{ fontSize: 26, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", color: s.color }}>{s.val}</div>
              <div style={{ fontSize: 11, color: "#a0a0c0", marginTop: 3 }}>{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* STREAK */}
      <div style={{ margin: "16px 20px 0", background: "linear-gradient(135deg,rgba(245,200,66,.08),rgba(232,151,58,.05))", border: "1px solid rgba(245,200,66,.2)", borderRadius: 18, padding: "16px 18px", display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ fontSize: 32 }}>🔥</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#f5c842" }}>Ketma-ket streak</div>
          <div style={{ fontSize: 12, color: "#a0a0c0", marginTop: 2 }}>Har kun o'ynab rekord yarat!</div>
        </div>
        <div style={{ marginLeft: "auto", fontSize: 28, fontWeight: 900, color: "#f5c842", fontFamily: "'JetBrains Mono',monospace" }}>1</div>
      </div>

      {/* GAMES */}
      <div style={{ padding: "22px 20px 12px", fontSize: 13, fontWeight: 700, color: "#606080", letterSpacing: "1.5px", textTransform: "uppercase" }}>🎮 O'yinlar</div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "0 20px" }}>
        {/* Sudoku - active */}
        <div onClick={() => navigate("sudoku")} style={{ background: "#181824", border: "1px solid #28283a", borderRadius: 18, overflow: "hidden", display: "flex", cursor: "pointer", alignItems: "stretch" }}>
          <div style={{ width: 5, background: "linear-gradient(#f5c842,#e8973a)", flexShrink: 0 }} />
          <div style={{ padding: "18px 16px", display: "flex", alignItems: "center", gap: 14, flex: 1 }}>
            <div style={{ fontSize: 36 }}>🧩</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 700 }}>Sudoku</div>
              <div style={{ fontSize: 12, color: "#a0a0c0", marginTop: 3 }}>Mantiq va diqqat o'yini • 3 daraja</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
              <div style={{ padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, background: "rgba(52,211,153,.15)", color: "#34d399", border: "1px solid rgba(52,211,153,.3)" }}>BEPUL</div>
              <div style={{ fontSize: 18, color: "#606080" }}>›</div>
            </div>
          </div>
        </div>

        {/* Locked games */}
        {[
          { icon: "🔢", name: "15-Puzzle", desc: "Raqamlarni to'g'ri joylashtir" },
          { icon: "🔤", name: "So'z toping", desc: "O'zbek so'zlarini top" },
          { icon: "🧠", name: "Xotira", desc: "Juftliklarni esda tut" },
        ].map((g, i) => (
          <div key={i} style={{ background: "#181824", border: "1px solid #28283a", borderRadius: 18, overflow: "hidden", display: "flex", opacity: 0.5 }}>
            <div style={{ width: 5, background: "#343450", flexShrink: 0 }} />
            <div style={{ padding: "18px 16px", display: "flex", alignItems: "center", gap: 14, flex: 1 }}>
              <div style={{ fontSize: 36 }}>{g.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 700 }}>{g.name}</div>
                <div style={{ fontSize: 12, color: "#a0a0c0", marginTop: 3 }}>{g.desc}</div>
              </div>
              <div style={{ padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, background: "#20202e", color: "#606080" }}>TEZDA</div>
            </div>
          </div>
        ))}
      </div>

      {/* BOTTOM NAV */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#10101a", borderTop: "1px solid #28283a", display: "flex", padding: "8px 0 20px", zIndex: 100 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer" }}>
          <div style={{ fontSize: 22 }}>🏠</div>
          <div style={{ fontSize: 10, color: "#f5c842", fontWeight: 600 }}>Bosh sahifa</div>
        </div>
        <div onClick={() => navigate("rating")} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer" }}>
          <div style={{ fontSize: 22 }}>🏆</div>
          <div style={{ fontSize: 10, color: "#606080", fontWeight: 600 }}>Reyting</div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer" }}>
          <div style={{ fontSize: 22 }}>👤</div>
          <div style={{ fontSize: 10, color: "#606080", fontWeight: 600 }}>Profil</div>
        </div>
      </div>
    </div>
  );
            }
