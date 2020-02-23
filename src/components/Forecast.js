import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Plot from '../components/Plot'
import '../stylesheets/forecast.scss'

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY

class Forecast extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      forecast: [],
      slicer: 5
    }
  }

  componentDidMount() {
    this.getForecast()
    this.updateDimensions()
    window.addEventListener("resize", this.updateDimensions)
  }

  componeDidUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
  }
  getForecast = () => {
    let weatherURL = `https://api.openweathermap.org/data/2.5/forecast?id=768081&appid=${API_KEY}&units=metric`
    let temp = []
    fetch(weatherURL)
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          forecast: data.list
        })
      })
  }

  getDateOrTime = (variant, dt) => {
    let date = new Date(dt * 1000)
    if (variant === 'date') {
      date = date.toLocaleDateString()
      return date
    }
    else if (variant === 'time') {
      let hours = date.getHours()
      let minutes = `0${date.getMinutes()}`
      let formatted_time = `${hours}:${minutes.substr(-2)}`
      return formatted_time
    }
  }

  sliceForecast = (forecast_data) => {
    let slides = []
    for (let i = 0; i < forecast_data.length; i += this.state.slicer) {
      slides.push(forecast_data.slice(i, i + this.state.slicer))
    }
    return slides
  }

  updateDimensions = () => {
    if (window.innerWidth <= 300) {
      this.setState({
        slicer: 1
      })
    }
    else if (window.innerWidth > 300 && window.innerWidth < 768) {
      this.setState({
        slicer: 2
      })
    }
    else if (window.innerWidth >= 768 && window.innerWidth < 1366) {
      this.setState({
        slicer: 3
      })
    }
    else if (window.innerWidth >= 1366) {
      this.setState({
        slicer: 5
      })
    }
  }

  render() {

    let slides = this.sliceForecast(this.state.forecast)

    const ForecastCarousel = () => {
      return (
        <Carousel interval={false} className="forecast-carousel">
          {
            slides.map((slide, index) => (
              <Carousel.Item key={index} >
                <div className="row d-flex flex-nowrap">
                  {
                    slide.map(item => (
                      <div className="col" key={item.dt}>
                        <div className="card bg-gradient border-0 text-white text-center forecast-item d-flex">
                          <div className="mt-2">
                            <div className="small"><b>{this.getDateOrTime('date', item.dt)}</b></div>
                            <div className="small">{this.getDateOrTime('time', item.dt)}</div>
                          </div>

                          <div className="d-flex align-items-center justify-content-center flex-grow-1">
                            <i className={`owi owi-${item.weather[0].icon} owi-4x`} />
                          </div>

                          <div className="pb-3">
                            <div className="row no-gutters m-0 p-0 pb-2">
                              <div className="col-6 text-center">
                                <span className="small">min</span><br />
                                <span className=""><b>{Math.round(item.main.temp_min)}°C</b></span>
                              </div>
                              <div className="col-6 text-center">
                                <span className="small">max</span><br />
                                <span className=""><b>{Math.round(item.main.temp_max)}°C</b></span>
                              </div>
                            </div>
                            <div>
                              <div className="small">Pressure: <b>{item.main.pressure} hPa</b></div>
                              <div className="small">Humidity: <b>{item.main.humidity} %</b></div>
                            </div>

                          </div>
                        </div>
                      </div>

                    ))
                  }
                </div>
              </Carousel.Item>
            ))
          }
        </Carousel>
      )
    }



    return (
      <React.Fragment>
        <ForecastCarousel />
        <div className="card flex-grow-1">
          {
            this.state.forecast.length > 0 ?
              <Plot data={this.state.forecast} />
              : ''
          }

        </div>
      </React.Fragment>
    )
  }
}

export default Forecast