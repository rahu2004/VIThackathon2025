import { useState, useEffect } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Robot from "./Components/Robot.jsx";

// RobotCard to handle each robot
function RobotCard({ title }) {
  const [position, setPosition] = useState({ x: 0, z: 0 });
  const [command, setCommand] = useState("");
  const [duration, setDuration] = useState(1);
  const [battery, setBattery] = useState(100);
  const [targetPosition, setTargetPosition] = useState({ x: 0, z: 0 });
  const [showStats, setShowStats] = useState(false);  // State to control visibility of stats

  // Adding Temperature, Humidity, and pH Level
  const [temperature, setTemperature] = useState(39.15);  // Initial Temperature: 39.15°C
  const [phLevel, setPhLevel] = useState(7.46);  // Initial pH Level
  const [timestamp, setTimestamp] = useState(0);  // Time in seconds
  const [humidity, setHumidity] = useState(42.71);  // Initial Humidity

  // Handle robot movement
  useEffect(() => {
    let interval;
    if (position.x !== targetPosition.x || position.z !== targetPosition.z) {
      interval = setInterval(() => {
        setPosition((prev) => ({
          x: prev.x + (targetPosition.x - prev.x) * 0.1,
          z: prev.z + (targetPosition.z - prev.z) * 0.1,
        }));
      }, 50);
    }

    return () => clearInterval(interval);
  }, [targetPosition]);

  const handleCommand = (e) => {
    setCommand(e.target.value.toLowerCase());
  };

  const handleDuration = (e) => {
    setDuration(parseFloat(e.target.value) || 1);
  };

  const startMoving = () => {
    // Prevent movement if the battery is 0 or less
    if (battery <= 0) {
      alert("Battery is too low to move! Please recharge.");
      return;
    }

    // Allow only idle command if battery is 10% or less
    if (battery <= 10 && command !== "idle") {
      alert("Battery is too low for this action! Please recharge or use 'idle' to recharge.");
      return;
    }

    if (!["forward", "backward", "left", "right", "soil-analysis", "irrigation", "weeding", "crop-monitoring", "idle"].includes(command)) {
      alert("Invalid command! Use 'forward', 'backward', 'left', 'right', 'soil-analysis', 'irrigation', 'weeding', 'crop-monitoring', or 'idle'.");
      return;
    }

    let newX = position.x;
    let newZ = position.z;
    let batteryChange = 0;
    let newHumidity = humidity;
    let newBattery = battery;

    // Handle movement commands (forward, backward, left, right)
    switch (command) {
      case "forward":
        newZ -= duration;
        batteryChange = duration * 5;
        break;
      case "backward":
        newZ += duration;
        batteryChange = duration * 5;
        break;
      case "left":
        newX -= duration;
        batteryChange = duration * 5;
        break;
      case "right":
        newX += duration;
        batteryChange = duration * 5;
        break;
      case "soil-analysis":
        batteryChange = duration * 10;
        break;
      case "irrigation":
        newHumidity += duration * 10;
        batteryChange = duration * 10;
        break;
      case "weeding":
        batteryChange = duration * 10;
        break;
      case "crop-monitoring":
        batteryChange = duration * 10;
        break;
      case "idle":
        // Increase battery by 5% * duration, ensure it doesn't exceed 100
        newBattery = Math.min(battery + duration * 5, 100);  // Battery cannot exceed 100%
        batteryChange = 0;  // No battery decrease for idle, just increase
        break;
      default:
        break;
    }

    // If the battery is sufficient to make the move or the idle command, proceed
    if (newBattery - batteryChange >= 0) {
      setTargetPosition({ x: newX, z: newZ });
      setBattery(newBattery - batteryChange);
      setHumidity(newHumidity);
      setTimestamp((prev) => prev + duration);  // Update the timestamp after every move

      // Show stats when soil-analysis is executed
      if (command === "soil-analysis") {
        setShowStats(true);
      }
    } else {
      alert("Battery is too low to complete the command. Please recharge.");
    }
  };

  return (
    <div className="flex flex-col items-center p-4 border rounded-lg shadow-lg bg-white">
      <h2 className="font-bold text-lg mb-2">{title}</h2>
      <div className="w-[300px] h-[200px] border relative">
        <Canvas camera={{ position: [0, 5, 10] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <OrbitControls />
          <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[10, 10]} />
            <meshStandardMaterial color="lightgreen" />
          </mesh>
          <Robot position={[position.x, 0, position.z]} />
        </Canvas>
      </div>

      {/* Battery Progress Bar with percentage */}
      <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
        <div
          className={`h-full rounded-full ${battery > 50 ? "bg-green-500" : battery > 20 ? "bg-yellow-500" : "bg-red-500"}`}
          style={{ width: `${battery}%` }}
        ></div>
      </div>
      <p className="text-sm mt-1">{battery > 0 ? `Battery: ${battery}%` : "Battery Low!"}</p>

      {/* Conditionally render stats based on soil-analysis command */}
      {showStats && battery > 0 && (
        <div className="mt-2 flex flex-col gap-2">
          <p>Timestamp: {timestamp}s</p>
          <p>Temperature: {temperature} °C</p>
          <p>Humidity: {humidity} %</p>
          <p>pH Level: {phLevel}</p>
        </div>
      )}

      {/* Command and Duration Inputs */}
      <div className="mt-2 flex gap-2">
        <input
          type="text"
          value={command}
          onChange={handleCommand}
          placeholder="Enter command"
          className="border p-1 w-32"
          list="command-suggestions"  // Connect input to datalist
        />
        <datalist id="command-suggestions">
          <option value="forward" />
          <option value="backward" />
          <option value="left" />
          <option value="right" />
          <option value="soil-analysis" />
          <option value="irrigation" />
          <option value="weeding" />
          <option value="crop-monitoring" />
          <option value="idle" />
        </datalist>
        <input type="number" value={duration} onChange={handleDuration} placeholder="Time (sec)" className="border p-1 w-20" />
        <button onClick={startMoving} className="bg-blue-500 text-white px-3 py-1 rounded" disabled={battery <= 0}>
          Move
        </button>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-start bg-green-200 p-8 overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4">Robot Garden Control Panel</h1>
      {/* Grid to display 4 Robot Cards */}
      <div className="grid grid-cols-2 gap-6">
        <RobotCard title="Robot 1" />
        <RobotCard title="Robot 2" />
        <RobotCard title="Robot 3" />
        <RobotCard title="Robot 4" />
      </div>
    </div>
  );
}

export default App;
