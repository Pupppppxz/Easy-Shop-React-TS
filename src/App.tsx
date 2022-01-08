import { useState } from "react";
import { useQuery } from "react-query";

// components
import { LinearProgress, Drawer, Grid, Badge } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import Item from "./item/item";
import Cart from "./Cart/Cart";

// style
import { Wrapper, StyledButton } from "./app.styles";
import { CartItemType } from "./types";

// api
import { getProducts } from "./API";

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );
  console.log(data);

  const getTotalItem = (items: CartItemType[]) =>
    items.reduce((ack: number, items) => ack + items.amount, 0);

  const handleAddToCart = (clickItem: CartItemType) => {
    setCartItems((prev) => {
      // is the item already added in cart?
      const isItemInCart = prev.find((item) => item.id === clickItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickItem.id ? { ...item, amount: item.amount + 1 } : item
        );
      }

      // first item in Cart
      return [...prev, { ...clickItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Somethig went wrong!</div>;

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItem(cartItems)} color="error">
          <AddShoppingCart />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default App;
