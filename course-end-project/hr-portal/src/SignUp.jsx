import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

function SignUp() {
	const [formData, setFormData] = useState({
		// Personal Information
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		dateOfBirth: '',

		// Account Information
		password: '',
		confirmPassword: '',

		// Employment Information
		department: '',
		position: '',
		joiningDate: '',
		employeeId: '',

		// Additional Information
		address: '',
		emergencyContact: '',
		emergencyPhone: '',
	});

	const [errors, setErrors] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [step, setStep] = useState(1);
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		// Clear error when user starts typing
		if (errors[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: '',
			}));
		}
	};

	const validateStep1 = () => {
		const newErrors = {};

		if (!formData.firstName.trim())
			newErrors.firstName = 'First name is required';
		if (!formData.lastName.trim())
			newErrors.lastName = 'Last name is required';
		if (!formData.email.trim()) {
			newErrors.email = 'Email is required';
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = 'Email is invalid';
		}
		if (!formData.phone.trim()) {
			newErrors.phone = 'Phone number is required';
		} else if (
			!/^[+]?[1-9][\d]{0,15}$/.test(
				formData.phone.replace(/[\s\-()]/g, ''),
			)
		) {
			newErrors.phone = 'Phone number is invalid';
		}
		if (!formData.dateOfBirth)
			newErrors.dateOfBirth = 'Date of birth is required';

		return newErrors;
	};

	const validateStep2 = () => {
		const newErrors = {};

		if (!formData.password) {
			newErrors.password = 'Password is required';
		} else if (formData.password.length < 6) {
			newErrors.password = 'Password must be at least 6 characters';
		}
		if (!formData.confirmPassword) {
			newErrors.confirmPassword = 'Please confirm your password';
		} else if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = 'Passwords do not match';
		}
		if (!formData.department)
			newErrors.department = 'Department is required';
		if (!formData.position.trim())
			newErrors.position = 'Position is required';
		if (!formData.joiningDate)
			newErrors.joiningDate = 'Joining date is required';
		if (!formData.employeeId.trim())
			newErrors.employeeId = 'Employee ID is required';

		return newErrors;
	};

	const validateStep3 = () => {
		const newErrors = {};

		if (!formData.address.trim()) newErrors.address = 'Address is required';
		if (!formData.emergencyContact.trim())
			newErrors.emergencyContact = 'Emergency contact name is required';
		if (!formData.emergencyPhone.trim()) {
			newErrors.emergencyPhone = 'Emergency phone is required';
		} else if (
			!/^[+]?[1-9][\d]{0,15}$/.test(
				formData.emergencyPhone.replace(/[\s\-()]/g, ''),
			)
		) {
			newErrors.emergencyPhone = 'Emergency phone number is invalid';
		}

		return newErrors;
	};

	const nextStep = () => {
		let stepErrors = {};

		if (step === 1) stepErrors = validateStep1();
		else if (step === 2) stepErrors = validateStep2();
		else if (step === 3) stepErrors = validateStep3();

		if (Object.keys(stepErrors).length > 0) {
			setErrors(stepErrors);
			return;
		}

		setErrors({});
		setStep(step + 1);
	};

	const prevStep = () => {
		setStep(step - 1);
		setErrors({});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const step3Errors = validateStep3();
		if (Object.keys(step3Errors).length > 0) {
			setErrors(step3Errors);
			return;
		}

		setIsLoading(true);
		setErrors({});

		try {
			// Check if email already exists
			const existingUsers = await axios.get(
				'http://localhost:3000/logins',
			);
			const emailExists = existingUsers.data.some(
				(user) => user.emailId === formData.email,
			);

			if (emailExists) {
				setErrors({
					email: 'Email already registered. Please use a different email.',
				});
				setStep(1);
				setIsLoading(false);
				return;
			}

			// Create login credentials
			const loginData = {
				emailId: formData.email,
				password: formData.password,
				typeofuser: 'employee',
			};

			// Create employee profile
			const employeeData = {
				name: formData.firstName,
				lname: formData.lastName,
				age:
					new Date().getFullYear() -
					new Date(formData.dateOfBirth).getFullYear(),
				department: formData.department,
				position: formData.position,
				email: formData.email,
				phone: formData.phone,
				joiningDate: formData.joiningDate,
				employeeId: formData.employeeId,
				dateOfBirth: formData.dateOfBirth,
				address: formData.address,
				emergencyContact: formData.emergencyContact,
				emergencyPhone: formData.emergencyPhone,
				leaveStatus: 'available',
				appliedLeave: 'no',
				createdAt: new Date().toISOString(),
			};

			// Add to login system
			await axios.post('http://localhost:3000/logins', loginData);

			// Add to employee database
			await axios.post('http://localhost:3000/employees', employeeData);

			// Success - redirect to login
			alert(
				'Registration successful! Please login with your credentials.',
			);
			navigate('/');
		} catch (error) {
			console.error('Registration error:', error);
			setErrors({
				submit: 'Registration failed. Please try again or contact HR for assistance.',
			});
		} finally {
			setIsLoading(false);
		}
	};

	const renderStep1 = () => (
		<div className='signup-step'>
			<h3>Personal Information</h3>
			<div className='row'>
				<div className='col-md-6'>
					<div className='form-group'>
						<label>First Name *</label>
						<input
							type='text'
							name='firstName'
							value={formData.firstName}
							onChange={handleChange}
							className={`form-control ${
								errors.firstName ? 'is-invalid' : ''
							}`}
							placeholder='Enter your first name'
						/>
						{errors.firstName && (
							<div className='invalid-feedback'>
								{errors.firstName}
							</div>
						)}
					</div>
				</div>
				<div className='col-md-6'>
					<div className='form-group'>
						<label>Last Name *</label>
						<input
							type='text'
							name='lastName'
							value={formData.lastName}
							onChange={handleChange}
							className={`form-control ${
								errors.lastName ? 'is-invalid' : ''
							}`}
							placeholder='Enter your last name'
						/>
						{errors.lastName && (
							<div className='invalid-feedback'>
								{errors.lastName}
							</div>
						)}
					</div>
				</div>
			</div>

			<div className='form-group'>
				<label>Email Address *</label>
				<input
					type='email'
					name='email'
					value={formData.email}
					onChange={handleChange}
					className={`form-control ${
						errors.email ? 'is-invalid' : ''
					}`}
					placeholder='Enter your email address'
				/>
				{errors.email && (
					<div className='invalid-feedback'>{errors.email}</div>
				)}
			</div>

			<div className='row'>
				<div className='col-md-6'>
					<div className='form-group'>
						<label>Phone Number *</label>
						<input
							type='tel'
							name='phone'
							value={formData.phone}
							onChange={handleChange}
							className={`form-control ${
								errors.phone ? 'is-invalid' : ''
							}`}
							placeholder='+1 (555) 123-4567'
						/>
						{errors.phone && (
							<div className='invalid-feedback'>
								{errors.phone}
							</div>
						)}
					</div>
				</div>
				<div className='col-md-6'>
					<div className='form-group'>
						<label>Date of Birth *</label>
						<input
							type='date'
							name='dateOfBirth'
							value={formData.dateOfBirth}
							onChange={handleChange}
							className={`form-control ${
								errors.dateOfBirth ? 'is-invalid' : ''
							}`}
						/>
						{errors.dateOfBirth && (
							<div className='invalid-feedback'>
								{errors.dateOfBirth}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);

	const renderStep2 = () => (
		<div className='signup-step'>
			<h3>Account & Employment Details</h3>
			<div className='row'>
				<div className='col-md-6'>
					<div className='form-group'>
						<label>Password *</label>
						<input
							type='password'
							name='password'
							value={formData.password}
							onChange={handleChange}
							className={`form-control ${
								errors.password ? 'is-invalid' : ''
							}`}
							placeholder='Enter password (min 6 characters)'
						/>
						{errors.password && (
							<div className='invalid-feedback'>
								{errors.password}
							</div>
						)}
					</div>
				</div>
				<div className='col-md-6'>
					<div className='form-group'>
						<label>Confirm Password *</label>
						<input
							type='password'
							name='confirmPassword'
							value={formData.confirmPassword}
							onChange={handleChange}
							className={`form-control ${
								errors.confirmPassword ? 'is-invalid' : ''
							}`}
							placeholder='Confirm your password'
						/>
						{errors.confirmPassword && (
							<div className='invalid-feedback'>
								{errors.confirmPassword}
							</div>
						)}
					</div>
				</div>
			</div>

			<div className='row'>
				<div className='col-md-6'>
					<div className='form-group'>
						<label>Department *</label>
						<select
							name='department'
							value={formData.department}
							onChange={handleChange}
							className={`form-control ${
								errors.department ? 'is-invalid' : ''
							}`}
						>
							<option value=''>Select Department</option>
							<option value='IT'>Information Technology</option>
							<option value='HR'>Human Resources</option>
							<option value='Marketing'>Marketing</option>
							<option value='Finance'>Finance</option>
							<option value='Sales'>Sales</option>
							<option value='Operations'>Operations</option>
						</select>
						{errors.department && (
							<div className='invalid-feedback'>
								{errors.department}
							</div>
						)}
					</div>
				</div>
				<div className='col-md-6'>
					<div className='form-group'>
						<label>Position *</label>
						<input
							type='text'
							name='position'
							value={formData.position}
							onChange={handleChange}
							className={`form-control ${
								errors.position ? 'is-invalid' : ''
							}`}
							placeholder='Enter your job position'
						/>
						{errors.position && (
							<div className='invalid-feedback'>
								{errors.position}
							</div>
						)}
					</div>
				</div>
			</div>

			<div className='row'>
				<div className='col-md-6'>
					<div className='form-group'>
						<label>Employee ID *</label>
						<input
							type='text'
							name='employeeId'
							value={formData.employeeId}
							onChange={handleChange}
							className={`form-control ${
								errors.employeeId ? 'is-invalid' : ''
							}`}
							placeholder='Enter employee ID'
						/>
						{errors.employeeId && (
							<div className='invalid-feedback'>
								{errors.employeeId}
							</div>
						)}
					</div>
				</div>
				<div className='col-md-6'>
					<div className='form-group'>
						<label>Joining Date *</label>
						<input
							type='date'
							name='joiningDate'
							value={formData.joiningDate}
							onChange={handleChange}
							className={`form-control ${
								errors.joiningDate ? 'is-invalid' : ''
							}`}
						/>
						{errors.joiningDate && (
							<div className='invalid-feedback'>
								{errors.joiningDate}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);

	const renderStep3 = () => (
		<div className='signup-step'>
			<h3>Additional Information</h3>
			<div className='form-group'>
				<label>Address *</label>
				<textarea
					name='address'
					value={formData.address}
					onChange={handleChange}
					className={`form-control ${
						errors.address ? 'is-invalid' : ''
					}`}
					rows='3'
					placeholder='Enter your full address'
				/>
				{errors.address && (
					<div className='invalid-feedback'>{errors.address}</div>
				)}
			</div>

			<div className='row'>
				<div className='col-md-6'>
					<div className='form-group'>
						<label>Emergency Contact Name *</label>
						<input
							type='text'
							name='emergencyContact'
							value={formData.emergencyContact}
							onChange={handleChange}
							className={`form-control ${
								errors.emergencyContact ? 'is-invalid' : ''
							}`}
							placeholder='Emergency contact person'
						/>
						{errors.emergencyContact && (
							<div className='invalid-feedback'>
								{errors.emergencyContact}
							</div>
						)}
					</div>
				</div>
				<div className='col-md-6'>
					<div className='form-group'>
						<label>Emergency Contact Phone *</label>
						<input
							type='tel'
							name='emergencyPhone'
							value={formData.emergencyPhone}
							onChange={handleChange}
							className={`form-control ${
								errors.emergencyPhone ? 'is-invalid' : ''
							}`}
							placeholder='+1 (555) 987-6543'
						/>
						{errors.emergencyPhone && (
							<div className='invalid-feedback'>
								{errors.emergencyPhone}
							</div>
						)}
					</div>
				</div>
			</div>

			{errors.submit && (
				<div className='alert alert-danger mt-3'>{errors.submit}</div>
			)}
		</div>
	);

	return (
		<div className='signup-container'>
			<div className='signup-card'>
				<div className='signup-header'>
					<h2>Employee Registration</h2>
					<p>
						Join our organization - Complete your registration in 3
						steps
					</p>
				</div>

				<div className='progress-bar'>
					<div className='progress-step'>
						<div
							className={`step-circle ${
								step >= 1 ? 'active' : ''
							}`}
						>
							1
						</div>
						<span>Personal Info</span>
					</div>
					<div className='progress-line'></div>
					<div className='progress-step'>
						<div
							className={`step-circle ${
								step >= 2 ? 'active' : ''
							}`}
						>
							2
						</div>
						<span>Account & Job</span>
					</div>
					<div className='progress-line'></div>
					<div className='progress-step'>
						<div
							className={`step-circle ${
								step >= 3 ? 'active' : ''
							}`}
						>
							3
						</div>
						<span>Additional Info</span>
					</div>
				</div>

				<form
					onSubmit={
						step === 3 ? handleSubmit : (e) => e.preventDefault()
					}
				>
					{step === 1 && renderStep1()}
					{step === 2 && renderStep2()}
					{step === 3 && renderStep3()}

					<div className='signup-buttons'>
						{step > 1 && (
							<button
								type='button'
								className='btn btn-secondary'
								onClick={prevStep}
								disabled={isLoading}
							>
								Previous
							</button>
						)}

						{step < 3 ? (
							<button
								type='button'
								className='btn btn-primary'
								onClick={nextStep}
							>
								Next Step
							</button>
						) : (
							<button
								type='submit'
								className='btn btn-success'
								disabled={isLoading}
							>
								{isLoading
									? 'Creating Account...'
									: 'Complete Registration'}
							</button>
						)}
					</div>
				</form>

				<div className='signup-footer'>
					<p>
						Already have an account?{' '}
						<Link to='/'>Sign in here</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default SignUp;
