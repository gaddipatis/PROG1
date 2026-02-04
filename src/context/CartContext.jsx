import { createContext, useContext, useReducer, useEffect } from "react";
import events from "../data/events";

const CartContext = createContext();

function loadCart() {
  try {
    const stored = localStorage.getItem("ticketCart");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TICKET": {
      const { eventId, tier, quantity } = action.payload;
      const event = events.find((e) => e.id === eventId);
      const ticketInfo = event.tickets.find((t) => t.tier === tier);

      const existing = state.find(
        (item) => item.eventId === eventId && item.tier === tier
      );
      const currentQty = existing ? existing.quantity : 0;
      const maxAvailable = ticketInfo.available - currentQty;
      const addQty = Math.min(quantity, maxAvailable);

      if (addQty <= 0) return state;

      if (existing) {
        return state.map((item) =>
          item.eventId === eventId && item.tier === tier
            ? { ...item, quantity: item.quantity + addQty }
            : item
        );
      }

      return [
        ...state,
        {
          eventId,
          eventTitle: event.title,
          eventDate: event.date,
          venue: event.venue,
          tier,
          price: ticketInfo.price,
          quantity: addQty,
        },
      ];
    }
    case "REMOVE_TICKET": {
      const { eventId, tier } = action.payload;
      return state.filter(
        (item) => !(item.eventId === eventId && item.tier === tier)
      );
    }
    case "UPDATE_QUANTITY": {
      const { eventId, tier, quantity } = action.payload;
      if (quantity <= 0) {
        return state.filter(
          (item) => !(item.eventId === eventId && item.tier === tier)
        );
      }
      const event = events.find((e) => e.id === eventId);
      const ticketInfo = event.tickets.find((t) => t.tier === tier);
      const clampedQty = Math.min(quantity, ticketInfo.available);

      return state.map((item) =>
        item.eventId === eventId && item.tier === tier
          ? { ...item, quantity: clampedQty }
          : item
      );
    }
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [], loadCart);

  useEffect(() => {
    localStorage.setItem("ticketCart", JSON.stringify(cart));
  }, [cart]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider value={{ cart, dispatch, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
