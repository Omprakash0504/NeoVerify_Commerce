import { useEffect, useState } from "react";
import { ContextCreater } from "./ContextCreater";

const ContextProvider = (props) => {

    const [cartItems, setCartItems] = useState([])
    const [totalAmountOfItems, setTotalAmountOfItems] = useState(0)
    
    const addToCartHandler = (item, quantity) => {
        const { _id, name, price, image, category, size} = item;
        removeFromCartHandler(item)
        setCartItems((prevItems) => [...prevItems, {_id, name, price, image, category, itemQuantity: quantity, size}])
    }

    const removeFromCartHandler = (item) => {
        setCartItems(cartItems.filter((prevItem) => prevItem._id !== item._id))
    }

    const calculateTotalAmount = (currentCartItems) => {
        let total = 0
        currentCartItems.forEach((item) => {
            total = total + (item.price * item.itemQuantity)
        })

        setTotalAmountOfItems(total)
    }

    const quantityHandler = (itemId, action) => {
        if(action === 'INC'){
            setCartItems(cartItems.map((item) => {
                if(item.id  === itemId){
                    item.itemQuantity += 1
                }
                return item
            }))
        }
        else {
            setCartItems(cartItems.map((item) => {
                if(item.id  === itemId){
                    item.itemQuantity -= 1
                }
                return item
            }))
        }
    }

    useEffect(() => {
        calculateTotalAmount(cartItems)
    }, [cartItems])


    const cartItemCtx = {
        user: cartItems,
        totalAmount: totalAmountOfItems,
        adduser: addToCartHandler,
        updateuser: removeFromCartHandler,
        quantity: quantityHandler
    }

    return ( 
        <ContextCreater value={cartItemCtx}>
            {props.children}
        </ContextCreater>
     );
}
 
export default ContextProvider;