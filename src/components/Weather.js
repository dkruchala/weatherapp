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
      clouds: 0,
      name: '',
      icon: 'owi owi-04n owi-5x',
      weather_description: '',
      dusk: '',
      dawn: '',
      loading: true
    }
  }

  componentDidMount() {
    this.getWeather();
  }

  getWeather = () => {
    let weatherURL = `https://api.openweathermap.org/data/2.5/weather?id=${this.props.area_id}&APPID=${API_KEY}&units=metric`

    fetch(weatherURL)
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          data: data,
          currentTemperature: Math.round(data.main.temp),
          currentPresure: data.main.pressure,
          currentHumidity: data.main.humidity,
          currentWind: data.wind.speed,
          dawn: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
          dusk: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
          clouds: data.clouds.all,
          name: data.name,
          weather_description: data.weather[0].description.toUpperCase(),
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
                      <div>{this.state.weather_description}</div><br />
                      <i className={this.state.icon}></i>
                      <div className="display-3">
                        <b><b>{this.state.currentTemperature} °C</b></b>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="current-weather-bottom">
                  <div className="row no-gutters" style={{ borderTop: '1px solid rgba(0,122,122,0.2)' }}>

                    <div className="col-6 py-2" style={{ borderRight: '1px solid rgba(0,122,122,0.2)' }} >
                      <div className="media px-3 d-flex align-items-center">
                        <div className="mr-3" style={{ width: '2em' }}>
                          <FontAwesomeIcon icon="tachometer-alt" size="2x" />
                        </div>
                        <div className="media-body">
                          <div className="mt-0 small"><b>PRESSURE:</b></div>
                          {this.state.currentPresure} hPa
                        </div>
                      </div>
                    </div>

                    <div className="col-6 py-2  " style={{ borderRight: '1px solid rgba(0,122,122,0.2)' }} >
                      <div className="media px-3 d-flex align-items-center">
                        <div className="mr-3" style={{ width: '2em' }}>
                          <FontAwesomeIcon icon="tint" size="2x" />
                        </div>
                        <div className="media-body">
                          <div className="mt-0 small"><b>HUMIDITY:</b></div>
                          {this.state.currentHumidity} %
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="row no-gutters" style={{ borderTop: '1px solid rgba(0,122,122,0.2)' }}>

                    <div className="col-6 py-2 " style={{ borderRight: '1px solid rgba(0,122,122,0.2)' }} >
                      <div className="media px-3 d-flex align-items-center">
                        <div className="mr-3" style={{ width: '2em' }}>
                          <FontAwesomeIcon icon="wind" size="2x" />
                        </div>

                        <div className="media-body">
                          <div className="mt-0 small"><b>WIND:</b></div>
                          {this.state.currentWind} m/s
                        </div>
                      </div>
                    </div>

                    <div className="col-6 py-2" style={{ borderRight: '1px solid rgba(0,122,122,0.2)' }} >
                      <div className="media px-3 d-flex align-items-center">
                        <div className="mr-3" style={{ width: '2em' }}>
                          <FontAwesomeIcon icon="cloud" size="2x" />
                        </div>
                        <div className="media-body">
                          <div className="mt-0 small"><b>CLOUDS:</b></div>
                          {this.state.clouds} %
                        </div>
                      </div>
                    </div>


                  </div>
                  <div className="row no-gutters" style={{ borderTop: '1px solid rgba(0,122,122,0.2)' }}>
                    <div className="col-6 py-2" style={{ borderRight: '1px solid rgba(0,122,122,0.2)' }} >
                      <div className="media px-3 d-flex align-items-center">
                        <div className="mr-3" style={{ width: '2em' }}>
                          <FontAwesomeIcon icon="sun" size="2x" />
                        </div>
                        <div className="media-body">
                          <div className="mt-0 small"><b>SUNRISE:</b></div>
                          {this.state.dawn}
                        </div>
                      </div>
                    </div>
                    <div className="col-6 py-2" >
                      <div className="media px-3 d-flex align-items-center">
                        <div className="mr-3" style={{ width: '2em' }}>
                          <FontAwesomeIcon icon="moon" className="mr-3" size="2x" />
                        </div>
                        <div className="media-body">
                          <div className="mt-0 small"><b>SUNSET:</b></div>
                          {this.state.dusk}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-8 mt-4 mt-lg-0">
              <Forecast area_id={this.props.area_id} />
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