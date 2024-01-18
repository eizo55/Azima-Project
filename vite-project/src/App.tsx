import "./App.css";
import "./Styles/Navbar.css";
import "./Styles/introImage.css";
import NavBar from "./components/navbar";
import { IntroPicture } from "./components/IntroPicture";
function App() {
  return (
    <>
      <IntroPicture />
      <NavBar />
    </>
  );
}

export default App;
