import '../static/App.css';
import Metadata from './Metadata.js';
import Table from "./Table.js"
import SuccessChart from "./SuccessChart.js";

function App() {
  return (
    <div className="App">
      <div class="tmc_container">
        <h1>TMC Sync-In Monitor</h1>
        <Metadata />
      </div>
      
      {/* Show success rate over time */}
      <div class="tmc_container">
        < Table />
      </div>
    </div>
  );
}


export default App;
