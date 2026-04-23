
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <AppRoutes />
    </div>
  );
}