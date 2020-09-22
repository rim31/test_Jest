import React from 'react';
import './App.css';
import { convert } from './components/utils/Currency';
import Button from './components/button/Button'

function App() {
  const [conversion, setConversion] = React.useState<string>("");


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
      </header>
      <button id="increment-btn">Increment</button>
    </div>
  );
}

export default App;
