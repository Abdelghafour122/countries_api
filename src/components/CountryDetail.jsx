import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CountryDetail = () => {
  const [country, setCountry] = useState([]);
  const { name } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    const getSpecificData = async () => {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${name}`
      ).then((data) => data.json());
      setCountry(response);
    };
    getSpecificData();
  }, [name]);

  return (
    <div className="country-details">
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Back
      </button>
      <>
        {country.map((cont) => {
          const {
            flags,
            name,
            population,
            region,
            capital,
            ccn3,
            languages,
            currencies,
            subregion,
            tld,
            borders,
          } = cont;
          let namesAvailable = Array.from(Object.values(name.nativeName));
          let currenciesAvailable = Array.from(Object.values(currencies));
          let languagesAvailable = Array.from(Object.values(languages));
          //   console.log(languagesAvailable);
          //   console.log(currenciesAvailable);
          //   console.log(namesAvailable);
          //   console.log(namesAvailable[0].common);
          return (
            <div className="core" key={ccn3}>
              <img src={flags.svg} alt={name.common} />
              <h1> {name.common} </h1>
              <div className="native-names">
                {" "}
                Native Name(s):{" "}
                {namesAvailable.map((n) => {
                  return <div> {n.common} </div>;
                })}{" "}
              </div>
              <div>
                Population: <span>{population}</span>
              </div>
              <div>
                Region: <span>{region}</span>
              </div>
              <div>
                Sub Region: <span>{subregion}</span>
              </div>
              <div>
                Capital: <span>{capital}</span>
              </div>
              <div>
                Top Level Domain:{" "}
                <span>
                  {tld.map((t) => {
                    return <span> {t} </span>;
                  })}
                </span>{" "}
              </div>
              <div>
                Currencies:{" "}
                <span>
                  {currenciesAvailable.map((c) => {
                    return <span>{c.name}</span>;
                  })}
                </span>
              </div>
              <div>
                Languages:{" "}
                <span>
                  {languagesAvailable.map((lan) => {
                    return `${lan} `;
                  })}
                </span>
              </div>
              <div>
                Border Countries:{" "}
                {borders.map((bor) => (
                  <span> {bor} </span>
                ))}
              </div>
            </div>
          );
        })}
      </>
    </div>
  );
};

export default CountryDetail;
