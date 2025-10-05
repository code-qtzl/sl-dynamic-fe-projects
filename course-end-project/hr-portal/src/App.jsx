import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login';
import SignUp from './SignUp';
import AccountCreation from './AccountCreation';
import HrDashboard from './HrDashboard';
import EmployeeDashboard from './EmployeeDashboard';
import AddEmployee from './AddEmployee';
import DisplayEmployee from './DisplayEmployee';

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<Login />}></Route>
				<Route path='/signup' element={<SignUp />}></Route>
				<Route
					path='/accountCreate'
					element={<AccountCreation />}
				></Route>

				<Route path='/hrDashboard/*' element={<HrDashboard />}>
					<Route path='addEmployee' element={<AddEmployee />}></Route>
					<Route
						path='displayEmployee'
						element={<DisplayEmployee />}
					></Route>
					<Route
						path='attendance-requests'
						element={<div>HR Attendance Management</div>}
					></Route>
					<Route
						path='employees'
						element={<DisplayEmployee />}
					></Route>
					<Route
						path='leave-requests'
						element={<div>Leave Requests Management</div>}
					></Route>
					<Route path='reports' element={<div>Reports</div>}></Route>
					<Route
						path='settings'
						element={<div>Settings</div>}
					></Route>
				</Route>

				<Route
					path='/employeeDashboard/*'
					element={<EmployeeDashboard />}
				>
					<Route
						path='profile'
						element={<div>My Profile</div>}
					></Route>
					<Route
						path='leave'
						element={<div>Leave Management</div>}
					></Route>
					<Route
						path='attendance'
						element={<div>Attendance History</div>}
					></Route>
					<Route
						path='regularization'
						element={<div>Attendance Regularization</div>}
					></Route>
					<Route
						path='payslips'
						element={<div>Payslips</div>}
					></Route>
				</Route>
			</Routes>
		</>
	);
}

export default App;
