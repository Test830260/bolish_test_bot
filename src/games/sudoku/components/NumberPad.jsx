export default function NumberPad({
  enterNumber
}) {
  const numbers = [
    1, 2, 3,
    4, 5, 6,
    7, 8, 9
  ];

  return (
    <div
      style={{
        padding: "15px",
        display: "grid",
        gridTemplateColumns:
          "repeat(3, 1fr)",
        gap: "10px",
        maxWidth: "350px",
        margin: "20px auto"
      }}
    >
      {numbers.map((num) => (
        <button
          key={num}
          onClick={() =>
            enterNumber(num)
          }
          style={{
            height: "65px",
            borderRadius: "16px",
            border:
              "1px solid #38bdf8",
            background:
              "#18223d",
            color: "#ffffff",
            fontSize: "26px",
            fontWeight: "700",
            cursor: "pointer"
          }}
        >
          {num}
        </button>
      ))}
    </div>
  );
}
