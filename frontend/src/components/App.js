import '../static/App.css';
import Metadata from './Metadata.js';
import Table from "./Table.js"
import SuccessChart from "./SuccessChart.js";
import Logo from "../tmc.png";

function App() {
  return (
    <div className="App">
      <div class="tmc_container">
        <h1> <img src={Logo} width="15%"></img> TMC Sync-In Monitor</h1>
        <Metadata />
      </div>

      {/* Line chart with success rate mapped */}
      <div class="tmc_container">
        < SuccessChart />
      </div>

      {/* Current sync status in table format */}
      <div class="tmc_container">
        < Table />
      </div>
    </div>
  );
}


export default App;
