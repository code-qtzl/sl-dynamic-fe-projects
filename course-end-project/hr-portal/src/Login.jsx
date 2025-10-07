import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

function Login() {
	const [emailId, setEmailId] = useState('');
	const [password, setPassword] = useState('');
	const [typeOfUser, setTypeOfUser] = useState('');
	const [error, setError] = useState('');
	const URL = 'http://localhost:3000/logins';
	const navigate = useNavigate();

	const signIn = async (event) => {
		event.preventDefault();
		setError('');

		try {
			const loginDetails = await axios.get(URL);
			const result = loginDetails.data.find(
				(l) =>
					l.emailId === emailId &&
					l.password === password &&
					l.typeofuser === typeOfUser,
			);

			if (!result) {
				setError(
					'Invalid credentials. Please check your email, password, and user type.',
				);
			} else {
				// Store user session
				localStorage.setItem(
					'userSession',
					JSON.stringify({
						emailId,
						userType: typeOfUser,
						isAuthenticated: true,
					}),
				);

				if (typeOfUser === 'hr') {
					navigate('/hrDashboard');
				} else {
					navigate('/employeeDashboard');
				}
			}
		} catch (error) {
			console.error('Login error:', error);
			setError('Login failed. Please try again later.');
		}
	};

	return (
		<div className='login-container'>
			<div className='login-background'>
				<div className='login-card'>
					<div className='login-header'>
						<div className='logo'>
							<span className='logo-icon'>🏢</span>
							<span className='logo-text'>HR Portal</span>
						</div>
						<h2>Welcome Back</h2>
						<p>Please sign in to your account</p>
					</div>

					<form onSubmit={signIn} className='login-form'>
						{error && (
							<div className='error-message'>
								<span className='error-icon'>⚠️</span>
								{error}
							</div>
						)}

						<div className='form-group'>
							<label htmlFor='email'>Email Address</label>
							<input
								type='email'
								id='email'
								value={emailId}
								onChange={(event) =>
									setEmailId(event.target.value)
								}
								placeholder='Enter your email'
								required
							/>
						</div>

						<div className='form-group'>
							<label htmlFor='password'>Password</label>
							<input
								type='password'
								id='password'
								value={password}
								onChange={(event) =>
									setPassword(event.target.value)
								}
								placeholder='Enter your password'
								required
							/>
						</div>

						<div className='form-group'>
							<label>User Type</label>
							<div className='radio-group'>
								<label className='radio-option'>
									<input
										type='radio'
										name='typeOfUser'
										value='hr'
										checked={typeOfUser === 'hr'}
										onChange={(event) =>
											setTypeOfUser(event.target.value)
										}
									/>
									<span className='radio-label'>
										<span className='role-icon'>👨‍💼</span>
										HR Manager
									</span>
								</label>
								<label className='radio-option'>
									<input
										type='radio'
										name='typeOfUser'
										value='employee'
										checked={typeOfUser === 'employee'}
										onChange={(event) =>
											setTypeOfUser(event.target.value)
										}
									/>
									<span className='radio-label'>
										<span className='role-icon'>👤</span>
										Employee
									</span>
								</label>
							</div>
						</div>

						<div className='form-actions'>
							<button
								type='submit'
								className='btn btn-primary remove-spinner'
								disabled={!emailId || !password || !typeOfUser}
							>
								Sign In
							</button>
						</div>

						<div className='login-footer'>
							<p>
								Don't have an account?{' '}
								<Link to='/signup'>Sign Up</Link>
							</p>
						</div>
					</form>

					{/* Demo Credentials */}
					<div className='demo-credentials'>
						<h4>Demo Credentials:</h4>
						<div className='demo-info'>
							<div className='demo-account'>
								<strong>HR Manager:</strong>
								<br />
								Email: hr@gmail.com
								<br />
								Password: hr@123
							</div>
							<div className='demo-account'>
								<strong>Employee:</strong>
								<br />
								Email: me@mail.com
								<br />
								Password: p@123
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Login;
