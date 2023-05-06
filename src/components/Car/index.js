export default function Car({ currentQ, totalQ, carNumber }) {
  console.log(currentQ, totalQ, carNumber);

  let carImage;
  if (carNumber === 1) {
    carImage = 'assets/1.png';
  } else if (carNumber === 2) {
    carImage = 'assets/2.png';
  } else if (carNumber === 3) {
    carImage = 'assets/3.png';
  } else if (carNumber === 4) {
    carImage = 'assets/4.png';
  }

  const sectionWidth = document.getElementById('track')?.offsetWidth;
  const carWidth = sectionWidth * 0.1;
  const carOffset = (currentQ / totalQ) * (sectionWidth - carWidth);

  return (
    <div
      id="track"
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: 'pink',
        height: '100px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: carWidth,
          height: '100%',
          left: `${carOffset}px`,
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
