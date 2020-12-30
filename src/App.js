import React, { useState, useEffect } from "react";
import './App.css';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
  Input,
  Button
} from "@material-ui/core";
import numeral from "numeral";
function App() {
  const [Currency] = useState(["CAD","HKD","ISK","PHP","DKK","HUF","CZK","AUD","RON","SEK","IDR","INR","BRL","RUB","HRK","JPY","THB","CHF","SGD","PLN","BGN","TRY","CNY","NOK","NZD","ZAR","USD","MXN","ILS","GBP","KRW","MYR"])
  const [FromCurrency, setFromCurrency] = useState("CAD");
  const [ToCurrency, setToCurrency] = useState("CAD");
  const [value, setValue] = useState();
  const [rates, setRates] = useState({});
  const [input, setInput] = useState();
  const convert = (event) => {
    event.preventDefault();
    if(FromCurrency!="" && ToCurrency!="")
    {
      setValue(numeral(((rates[ToCurrency]/rates[FromCurrency])*input)).format("0.0a"));
    }
    
  }
  useEffect(() => {
    fetch("https://api.exchangeratesapi.io/latest")
    .then((response) => response.json())
    .then((data) => {
      setRates(data.rates);
      console.log("Our Rates : ",data);
    })
    console.log("The Stored rates : ",rates);
  },[]);

  const onCurrencyChange1 = async (e) => {
    const cu = e.target.value;
    setFromCurrency(cu);
    console.log("Selected Currency : ", cu);
  }
  const onCurrencyChange2 = async (e) => {
    const cu = e.target.value;
    setToCurrency(cu);
  }
  return (
    <div className="app">
      <h1>Currency Converter</h1>
    <div className="Inner__app">
      <div className="from__section">
        <Select className="optionMenu"
        variant="outlined"
        value={FromCurrency}
        onChange={onCurrencyChange1}
        >
          {Currency.map((currency)=>(
            <MenuItem value={currency}>{currency}</MenuItem>
          ))}
        </Select>
      </div>
      
      <ArrowForwardRoundedIcon
        color="secondary"
        style={{fontSize:40}}
      />
      
      <div className="to__section">
        <Select className="optionMenu"
        variant="outlined"
        value={ToCurrency}
        onChange={onCurrencyChange2}
        >
          {Currency.map((currency)=>(
            <MenuItem value={currency}>{currency}</MenuItem>
          ))}
        </Select>
      </div>
      
      {/* {Currency.map((currency)=>(
        <h4>{currency}</h4>
      ))} */}
        
    </div>
    <Input className="input__field" placeholder="Enter the ammount" type="number" value={input} onChange={event => setInput(event.target.value)}/>
    <Button color="primary" type="submit" disabled={!input} variant="contained" onClick={convert}>Convert</Button>

    <h4>{value}</h4>
    </div>
  );
}

export default App;
