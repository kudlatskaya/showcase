import { useContext } from 'react';
import { ShopContext } from '../context';

function BasketItem(props) {
    const {
        id,
        name,
        price,
        quantity,
    } = props;

    const {
        removeFromBasket,
        decrementQuantity,
        incrementQuantity
    } = useContext(ShopContext);

    return (
        <li className="collection-item">
            {name}

            <span className="change-quantity" onClick={() => decrementQuantity(id)}> - </span>
            {quantity}
            <span className="change-quantity" onClick={() => incrementQuantity(id)}> + </span>

            = {price * quantity} руб.

            <span className="secondary-content" onClick={() => removeFromBasket(id)}>
                <i className="material-icons basket-delete">close</i>
            </span>
        </li>

    )
}

export { BasketItem }


