import { useState, useEffect } from "react";

const randomColor = () => {
  const colors = ["red", "green", "blue", "yellow", "purple", "orange", "pink"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const randomShape = () => {
  return Math.random() > 0.5 ? "50%" : "10%";
};

const randomPosition = () => ({
  top: Math.random() * 80 + "%",
  left: Math.random() * 80 + "%",
});

const PopItButton = ({ id, onPop }) => {
  const [style] = useState({
    position: "absolute",
    width: "80px",
    height: "80px",
    backgroundColor: randomColor(),
    borderRadius: randomShape(),
    ...randomPosition(),
  });

  return (
    <div
      key={id}
      style={style}
      onClick={onPop}
      className="transition-all duration-300 hover:scale-110 shadow-lg z-10"
    />
  );
};

const DrawingCanvas = ({ isDrawing }) => {
  useEffect(() => {
    const canvas = document.getElementById("drawCanvas");
    const ctx = canvas.getContext("2d");
    let drawing = false;

    const startDraw = (e) => {
      drawing = true;
      draw(e);
    };

    const endDraw = () => {
      drawing = false;
      ctx.beginPath();
    };

    const draw = (e) => {
      if (!drawing || !isDrawing) return;
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.strokeStyle = randomColor();

      const rect = canvas.getBoundingClientRect();
      ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    };

    canvas.addEventListener("mousedown", startDraw);
    canvas.addEventListener("mouseup", endDraw);
    canvas.addEventListener("mousemove", draw);

    return () => {
      canvas.removeEventListener("mousedown", startDraw);
      canvas.removeEventListener("mouseup", endDraw);
      canvas.removeEventListener("mousemove", draw);
    };
  }, [isDrawing]);

  return (
    <canvas
      id="drawCanvas"
      width={window.innerWidth}
      height={window.innerHeight}
      className="absolute top-0 left-0 z-0"
    />
  );
};

function App() {
  const [pops, setPops] = useState([0, 1, 2, 3, 4]);
  const [isDrawing, setIsDrawing] = useState(false);

  const popBubble = (id) => {
    setPops((prev) => prev.filter((p) => p !== id).concat(Date.now()));
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-blue-100 to-yellow-100">
      <DrawingCanvas isDrawing={isDrawing} />
      {pops.map((id) => (
        <PopItButton key={id} id={id} onPop={() => popBubble(id)} />
      ))}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
        <button
          onClick={() => setIsDrawing((prev) => !prev)}
          className="bg-white px-4 py-2 rounded-full shadow-xl text-black font-bold"
        >
          {isDrawing ? "Modo PopIt" : "Modo Dibujo"}
        </button>
      </div>
    </div>
  );
}

export default App;
