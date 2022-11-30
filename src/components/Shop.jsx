import {useState, useEffect} from 'react';
import {API_KEY, API_URL} from '../config';
// import {createContext} from 'react';

import {Preloader} from './Preloader';
import {GoodsList} from './GoodsList';
import {Cart} from "./Cart";
import {BasketList} from './BasketList';
import {Alert} from './Alert';

// export const CustomContext = createContext();

function Shop () {
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);
    const [isBasketShow, setBasketShow] = useState(false);
    const [alertName, setAlertName] = useState('');

    useEffect(function getGoods(){
        fetch(API_URL, {
            headers: {
                Authorization: API_KEY,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                data.items && setGoods(data.items);
                setLoading(false);
            });
    }, []);

    const addToCart = (item) => {
        const itemIndex = order.findIndex(orderItem => orderItem.id === item.id);

        if(itemIndex < 0) {
            const newItem = {
                ...item,
                quantity: 1,
            }

            setOrder([...order, newItem]);

        } else {
            const newOrder = order.map((orderItem, index) => {
                if(index === itemIndex) {
                    return {
                        ...orderItem,
                        quantity: orderItem.quantity + 1
                    }
                } else {
                    return orderItem;
                }
            })

            setOrder(newOrder);
        }

        setAlertName(item.name);
    }

    const removeFromBasket = (itemId) => {
        const newOrder = order.filter(el => el.id !== itemId);
        setOrder(newOrder);
    }

    const handleBasketShow = () => {
        setBasketShow(!isBasketShow);
    }

    const incrementQuantity = (itemId) => {

        const newOrder = order.map((orderItem) => {
            if(orderItem.id === itemId) {
                return {
                    ...orderItem,
                    quantity: orderItem.quantity + 1
                }
            } else {
                return orderItem;
            }
        })

        setOrder(newOrder);
    }

    const decrementQuantity = (itemId) => {  
       const newOrder = order.map((orderItem) => {
            if(orderItem.id === itemId) {
                const newQuantity = orderItem.quantity - 1;

                return {
                    ...orderItem,
                    quantity: newQuantity >=0 ? newQuantity : 0,
                }
            } else {
                return orderItem;
            }
        })

        setOrder(newOrder);
    }

    const closeAlert = () => {
        setAlertName('');
    }

    return (
        <main className="container content">
            <Cart quantity={order.length} 
                handleBasketShow={handleBasketShow}/>
            {
                loading ?  (
                    <Preloader />
                ) : ( 
                    <GoodsList goods={goods} addToCart={addToCart}/>
                )
            }

            {
                isBasketShow && <BasketList 
                                    order={order} 
                                    handleBasketShow={handleBasketShow}
                                    removeFromBasket={removeFromBasket}
                                    incrementQuantity={incrementQuantity}
                                    decrementQuantity={decrementQuantity}
                                />
            }
            {
                alertName && <Alert name={alertName} closeAlert={closeAlert}/>
            }
        </main>
    );
}

export {Shop}