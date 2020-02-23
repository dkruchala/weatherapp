import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Navbar extends React.Component {
	render() {

		return (
			<React.Fragment>
				<nav className="navbar navbar-expand-lg navbar-light bg-light py-3">
					<div className="container">
						<div className="navbar-brand" >
							<FontAwesomeIcon icon='temperature-high' className="mr-2" />
							<b>WeatherAPP</b>
							<span className="text-muted small"> {'{by dkruchala}'}</span>
						</div>
						<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>

						<div className="collapse navbar-collapse" id="navbarSupportedContent">
							<ul className="navbar-nav ml-auto">
								<li className="nav-item active">
									<button className="btn rounded-pill btn-secondary" onClick={() => { window.open('https://github.com/dkruchala/weatherapp') }}>
										<FontAwesomeIcon icon={['fab', 'github']} className="mr-2" />
										GITHUB
									</button>
								</li>
							</ul>
						</div>
					</div>
				</nav>
			</React.Fragment>
		)
	}
}
export default Navbar
