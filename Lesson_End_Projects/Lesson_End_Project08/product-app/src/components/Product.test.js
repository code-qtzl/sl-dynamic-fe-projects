import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ProductList from './ProductList';
describe('ProductList Component', () => {
	beforeEach(() => {
		fetch.resetMocks();
	});
	test('renders ProductList component without crashing', async () => {
		fetch.mockResponseOnce(JSON.stringify([]));
		await waitFor(() => render(<ProductList />)); // ✅wrap render
	});
	test('displays loading message initially', async () => {
		fetch.mockResponseOnce(() => new Promise(() => {})); // keeps loading
		await waitFor(() => {
			render(<ProductList />);
			expect(screen.getByText(/Loading/i)).toBeInTheDocument();
		});
	});
	test('fetches and displays a mocked product', async () => {
		fetch.mockResponseOnce(
			JSON.stringify([
				{
					id: 1,
					title: 'Mocked Product',
					price: 99.99,
					image: 'mock.jpg',
					category: 'test-category',
				},
			]),
		);
		render(<ProductList />);
		await waitFor(() =>
			expect(screen.getByText(/Mocked Product/i)).toBeInTheDocument(),
		);
	});
});
