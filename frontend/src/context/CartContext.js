import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);


  useEffect(() => {
   
    console.log("CartContext useEffect: Rilevato cambiamento utente a:", user); 

    if (user?.id) {
      console.log("CartContext useEffect: Tentativo di caricare carrello per ID utente:", user.id);
      const storedCart = localStorage.getItem(`cart_${user.id}`);
      let parsedCart = []; 

      try {
        if (storedCart) {
          const tempParsed = JSON.parse(storedCart);
        
          if (Array.isArray(tempParsed)) {
            parsedCart = tempParsed;
            console.log("CartContext useEffect: Carrello caricato:", parsedCart);
          } else {
            console.warn("CartContext useEffect: Dati carrello non validi nel localStorage, reset a array vuoto:", storedCart);
          }
        } else {
            console.log("CartContext useEffect: Nessun carrello memorizzato per questo utente, inizializzo vuoto.");
        }
      } catch (e) {
        console.error("CartContext useEffect: Errore nel parsing del carrello dal localStorage, reset a array vuoto:", e);
      }
      setCart(parsedCart);
    } else {
      console.log("CartContext useEffect: Utente non loggato, svuoto il carrello.");
      setCart([]); 
    }
  }, [user]); 


  useEffect(() => {
    if (user?.id) {
      console.log("CartContext useEffect: Salvataggio carrello per ID utente:", user.id, "Carrello:", cart);
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart)); 
    }
  }, [cart, user]);

  const addToCart = (game) => {
    setCart(prev => {
    
      const existing = prev.find(g => g._id === game._id); 

      const stock = typeof game.stock === 'number'
        ? game.stock
        : parseInt(game.stock, 10) || 0;

      if (stock <= 0) {
        alert(`"${game.title}" non è attualmente disponibile.`);
        return prev;
      }

      if (existing) {
        if (existing.quantity >= stock) {
          alert(`Hai già aggiunto tutte le copie disponibili di "${game.title}".`);
          return prev;
        }
        return prev.map(g =>
          g._id === game._id
            ? { ...g, quantity: g.quantity + 1 }
            : g
        );
      } else {
        return [...prev, { ...game, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(game => game._id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);




