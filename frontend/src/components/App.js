import '../static/App.css';
import Table from "./Table.js"
import SuccessChart from "./SuccessChart.js";

function App() {
  return (
    <div className="App">
      <h1>TMC Sync-In Monitor</h1>
      
      {/* Show success rate over time */}
      <div class="tmc__success_rate">
        < Table />
      </div>
      
      {/* All tasks from most recent run */}
      <div class="tmc__most_recent_run">
        < SuccessChart />
      </div>
    </div>
  );
}


export default App;
