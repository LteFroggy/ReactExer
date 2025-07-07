
function Greeting(param1) {
  return (
    <div>
      <p>{param1.name}님 만나서 반갑습니다. {param1.name}님은 {param1.age} 세입니다.</p>
    </div>
  )
}

function App() {
  return (
  <div>
    <div>
      <h1>Chapter 1</h1>
      <h2><Greeting name = "지민" age = {24} /></h2>
      <h2><Greeting name = "서준" age = {31} /></h2>
    </div>

    <div>

    </div>
  </div>
  );
}

export default App;