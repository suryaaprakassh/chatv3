import Views from "./components/Views.jsx";
import UserContext from "./components/AccountContext.jsx";

function App() {
  return (
    <UserContext>
      <Views />
    </UserContext>
  );
}

export default App;
