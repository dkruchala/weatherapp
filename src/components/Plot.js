import React from 'react'
import { Line } from 'react-chartjs-2';

class Plot extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      input_data: this.props.data,
      converted_data: { labels: [], datasets: [] },
    }
  }

  componentDidMount() {
    this.convertData()
  }

  convertData = () => {

    let data_input = this.state.input_data

    let data_labels = []
    let temperature = []

    data_input.map(item => {
      let date = new Date(item.dt * 1000)
      let hours = `0${date.getHours()}`
      let minutes = `0${date.getMinutes()}`
      data_labels.push(`${date.getDate()}.${('0' + (date.getMonth() + 1)).substr(-2)} ${hours.substr(-2)}:${minutes.substr(-2)}`)
      temperature.push(Math.round(item.main.temp))
      return false
    })

    let temperature_dataset = {
      labels: data_labels,
      datasets: [{
        label: 'Temperature',
        backgroundColor: "rgba(116, 235, 213, 1)",
        borderColor: [
          'rgba(111, 209, 191, 1)',
        ],
        data: temperature
      }]
    }

    this.setState({
      converted_data: temperature_dataset
    })
  }

  render() {

    const options = {
      responsive: true
    }

    return (
      <React.Fragment>
        <div className="chart-container p-2 pr-3" style={{ position: 'relative', height: '100%', width: '100%' }}>
          <Line data={this.state.converted_data} options={options} />
        </div>

      </React.Fragment>
    )
  }
}

export default Plot