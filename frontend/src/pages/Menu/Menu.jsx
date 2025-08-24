import React, { useEffect, useState } from "react";
import "./Menu.css";




const Menu = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    // For now: dummy food data (later from backend)
    const sampleFoods = [
      {
        id: 1,
        name: "Cheese Pizza",
        price: 299,
        image: "https://source.unsplash.com/200x150/?pizza"
      },
      {
        id: 2,
        name: "Veg Burger",
        price: 199,
        image: "https://source.unsplash.com/200x150/?burger"
      },
      {
        id: 3,
        name: "Pasta",
        price: 249,
        image: "https://source.unsplash.com/200x150/?pasta"
      }
    ];
    setFoods(sampleFoods);
  }, []);

  const handleAddToCart = (food) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(food);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${food.name} added to cart!`);
  };

  return (
    <div className="menu-container">
      <h2>🍴 Menu</h2>
      <div className="menu-grid">
        {foods.map((food) => (
          <div className="food-card" key={food.id}>
            <img src={food.image} alt={food.name} />
            <h3>{food.name}</h3>
            <p>₹{food.price}</p>
            <button onClick={() => handleAddToCart(food)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
