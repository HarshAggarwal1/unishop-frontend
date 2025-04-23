import './App.css';
import Navbar from './components/navigation/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
// import ProductCard from './components/product/ProductCard';
import Dashboard from './pages//Dashboard';
import ProductDescription from './pages/ProductDescription';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import { useEffect } from 'react';
import { setTheme } from './app/slices/theme/themeSlice';
import { setCartData } from './app/slices/cart/cartSlice';
import Cookies from 'js-cookie';

function App() {
	const theme = useSelector((state) => state.theme.theme);

	const cartTotalItems = useSelector((state) => state.cart.totalItems);
	const netPrice = useSelector((state) => state.cart.netPrice);
	const cartItems = useSelector((state) => state.cart.cartItems);
	const delieveryCharges = useSelector((state) => state.cart.delieveryCharges);
	const discounts = useSelector((state) => state.cart.discounts);

	const dispatch = useDispatch();

	useEffect(() => {
		const savedTheme = Cookies.get('theme');
		dispatch(setTheme(savedTheme || 'light'));

		const savedCartData = Cookies.get('cartData');
		if (savedCartData) {
			const parsedCartData = JSON.parse(savedCartData);
			dispatch(setCartData(parsedCartData));
		}
	}, [dispatch]);

	// theme 
	useEffect(() => {
		document.body.className = theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black';
	}, [theme]);

	// cart
	useEffect(() => {
		if (cartTotalItems > 0) {
			const cartData = {
				totalItems: cartTotalItems,
				netPrice: netPrice,
				cartItems: cartItems,
				delieveryCharges: delieveryCharges,
				discounts: discounts,
			};
			console.log('cartData', cartData);
			Cookies.set('cartData', JSON.stringify(cartData), { expires: 7 });
		}
	}, [cartTotalItems, netPrice, cartItems, delieveryCharges, discounts]);

	return (
		<BrowserRouter>
			<div className="App">
				<header>
					<Navbar />
				</header>
				<main className='mt-16 flex flex-col items-center p-4'>
					<Routes>
						<Route path="/" element={<Dashboard />} />
						<Route path="/product/:id" element={<ProductDescription />} />
						<Route path="/auth/login" element={<LoginPage />} />
						<Route path="/auth/register" element={<RegisterPage />} />
						<Route path="/cart" element={<Cart />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</main>
				<ToastContainer
					position="bottom-left"
					autoClose={1500}
					hideProgressBar={true}
					newestOnTop={false}
					closeOnClick
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme={theme}
				/>
				<footer className='flex justify-center items-center p-4'>
					<p className='text-gray-500'>© 2025 UniShop. All rights reserved.</p>
				</footer>
			</div >
		</BrowserRouter>
	);
}

export default App;
