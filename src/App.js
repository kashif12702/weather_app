import "./App.css";
import Navbar from "./components/Navbar";
import Index from "./components/AppBody/Index";

function App() {
  return (
    <>
      <main className="relative h-screen">
        <Navbar />
        <Index />
      </main>
    </>
  );
}

export default App;
