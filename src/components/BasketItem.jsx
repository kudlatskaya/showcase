function BasketItem(props) {
    const {
        id,
        name,
        price,
        quantity,
        removeFromBasket = Function.prototype,
        decrementQuantity = Function.prototype,
        incrementQuantity = Function.prototype,
    } = props;

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

export {BasketItem}


