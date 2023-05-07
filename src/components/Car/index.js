export default function Car({ id, currentQ, totalQ, carNumber }) {
  const carImage = `/assets/${carNumber}.png`;

  const trackWidth = window.innerWidth;
  const carWidth = trackWidth * 0.1;
  const carOffset = (currentQ / totalQ) * (trackWidth - carWidth);

  return (
    <div className="relative w-full h-full bg-slate-50 border-4 border-black">
      <div
        style={{
          position: 'absolute',
          width: carWidth,
          left: `${carOffset}px`,
          transition: 'left 0.3s',
        }}
      >
        <img
          src={carImage}
          alt={`Car ${carNumber}`}
          style={{ width: carWidth, height: 'auto' }}
        />
      </div>
    </div>
  );
}
