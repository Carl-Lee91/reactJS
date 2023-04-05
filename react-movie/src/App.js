import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [exchangeCoin, setExchangeCoin] = useState(1);
  const [usd, setUsd] = useState(1);
  const onChange = (event) => {
    setExchangeCoin(event.target.value);
    setUsd(1);
  };
  const handleInput = (event) => {
    setUsd(event.target.value);
  };

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>The Coins! {loading ? null : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={onChange}>
          {coins.map((coin, index) => (
            <option key={index} value={coin.quotes.USD.price}>
              {coin.name}({coin.symbol}) : ${coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
      <h2>D2C</h2>
      <div>
        <input
          type="number"
          value={usd}
          onChange={handleInput}
          placeholder="USD"
        />
        $
      </div>
      <h3>You got {usd / exchangeCoin}</h3>
    </div>
  );
}

export default App;
