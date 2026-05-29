export default function NumberPad({
  enterNumber
}) {
  return (
    <div className="numbers">
      {[1,2,3,4,5,6,7,8,9].map((n) => (
        <button
          key={n}
          className="num-btn"
          onClick={() => enterNumber(n)}
        >
          {n}
        </button>
      ))}
    </div>
  );
}
