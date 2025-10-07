import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login';
import SignUp from './SignUp';
import HrDashboard from './HrDashboard';
import EmployeeDashboard from './EmployeeDashboard';
import AddEmployee from './AddEmployee';
import DisplayEmployee from './DisplayEmployee';
import LeaveRequest from './LeaveRequest';
import LeaveHistory from './LeaveHistory';
import LeaveManagement from './LeaveManagement';

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<Login />}></Route>
				<Route path='/signup' element={<SignUp />}></Route>

				<Route path='/hrDashboard/*' element={<HrDashboard />}>
					<Route path='addEmployee' element={<AddEmployee />}></Route>
					<Route
						path='displayEmployee'
						element={<DisplayEmployee />}
					></Route>
					<Route
						path='employees'
						element={<DisplayEmployee />}
					></Route>
					<Route
						path='leaveManagement'
						element={<LeaveManagement />}
					></Route>
				</Route>

				<Route
					path='/employeeDashboard/*'
					element={<EmployeeDashboard />}
				>
					<Route
						path='leaveRequest'
						element={<LeaveRequest />}
					></Route>
					<Route
						path='leaveHistory'
						element={<LeaveHistory />}
					></Route>
				</Route>
			</Routes>
		</>
	);
}

export default App;
