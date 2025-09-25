const API_URL = 'http://localhost:3000/appointments';
// Fetch and display appointments
async function fetchAppointments() {
	const res = await fetch(API_URL);
	const appointments = await res.json();

	const tableBody = document.getElementById('appointmentsList');
	tableBody.innerHTML = '';
	appointments.forEach((appointment) => {
		const row = document.createElement('tr');
		row.innerHTML = `
 <td>${appointment.name}</td>
 <td>${appointment.service}</td>
 <td>${appointment.date}</td>
 <td>${appointment.time}</td>
 <td>
 <span class="badge ${
		appointment.status === 'Confirmed' ? 'bg-success' : 'bg-warning'
 }">
 ${appointment.status}
 </span>
 </td>
 <td>
 <button class="btn btn-sm btn-warning"
onclick="rescheduleAppointment(${appointment.id})">Reschedule</button>
 <button class="btn btn-sm btn-danger"
onclick="cancelAppointment(${appointment.id})">Cancel</button>
 </td>
 `;
		tableBody.appendChild(row);
	});
}
// Book a new appointment
async function bookAppointment() {
	const name = document.getElementById('userName').value;
	const service = document.getElementById('serviceType').value;
	const date = document.getElementById('appointmentDate').value;
	const time = document.getElementById('appointmentTime').value;
	if (!name || !date || !time) {
		alert('Please fill in all fields!');
		return;
	}
	const newAppointment = { name, service, date, time, status: 'Pending' };
	await fetch(API_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(newAppointment),
	});
	fetchAppointments();
}
// Reschedule appointment
async function rescheduleAppointment(id) {
	const newDate = prompt('Enter new date (YYYY-MM-DD):');
	const newTime = prompt('Enter new time (HH:MM AM/PM):');
	if (!newDate || !newTime) {
		alert('Invalid input!');
		return;
	}
	await fetch(`${API_URL}/${id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ date: newDate, time: newTime }),
	});
	fetchAppointments();
}
// Cancel appointment
async function cancelAppointment(id) {
	await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
	fetchAppointments();
}
// Real-time polling every 3 seconds
setInterval(fetchAppointments, 3000);
// Initial load
fetchAppointments();
