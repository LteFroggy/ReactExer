import Chapter1 from "./Chapter1";
import Counter from "./Chapter2";

function App() {
  return (
    <div>
      <h1>Chapter 1</h1>
      <Chapter1 name = "동현" age = {29} />
      <Chapter1 name = "호종" age = {28} />

      <h1>Chapter 2</h1>
      <Counter />
    </div>
  );
}

export default App;