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
        <h1>conversion USD - EUR</h1>
        <h2>{conversion ? conversion : ''}</h2>
        <Button label="click me please"></Button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
