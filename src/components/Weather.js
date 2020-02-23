import React from "react"
import 'open-weather-icons/scss/open-weather-icons.scss'
import '../stylesheets/weather_component.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Forecast from "./Forecast"


const API_KEY = process.env.REACT_APP_WEATHER_API_KEY

class Weather extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: {},
      date: new Date(),
      currentTemperature: 0,
      currentHumidity: 0,
      currentPresure: 0,
      currentWind: 0,
      name: '',
      icon: 'owi owi-04n owi-5x',
      loading: true
    }
  }

  componentDidMount() {
    this.getWeather();
  }

  getWeather = () => {
    let weatherURL = `https://api.openweathermap.org/data/2.5/weather?id=768081&APPID=${API_KEY}&units=metric`

    fetch(weatherURL)
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          data: data,
          currentTemperature: Math.round(data.main.temp),
          currentPresure: data.main.pressure,
          currentHumidity: data.main.humidity,
          currentWind: data.wind.speed,
          name: data.name,
          icon: `owi owi-${data.weather[0].icon} owi-5x`
        })
        console.log(data)
      })
  }


  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row mt-5 d-flex">
            <div className="col-sm-12 col-md-12 col-lg-4 flex-grow-1">
              <div className="card current-weather-block border-0 bg-gradient text-white">
                <div className="current-weather-top mt-4 p-2 d-flex flex-column align-items-center justify-content-center">
                  <span className="m-0 p-0 mb-2 h4">
                    <FontAwesomeIcon icon="map-marker-alt" className="mr-2" />
                    {this.state.name}
                  </span>
                  <span className="small">{this.state.date.toLocaleDateString()}</span>
                </div>
                <hr />
                <div className="current-weather-main p-2 flex-grow-1 d-flex align-items-center justify-content-center ">
                  <div className="d-flex align-items-center text-white">
                    <div className="text-center">
                      <i className={this.state.icon}></i>
                      <div className="display-3">
                        <b><b>{this.state.currentTemperature} °C</b></b>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="current-weather-bottom pl-5 mb-4">
                  <span className="">
                    <FontAwesomeIcon icon='tachometer-alt' className="mr-2" />
                    Pressure: <b>{this.state.currentPresure} hPa</b>
                  </span><br />
                  <span className="">
                    <FontAwesomeIcon icon="tint" className="mr-2" />
                    Humidity: <b>{this.state.currentHumidity} %</b>
                  </span><br />
                  <span className="">
                    <FontAwesomeIcon icon='wind' className="mr-2" />

                    Wind: <b>{this.state.currentWind} m/s</b>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-8 mt-4 mt-lg-0">
              <Forecast />
            </div>
          </div>
        </div>



        <div className="weather d-flex flex-column align-items-center">
          <div className="pr-4 d-flex align-items-center">

          </div>

        </div>
      </React.Fragment>
    );
  }
}

export default Weather