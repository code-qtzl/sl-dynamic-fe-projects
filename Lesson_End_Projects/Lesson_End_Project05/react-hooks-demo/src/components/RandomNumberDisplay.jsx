import useRandomNumber from '../hooks/useRandomNumber';
export default function RandomNumberDisplay() {
	const number = useRandomNumber();
	return (
		<div>
			<h2>Live Random Number:</h2>
			<p>{number}</p>
		</div>
	);
}
