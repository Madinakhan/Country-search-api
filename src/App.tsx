import React, { Component } from 'react';
import './assets/css/main.scss';

type State = {
  inputValue: string;
  img: string;
  country: string;
  capital: string;
  continent: string;
  population: number;
  style: boolean;
  error: string;
};

class CountryGuideApp extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      inputValue: '',
      img: '',
      country: '',
      capital: '',
      continent: '',
      population: 0,
      style: false,
      error: '',
    };
  }

  fetchCountryData = async () => {
    const { inputValue } = this.state;

    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${inputValue}`);
      const json = await response.json();
      const data = json[0];
      if (data) {
        this.setState({
          img: data.flags.png,
          country: data.name.common,
          capital: data.capital[0],
          continent: data.continents[0],
          population: data.population,
          error: '',
        });
      } else {
        this.setState({
          error: 'Such a state does not exist',
        });
      }
    } catch (error) {
      console.error('Error fetching country data:', error);
      this.setState({
        error: 'An error occurred while fetching data',
      });
    }
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: event.target.value });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.fetchCountryData();
    this.setState({ style: true, inputValue: '' });
  };

  render() {
    const { inputValue, style, img, country, capital, continent, population, error } = this.state;

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Enter a country name..." value={inputValue} onChange={this.handleChange} />
          <button type="submit">Search</button>
        </form>
        {error ? (
          <p className="err">{error}</p>
        ) : (
          country && (
            <div className={`country-info ${style ? 'show' : ''}`}>
              <div className="img"><img src={img} alt="" /></div>
              <h2>{country}</h2>
              <div className="info">
                <p><b>Capital:</b> {capital}</p>
                <p><b>Continent:</b> {continent}</p>
                <p><b>Population:</b> {population}</p>
              </div>
            </div>
          )
        )}
      </div>
    );
  }
}

export default CountryGuideApp;
