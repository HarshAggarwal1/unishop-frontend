import React from 'react'
import ProductCard from '../components/product/ProductCard'
import { useSelector } from 'react-redux'

const categories = [
  {
    id: 1,
    name: 'Electronics'
  },
  {
    id: 2,
    name: 'Fashion'
  },
  {
    id: 3,
    name: 'Home & Kitchen'
  },
]

const products = [
  {
    id: 1,
    name: 'Smartphone',
    category: 'Electronics',
    price: 29999,
    imageUri: '/product-demo-image-1.jpg',
    rating: 4.5,
    numRatings: 1200
  },
  {
    id: 2,
    name: 'Smart Watch',
    category: 'Electronics',
    price: 59999,
    imageUri: '/product-demo-image.jpg',
    rating: 4.7,
    numRatings: 800
  },
  {
    id: 3,
    name: 'T-shirt',
    category: 'Fashion',
    price: 999,
    imageUri: '/product-demo-image-2.jpg',
    rating: 4.2,
    numRatings: 500
  },
  {
    id: 4,
    name: 'Jeans',
    category: 'Fashion',
    price: 1999,
    imageUri: '/product-demo-image-3.jpg',
    rating: 4.3,
    numRatings: 300
  },
  {
    id: 5,
    name: 'Blender',
    category: 'Home & Kitchen',
    price: 2999,
    imageUri: '/product-demo-image-4.jpg',
    rating: 4.6,
    numRatings: 200
  },
  {
    id: 6,
    name: 'Microwave',
    category: 'Home & Kitchen',
    price: 8999,
    imageUri: '/product-demo-image-5.jpg',
    rating: 4.4,
    numRatings: 150
  },
]

export default function Dashboard() {
  const theme = useSelector((state) => state.theme.theme);
  return (
    <React.Fragment>
      <h1 className='text-3xl font-bold text-center mt-4'>
        Featured Categories
      </h1>
      <div className='flex flex-wrap justify-center mt-10 gap-4'>
        {categories.map((category) => (
          <div key={category.id} className={`${theme === "dark" ? "bg-slate-600" : 'bg-gray-100'} p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:cursor-pointer`}>
            <h2 className='text-xl font-semibold'>{category.name}</h2>
          </div>
        ))}
      </div>
      <h1 className='text-3xl font-bold text-center mt-10'>
        Featured Products
      </h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-8 mt-10 justify-items-center align-items-center'>
        {products.map((product) => (
          <ProductCard title={product.name} price={product.price} imageUri={product.imageUri} category={product.category} rating={product.rating} numRatings={product.numRatings} key={product.id} loading={false} id={product.id} />
        ))}
      </div>
    </React.Fragment>
  )
}
