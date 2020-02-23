import React from 'react';
import 'bootstrap/dist/js/bootstrap'
import 'jquery/dist/jquery'
import 'popper.js/dist/popper'
import './stylesheets/application.scss'
import Weather from './components/Weather'
import Navbar from './components/Navbar'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas)
library.add(fab)

function App() {
  return (
    <div className="App">
      <Navbar />
      <Weather area_id={768081} />
    </div>
  );
}

export default App;
