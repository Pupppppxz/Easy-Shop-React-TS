import React from 'react'

import { Button } from "@material-ui/core";

import { CartItemType, ItemProps } from "../types";

import { Wrapper } from './item.styles';

const Item: React.FC<ItemProps> = ({item, handleToCart}) => (
    <Wrapper>
        <img src={item.image} alt={item.title} />
        <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <h3>${item.price}</h3>
        </div>
        <Button onClick={() => handleToCart(item)}>Add to cart</Button>
    </Wrapper>
)

export default Item