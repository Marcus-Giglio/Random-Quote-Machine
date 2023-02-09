import './App.css';
import Quote from './components/quote/Index';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useMemo, useRef, useState } from 'react';

function App() {
  const colorArray: string[] = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857',
  ];

  const [colorBody, setColorBody] = useState<string>('');

  const renderAfterCalled = useRef(false);

  const changeBodyColor = () => {
    const randomColor =
      colorArray[Math.floor(Math.random() * colorArray.length)];
    setColorBody(randomColor);
    document.body.style.backgroundColor = colorBody;
    document.body.style.transition = 'background-color 1s ease';
  };

  useMemo(() => {
    changeBodyColor();
  }, []);

  useEffect(() => {
    changeBodyColor();
  }, []);

  return (
    <div className="wrapper">
      <div className="container">
        <Quote colorBody={colorBody} changeBodyColor={changeBodyColor} />
      </div>
    </div>
  );
}

export default App;
