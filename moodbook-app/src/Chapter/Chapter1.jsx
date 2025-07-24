function Greeting(props) {
  return (
    <div>
      <p>{props.name}님 만나서 반갑습니다. {props.name}님은 {props.age} 세입니다.</p>
    </div>
  )
}

function Chapter1(props) {
  return (
  <div>
    <div>
      <h2><Greeting {...props} /></h2>
    </div>
  </div>
  );
}

export default Chapter1;
