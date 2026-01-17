const { useState, useMemo } = React;

const exchangeRates = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.78,
  JPY: 156.7
};

export function CurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  
  // CRITICAL: useMemo ONLY on [amount, fromCurrency]
  // toCurrency change does NOT recalculate base rate
  const baseConvertedAmount = useMemo(() => {
    return amount * exchangeRates[fromCurrency];
  }, [amount, fromCurrency]);
  
  // Final display uses base amount / toCurrency rate
  const finalAmount = (baseConvertedAmount / exchangeRates[toCurrency]).toFixed(2);
  
  const currencies = Object.keys(exchangeRates);
  
  return (
    <div className="converter">
      <h1>💱 Currency Exchange</h1>
      
      <div className="input-group">
        <label>
          Amount:
          <input
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </label>
      </div>
      
      <div className="currency-selects">
        <div className="select-group">
          <label>From:</label>
          <select 
            value={fromCurrency} 
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {currencies.map(currency => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        
        <div className="arrow">↔</div>
        
        <div className="select-group">
          <label>To:</label>
          <select 
            value={toCurrency} 
            onChange={(e) => setToCurrency(e.target.value)}
          >
            {currencies.map(currency => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="result">
        <div className="converted-amount">
          {finalAmount} {toCurrency}
        </div>
      </div>
    </div>
  );
}
