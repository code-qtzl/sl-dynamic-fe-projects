import RandomNumberDisplay from './components/RandomNumberDisplay';
import TaskManager from './components/TaskManager';
import Counter from './components/Counter';
import DataFetcher from './components/DataFetcher';
import { TaskProvider } from './context/TaskContext';
function App() {
	return (
		<TaskProvider>
			<div className='App'>
				<h1>React Hooks Demo (Vite)</h1>
				<RandomNumberDisplay />
				<Counter />
				<TaskManager />
				<DataFetcher />
			</div>
		</TaskProvider>
	);
}
export default App;
