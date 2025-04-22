import React, { useState } from 'react'
import { Box, IconButton, Rating } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { ShoppingBag } from '@mui/icons-material'
import { useLocation } from 'react-router-dom'
import { addToCart } from '../app/slices/cart/cartSlice'
import { toast } from 'react-toastify'

export default function ProductDescription() {
    const theme = useSelector((state) => state.theme.theme);
    const [quantity, setQuantity] = useState(1);
    const location = useLocation();
    const dispatch = useDispatch();
    const description = 'This is a product description. It is a long description that describes the product in detail. It is a long description that describes the product in detail. It is a long description that describes the product in detail. It is a long description that describes the product in detail.';
    const { id, title, price, imageUri, category, rating, numRatings } = location.state || {
        id: 0,
        title: 'Product Title',
        price: 23999,
        imageUri: '/product-demo-image.jpg',
        category: 'Product Category',
        rating: 4.6,
        numRatings: 100,
    }
    const handleAddToCart = (item) => {
        dispatch(
            addToCart({
                id: item.id,
                title: item.title,
                price: item.price,
                imageUri: item.imageUri,
                category: item.category,
                quantity: quantity,
            })
        );
        toast.success(`${item.title} added to cart`);
    };
    return (
        <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-4'>
            <img src={imageUri} alt={title} className='rounded-md border border-gray-200' />
            <div className='flex flex-col gap-8 md:p-8'>
                <div className='flex flex-col gap-2'>
                    <h2 className='text-4xl font-bold text-start'>{title}</h2>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "start",
                            marginTop: "0.5rem",
                            gap: "0.5rem",
                        }}
                    >
                        <Rating
                            name={`${title}-rating`}
                            value={rating}
                            precision={0.5}
                            readOnly
                            size="small"
                            sx={{
                                color: `${theme === "dark" ? "#ffb300" : "#ff9800"}`,
                            }}
                            max={5}
                        />
                        <span
                            className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-500"
                                }`}
                        >
                            ({numRatings})
                        </span>
                    </Box>
                    <h2 className='text-3xl font-bold text-start'>₹{price.toFixed(2)}</h2>
                    <p className='text-lg font-light text-start'>{category}</p>
                    <p className='text-md font-thin text-start text-gray-500'>{description}</p>
                </div>
                <div className='flex flex-col gap-1'>
                    <h3 className='text-lg font-medium text-start'>Quantity</h3>
                    <div className='flex gap-2'>
                        <button
                            className='border border-gray-200 rounded-md p-2 w-10 h-10 text-center'
                            onClick={() => setQuantity(quantity - 1)}
                            disabled={quantity <= 1}
                        >
                            -
                        </button>
                        <p className='p-2 w-10 h-10 text-center'>
                            {quantity}
                        </p>
                        <button
                            className='border border-gray-200 rounded-md p-2 w-10 h-10 text-center'
                            onClick={() => setQuantity(quantity + 1)}
                        >
                            +
                        </button>
                    </div>
                </div>
                <IconButton
                    onClick={(event) => {
                        event.preventDefault();
                        handleAddToCart({
                            id: id,
                            title: title,
                            price: price,
                            imageUri: imageUri,
                            category: category,
                            quantity: quantity,
                        });
                    }}
                    sx={{
                        backgroundColor: theme === 'dark' ? '#1e3a8a' : '#3b82f6',
                        '&:hover': {
                            backgroundColor: theme === 'dark' ? '#1e40af' : '#2563eb',
                        },
                        '&:disabled': {
                            backgroundColor: theme === 'dark' ? '#374151' : '#d1d5db',
                            color: theme === 'dark' ? '#9ca3af' : '#6b7280',
                        },
                        color: theme === 'dark' ? '#ffffff' : '#ffffff',
                        padding: '0.5rem 1rem',
                        fontSize: '1rem',
                        fontWeight: '500',
                        borderRadius: '0.375rem',
                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <ShoppingBag />
                    <p className='text-lg font-medium text-start'>&nbsp;Add to Cart</p>
                </IconButton>
            </div>
        </div>
    )
}
