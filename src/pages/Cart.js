import { Delete, ShoppingCartOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { removeFromCart, updateQuantity } from '../app/slices/cart/cartSlice'
import { toast } from 'react-toastify';

export default function Cart() {
    const navigate = useNavigate();
    const cartTotalItems = useSelector((state) => state.cart.totalItems);
    const netPrice = useSelector((state) => state.cart.netPrice);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const delieveryCharges = useSelector((state) => state.cart.delieveryCharges);
    const discounts = useSelector((state) => state.cart.discounts);
    const dispatch = useDispatch();

    return (
        // <React.Fragment>
        // {
        cartTotalItems > 0 ? (
            <div className='h-svh w-screen p-4 flex flex-col'>
                <h1 className='text-3xl font-bold text-start'>Your Cart</h1>
                <div className='grid md:grid-cols-3 sm:grid-cols-1 gap-x-2 mt-4'>
                    <div className='flex flex-col md:col-start-1 col-end-3 border border-gray-200 rounded-md p-4 items-start gap-4'>
                        <h2>
                            <span className='text-xl font-medium'>Cart Items</span>
                            <span className='text-xl font-medium'>{` (${cartItems.length})`}</span>
                        </h2>
                        <div className='flex flex-col gap-4 w-full justify-center'>
                            {cartItems.map((item) => (
                                <div key={item.id} className='flex items-center justify-between w-full border-b border-gray-200 pb-2'>
                                    <div className='flex items-center gap-4'>
                                        <img src={item.imageUri} alt={item.name} className='h-20 w-20 object-contain rounded-md' />
                                        <div className='flex flex-col items-start gap-4'>
                                            <h3 className='text-lg font-medium'>{item.title}</h3>
                                            <div className='flex flex-col items-start gap-2'>
                                                <p className='text-gray-500'>₹{item.price}</p>
                                                <div className='flex gap-2'>
                                                    <button
                                                        className='border border-gray-200 rounded-md p-1 w-8 h-8 text-xs text-center'
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            if (item.quantity > 1) {
                                                                dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
                                                            } else {
                                                                dispatch(removeFromCart(item.id));
                                                                toast.success(`${item.title} removed from cart`);
                                                            }
                                                        }}
                                                    >
                                                        -
                                                    </button>
                                                    <p className='p-1 w-4 h-4 text-center text-xs'>
                                                        {item.quantity}
                                                    </p>
                                                    <button
                                                        className='border border-gray-200 rounded-md text-xs p-1 w-8 h-8 text-center'
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
                                                        }}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <IconButton
                                        size="small"
                                        color="inherit"
                                        sx={{
                                            '&:hover': { backgroundColor: '#f3f4f6' }, borderRadius: '10%'
                                        }}
                                        onClick={(event) => {
                                            event.preventDefault();
                                            dispatch(removeFromCart(item.id));
                                            toast.success(`${item.title} removed from cart`);
                                        }}
                                    >
                                        <Delete sx={{ color: 'red' }} />
                                    </IconButton>
                                </div>
                            ))}
                        </div>

                    </div>
                    <div>
                        <div className='flex flex-col gap-4 border border-gray-200 rounded-md p-4 md:col-start-2 col-end-4'>
                            <h2 className='text-xl font-medium'>Order Summary</h2>
                            <div className='flex flex-col gap-2'>
                                <div className='flex justify-between'>
                                    <p>Subtotal</p>
                                    <p className='font-medium'>₹{netPrice.toFixed(2)}</p>
                                </div>
                                <div className='flex justify-between'>
                                    <p>Delivery Charges</p>
                                    <p className='font-medium'>₹{delieveryCharges.toFixed(2)}</p>
                                </div>
                                <div className='flex justify-between'>
                                    <p>Discounts</p>
                                    <p className='font-medium'>-&nbsp;₹{`${discounts.toFixed(2)}`}</p>
                                </div>
                            </div>
                            <hr />
                            <div className='flex justify-between'>
                                <h3 className='text-lg font-bold'>Total</h3>
                                <h3 className='text-lg font-bold'>₹{(netPrice + delieveryCharges - discounts).toFixed(2)}</h3>
                            </div>
                            <button className='bg-yellow-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-yellow-600 transition duration-200 ease-in-out' onClick={(event) => { event.preventDefault(); navigate('/') }}>Checkout</button>
                        </div>

                    </div>
                </div>
            </div>

        ) : (

            <div className='flex flex-col items-center w-screen h-svh justify-center p-2'>
                <ShoppingCartOutlined sx={{ fontSize: '5rem', color: 'gray' }} />
                <h1 className='text-3xl font-bold text-start'>Your Cart is empty</h1>
                <p className='text-gray-500'>Looks like you haven't added anything to your cart yet.</p>
                <button className='bg-yellow-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-yellow-600 transition duration-200 ease-in-out' onClick={(event) => { event.preventDefault(); navigate('/') }}>Start Shopping</button>
            </div>

        )
        // }
        // </React.Fragment>
    )
}
