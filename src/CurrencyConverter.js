import React, { useState, useEffect } from "react";
import "./CurrencyConverter.css";

const CurrencyConverter = () => {
  const [exchangeRate, setExchangeRate] = useState(1.1);
  const [fixedRate, setFixedRate] = useState(null);
  const [isFixedRateActive, setIsFixedRateActive] = useState(false);
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [isEUR, setIsEUR] = useState(true);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setExchangeRate(prev => {
        const variation = (Math.random() * 0.1) - 0.05;
        const newRate = prev + variation;
        // limiter le taux entre 0.9 et 1.3
        return parseFloat(Math.min(Math.max(newRate, 0.9), 1.3).toFixed(4));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isFixedRateActive && fixedRate) {
      const variation = Math.abs((fixedRate - exchangeRate) / exchangeRate) * 100;
      if (variation > 2) {
        setIsFixedRateActive(false);
        alert("Le taux fixe a été désactivé car la variation dépasse 2%.");
      }
    }
  }, [exchangeRate, fixedRate, isFixedRateActive]);

  useEffect(() => {
    if (amount && !isNaN(amount)) {
      const currentRate = isFixedRateActive && fixedRate ? fixedRate : exchangeRate;
      const rate = isEUR ? currentRate : 1 / currentRate;
      const result = (parseFloat(amount) * rate).toFixed(2);
      setConvertedAmount(result);
    } else {
      setConvertedAmount("");
    }
  }, [amount, exchangeRate, fixedRate, isEUR, isFixedRateActive]);

  const toggleCurrency = () => {
    const temp = convertedAmount;
    setAmount(temp);
    setConvertedAmount(amount);
    setIsEUR(!isEUR);
  };

  const handleFixRate = (e) => {
    const value = parseFloat(e.target.value);
    setFixedRate(value > 0 ? value : null);
  };

  const toggleFixedRate = () => {
    if (!isFixedRateActive && !fixedRate) {
      setFixedRate(exchangeRate); // initialiser avec le taux actuel si vide
    }
    setIsFixedRateActive(!isFixedRateActive);
  };

  const addToHistory = () => {
    if (amount && convertedAmount) {
      const now = new Date();
      const entry = {
        date: now.toLocaleDateString("fr-FR"),
        time: now.toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        }),
        inputAmount: parseFloat(amount).toFixed(2),
        inputCurrency: isEUR ? "EUR" : "USD",
        outputAmount: convertedAmount,
        outputCurrency: isEUR ? "USD" : "EUR",
        rateUsed: (isFixedRateActive && fixedRate ? fixedRate : exchangeRate).toFixed(4),
        rateReal: exchangeRate.toFixed(4),
        difference: isFixedRateActive && fixedRate
          ? (((fixedRate - exchangeRate) / exchangeRate * 100).toFixed(2) + "%")
          : "0.00%",
        conversionType: isFixedRateActive ? "Fixe" : "Auto"
      };
      setHistory([entry, ...history.slice(0, 4)]);

      // fixed rate
      setFixedRate(null);
      setIsFixedRateActive(false);
    }
  };

  const isConvertDisabled = isFixedRateActive && (!fixedRate || fixedRate <= 0);

  return (
    <div className="converter-app">
      <div className="header">
        <h1 className="title">
          Convertisseur de devises EUR -> USD
        </h1>
        <div className="rate-display">
          <span>1 {isEUR ? "EUR" : "USD"} = </span>
          <strong>
            {(
              isEUR
                ? exchangeRate
                : 1 / exchangeRate // afficher le taux de change en temps réel
            ).toFixed(4)}
          </strong>
          <span> {isEUR ? "USD" : "EUR"}</span>
        </div>
      </div>

      <div className="conversion-container">
        <div className="input-group">
          <div className="input-card">
            <label>{isEUR ? "Montant en EUR" : "Amount in USD"}</label>
            <div className="input-wrapper">
              <span className="currency">{isEUR ? "€" : "$"}</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="amount-input"
              />
            </div>
          </div>

          <div className="conversion-controls">
            <button
              className="swap-button"
              onClick={toggleCurrency}
              aria-label="Inverser les devises"
            >
              ⇄
            </button>
            <button
              className="convert-button"
              onClick={addToHistory}
              disabled={isConvertDisabled}
            >
              Convertir →
            </button>
          </div>

          <div className="input-card">
            <label>{isEUR ? "Result in USD" : "Résultat en EUR"}</label>
            <div className="input-wrapper">
              <span className="currency">{isEUR ? "$" : "€"}</span>
              <input
                type="text"
                value={convertedAmount}
                readOnly
                placeholder="0.00"
                className="result-input"
              />
            </div>
          </div>
        </div>

        <div className="fixed-rate-control">
          <div className="toggle-switch">
            <input
              type="checkbox"
              id="fixedRateToggle"
              checked={isFixedRateActive}
              onChange={toggleFixedRate}
            />
            <label htmlFor="fixedRateToggle" className="slider"></label>
            <span className="toggle-label">Taux fixe</span>
          </div>

          <input
            type="number"
            step="0.0001"
            value={fixedRate ?? ""}
            onChange={handleFixRate}
            placeholder="Saisir taux fixe"
            className={`rate-input ${isFixedRateActive && !fixedRate ? "error" : ""}`}
          />

          {isFixedRateActive && !fixedRate && (
            <p className="error-message">⚠️ Veuillez entrer un taux valide</p>
          )}

          {!isFixedRateActive && fixedRate && (
            <p className="info-message">ℹ️ Le taux fixe est désactivé. Vous pouvez le modifier pour le réactiver.</p>
          )}
        </div>
      </div>

      <div className="history-section">
        <h2 className="history-title">Historique des conversions</h2>
        <div className="history-table">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Heure</th>
                <th>Montant</th>
                <th>Converti</th>
                <th>Taux utilisé</th>
                <th>Différence</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry, index) => (
                <tr key={index} className={`row-${index % 2 === 0 ? "even" : "odd"}`}>
                  <td>{entry.date}</td>
                  <td>{entry.time}</td>
                  <td>{entry.inputAmount} {entry.inputCurrency}</td>
                  <td>{entry.outputAmount} {entry.outputCurrency}</td>
                  <td>{entry.rateUsed}</td>
                  <td className={entry.difference.startsWith("-") ? "negative" : ""}>
                    {entry.difference}
                  </td>
                  <td><span className={`type-badge ${entry.conversionType.toLowerCase()}`}>
                    {entry.conversionType}
                  </span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;