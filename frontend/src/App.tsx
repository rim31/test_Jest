import React from 'react';
import './App.css';
import { convert } from './components/utils/Currency';
import Button from './components/button/Button';
import Counter from './components/Counter/Counter';

function App() {
  const [conversion, setConversion] = React.useState<string>("");
  const [counter, setCounter] = React.useState<number>(0);

  React.useEffect(() => {
    const fetchData = async () => {
      const result: string = await convert("USD", "EUR")
      setConversion(result);
    }
    (fetchData());
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <h1>conversion rate : $ USD - € EUR</h1>
        <h3>{conversion ? conversion : ''}</h3>
        <h2>counter</h2>
        <Button label="click me please"></Button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button id="increment-btn" style={{ border: "1px solid yellow", borderRadius: "8px", padding: "3px 3px" }}
          onClick={() => setCounter(counter + 1)}>Increment</button>
        <button id="decrement-btn" style={{ border: "1px solid yellow", borderRadius: "8px", padding: "3px 3px" }}
          onClick={() => setCounter(counter > 0 ? counter - 1 : 0)}>Decrement</button>
        <div id="counter-value">{counter} €</div>
        <p>Conversion {(counter / parseFloat(conversion)).toFixed(2)} $</p>
      </header>
      <Counter />
    </div>
  );
}

export default App;
