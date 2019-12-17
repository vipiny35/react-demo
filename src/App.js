import React from "react";
import axios from "axios";
import "./App.css";
import { MapPin, Sun } from 'react-feather';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      day: '',
      city: 'newyork',
      data: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ city: event.target.value });
  }
  async handleSubmit(event) {
    event.preventDefault();
    await axios
      .get("http://localhost:3100/api?city=" + this.state.city)
      .then(response => {

        var utcSeconds = response.data.current_observation.pubDate;
        var weatherDate = new Date(0);
        weatherDate.setUTCSeconds(utcSeconds);
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var dayOfWeek = days[weatherDate.getDay()];
        this.setState({
          visible: true,
          day: dayOfWeek,
          data: response.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  showData() {
    if (!this.state.visible) {
      return null;
    }
    return (

      <div className="container">
        <div className="weather-side">
          <div className="weather-gradient"></div>
          <div className="date-container">
            <h2 className="date-dayname">{this.state.day}</h2><span className="location"><span className="map-pin"><MapPin /></span> {this.state.data.location.city}, {this.state.data.location.region}</span>
          </div>
          <div className="weather-container">
            <span className="sun"><Sun size='65' /></span>
            <h1 className="weather-temp">{this.state.data.current_observation.condition.temperature}°F</h1>
            <h3 className="weather-desc">{this.state.data.current_observation.condition.text}</h3>
          </div>
        </div>
        <div className="info-side">
          <div className="today-info-container">
            <div className="today-info">
              <div className="precipitation"> <span className="title">HUMIDITY</span><span className="value">{this.state.data.current_observation.atmosphere.humidity} %</span>
                <div className="clear"></div>
              </div>
              <div className="humidity"> <span className="title">PRESSURE</span><span className="value">{this.state.data.current_observation.atmosphere.pressure}</span>
                <div className="clear"></div>
              </div>
              <div className="wind"> <span className="title">WIND</span><span className="value">{this.state.data.current_observation.wind.speed} mph</span>
                <div className="clear"></div>
              </div>
            </div>
          </div>
          <div className="week-container">
            <ul className="week-list">
              <li className="active"><i className="day-icon"></i><span className="day-name">{this.state.data.forecasts[0].day}</span><span className="day-temp">{this.state.data.forecasts[0].low}°F</span><span className="day-temp">{this.state.data.forecasts[0].high}°F</span></li>

              <li className=""><i className="day-icon"></i><span className="day-name">{this.state.data.forecasts[1].day}</span><span className="day-temp">{this.state.data.forecasts[1].low}°F</span><span className="day-temp">{this.state.data.forecasts[1].high}°F</span></li>

              <li className=""><i className="day-icon"></i><span className="day-name">{this.state.data.forecasts[2].day}</span><span className="day-temp">{this.state.data.forecasts[2].low}°F</span><span className="day-temp">{this.state.data.forecasts[2].high}°F</span></li>

              <li className=""><i className="day-icon"></i><span className="day-name">{this.state.data.forecasts[3].day}</span><span className="day-temp">{this.state.data.forecasts[3].low}°F</span><span className="day-temp">{this.state.data.forecasts[3].high}°F</span></li>

              <div className="clear"></div>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="App">

        <h1>City Information</h1>
        <h2>Select a city to get the data</h2>
        <form onSubmit={this.handleSubmit}>
          <select
            className="cities"
            name="cities"
            size="3"
            onChange={this.handleChange}
          >
            <option value="newyork">New York</option>
            <option value="seattle">Seattle</option>
            <option value="pasadena">Pasadena</option>
          </select>
          <br></br>
          <button className="fetch-button" type="submit">Submit</button>
        </form>
        {this.showData()}
      </div>
    );
  }
}

export default App;
