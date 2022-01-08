import React from 'react'
import CartItem from '../CartItem/CartItem'

import { Wrapper } from './Cart.styles'

import { CartItemComponentType, CartItemType, CartProps } from '../types'

const Cart: React.FC<CartProps> = ({ cartItems, addToCart, removeFromCart }) => {

    const calculateTotal = (items: CartItemType[]) => items.reduce((ack: number, item) => ack + item.amount * item.price, 0)
    return (
        <Wrapper>
            <h2>Your Shopping Cart</h2>
            {cartItems.length === 0 ? <p>No item in cart.</p> : null}
            {cartItems.map(item => (
                <CartItem key={item.id} item={item} addToCart={addToCart} removeFromCart={removeFromCart} />
            ))}
            <h2>Total : ${calculateTotal(cartItems).toFixed(2)}</h2>
        </Wrapper>
    )
}

export default Cart
