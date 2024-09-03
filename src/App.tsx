import DataTable from "./DataTable/DataTable";
import { USER } from "./utils/user.data";
import "./App.css";

function App() {
	return (
		<div className="App">
			<header className="App-header">Header</header>
			<div>
				<DataTable data={USER} />
			</div>
		</div>
	);
}

export default App;
