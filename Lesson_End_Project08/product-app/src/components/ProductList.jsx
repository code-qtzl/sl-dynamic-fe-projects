import React, { useEffect, useState } from 'react';
const API_URL = 'https://fakestoreapi.com/products';
const ProductList = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	useEffect(() => {
		fetch(API_URL)
			.then((response) => response.json())
			.then((data) => {
				setProducts(data.slice(0, 5)); // Display only the first 5 products
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setLoading(false);
			});
	}, []);
	if (loading) return <p className='loading'>Loading...</p>;
	if (error) return <p className='error'>Error: {error}</p>;
	return (
		<div className='product-container'>
			{products.map((product) => (
				<div key={product.id} className='product-card'>
					<img
						src={product.image}
						alt={product.title}
						className='product-image'
					/>
					<div className='product-title'>{product.title}</div>
					<div className='product-price'>${product.price}</div>
				</div>
			))}
		</div>
	);
};
export default ProductList;
