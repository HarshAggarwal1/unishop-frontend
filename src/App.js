import './App.css';
import Navbar from './components/navigation/Navbar';
import LoginPageLight from './pages/auth/login/LoginPageLight';
import LoginPageDark from './pages/auth/login/LoginPageDark';
import RegisterPageLight from './pages/auth/register/RegisterPageLight';
import RegisterPageDark from './pages/auth/register/RegisterPageDark';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
// import ProductCard from './components/product/ProductCard';
import Dashboard from './pages//Dashboard';
import ProductDescription from './pages/ProductDescription';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';

function App() {
	const theme = useSelector((state) => state.theme.theme);

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
						<Route path="/auth/login" element={theme === 'dark' ? <LoginPageDark /> : <LoginPageLight />} />
						<Route path="/auth/register" element={theme === 'dark' ? <RegisterPageDark /> : <RegisterPageLight />} />
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
