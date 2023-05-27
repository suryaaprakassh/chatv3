import ToggleColorMode from "./components/ToggleColorMode.jsx";
import Views from "./components/Views.jsx";
import UserContext from "./components/AccountContext.jsx";

function App() {
  return (
    <UserContext>
      <Views />
      <ToggleColorMode />
    </UserContext>
  );
}

export default App;
