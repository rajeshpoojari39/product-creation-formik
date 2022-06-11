import "./App.css";
import { Button } from "reactstrap";

function App(props) {
  return (
    <div className='app'>
      <h1>Products Creation</h1>
      <div className='btn-group'>
        <Button color='primary' onClick={() => props.history.push("/products")}>
          All Products
        </Button>
        <Button color='primary' onClick={() => props.history.push("/form")}>
          Add Products
        </Button>
      </div>
    </div>
  );
}

export default App;
