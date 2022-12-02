export function reducer(state, { type, payload }) {
    switch (type) {
        case 'SET_GOODS':
            return {
                ...state,
                goods: payload || [],
                loading: false,
            };

        case 'ADD_TO_CART': {
            const itemIndex = state.order.findIndex(orderItem => orderItem.id === payload.id);

            let newOrder = null;
            if (itemIndex < 0) {
                const newItem = {
                    ...payload,
                    quantity: 1,
                };
                newOrder = [...state.order, newItem];
            } else {
                newOrder = state.order.map((orderItem, index) => {
                    if (index === itemIndex) {
                        return {
                            ...orderItem,
                            quantity: orderItem.quantity + 1
                        }
                    } else {
                        return orderItem;
                    }
                })
            }

            return {
                ...state,
                order: newOrder,
                alertName: payload.name,
            }
        }

        case 'DECREMENT_QUANTITY':
            return {
                ...state,
                order: state.order.map((orderItem) => {
                    if (orderItem.id === payload.id) {
                        const newQuantity = orderItem.quantity - 1;

                        return {
                            ...orderItem,
                            quantity: newQuantity >= 0 ? newQuantity : 0,
                        }
                    } else {
                        return orderItem;
                    }
                })
            }

        case 'INCREMENT_QUANTITY':
            return {
                ...state,
                order: state.order.map((orderItem) => {
                    if (orderItem.id === payload.id) {
                        return {
                            ...orderItem,
                            quantity: orderItem.quantity + 1
                        }
                    } else {
                        return orderItem;
                    }
                })
            }

        case 'BASKET_SHOW':
            return {
                ...state,
                isBasketShow: !state.isBasketShow
            }

        case 'REMOVE_FROM_BASKET':
            return {
                ...state,
                order: state.order.filter((el) => el.id !== payload.id)
            }

        case 'CLOSE_ALERT':
            return {
                ...state,
                alertName: ''
            }

        default:
            return state;
    }
}