import "./App.css";
import Countries from "./components/Countries";
import Header from "./components/Header";
import Search from "./components/Search";
import CountryDetail from "./components/CountryDetail";
import { Route, Routes, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ErrorPage from "./components/ErrorPage";

function App() {
  const [countries, setCountries] = useState([]);
  let navigate = useNavigate();

  const getCountries = async () => {
    const response = await fetch("https://restcountries.com/v3.1/all").then(
      (data) => data.json()
    );
    setCountries(response);
  };

  const findCountry = async (countryName) => {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}`
    ).then((data) => data.json());
    response.status === 404 ? navigate("/error") : setCountries(response);
  };

  const filterCountry = async (region) => {
    const response = await fetch(
      `https://restcountries.com/v3.1/region/${region}`
    ).then((data) => data.json());
    setCountries(response);
  };

  useEffect(() => {
    getCountries();
  }, []);
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <Search
                countries={countries}
                onFilter={filterCountry}
                onFind={findCountry}
              />{" "}
              <Countries countries={countries} />
            </>
          }
        ></Route>
        <Route path="/countries/:name" element={<CountryDetail />}></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
