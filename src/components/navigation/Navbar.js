import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../app/slices/theme/themeSlice';
import { updateCartStatus } from '../../app/slices/cart/cartSlice'
// import { updateLoginStatus } from '../../app/slices/login/loginSlice';
import { FormGroup, IconButton } from '@mui/material';
import { AccountCircleOutlined, DarkModeOutlined, LightModeOutlined, LoginOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = (props) => {
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme.theme);
    const cartTotalItems = useSelector((state) => state.cart.totalItems);
    const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
    const navigate = useNavigate();
    const [searchFocus, setSearchFocus] = React.useState(false);

    useEffect(() => {
        document.body.className = theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black';
    }, [theme]);

    return (
        <nav className='fixed w-screen top-0 left-0 z-50'>
            <div 
                className="flex gap-10 items-center justify-between p-2 bg-gray-800 text-white rounded-ee-lg rounded-es-lg shadow-md"
            >
                <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                        <img src="/logo512.png" alt="Logo" className="h-8 w-8" />
                        <span className="text-xl font-bold">UniShop</span>
                    </div>
                    <div className="flex space-x-4">
                        <Link to="/" className="hover:text-gray-400">Home</Link>
                        <Link to="/" className="hover:text-gray-400">Products</Link>
                        <Link to="/" className="hover:text-gray-400">Categories</Link>
                        {isLoggedIn && <a href="/" className="hover:text-gray-400">My Orders</a>}

                    </div>
                </div>
                <div className="flex items-center flex-grow">
                    <div className="flex w-full">
                        <input 
                            type="text" 
                            placeholder="Search Products" 
                            className={
                                `flex-grow p-2 bg-gray-100 text-black rounded-s-lg ${searchFocus ? 'outline-none ring-2 ring-yellow-600' : 'outline-none'}`
                            } 
                            onFocus={() => setSearchFocus(true)}
                            onBlur={() => setTimeout(() => setSearchFocus(false), 100)}
                        /> 
                        <div className={`flex bg-yellow-500 rounded-e-lg ${searchFocus ? 'outline-none ring-2 ring-yellow-600' : 'outline-none'}`}>
                            <IconButton color="inherit" onClick={() => console.log('Search clicked')}>
                                <SearchOutlined sx={{color: 'black'}}/>
                            </IconButton>
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <FormGroup sx={{ display: 'flex', flexDirection: 'row' }}>
                        <IconButton color="inherit" onClick={() => dispatch(toggleTheme())}>
                            {theme === 'dark' ? <DarkModeOutlined /> : <LightModeOutlined />}
                        </IconButton>
                        <IconButton color="inherit" onClick={(event) => {
                            event.preventDefault();
                            navigate('/cart');
                            // dispatch(updateCartStatus(cartStatus === 'empty' ? 'filled' : 'empty'))};
                            }}>
                            <div className="relative inline-block leading-none">
                                <ShoppingCartOutlined />
                                {
                                    (cartTotalItems > 0) ? 
                                    ( <span className="absolute -top-0 -right-0 bg-red-500 text-white rounded-full px-1 text-xs">{cartTotalItems}</span> ) : 
                                    ( <span className="absolute -top-0 -right-0 bg-gray-500 text-white rounded-full px-1 text-xs invisible">0</span> )
                                }
                            </div>
                        </IconButton>
                        <IconButton color="inherit"
                            onClick={(event) => {
                                event.preventDefault();
                                navigate('/auth/login');
                            }} 
                        >
                            {isLoggedIn ? <AccountCircleOutlined /> : <LoginOutlined />}
                        </IconButton>
                    </FormGroup>
                </div>
            </div>
        </nav>
    );
}



export default Navbar;