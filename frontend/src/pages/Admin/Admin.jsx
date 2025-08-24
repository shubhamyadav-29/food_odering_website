import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css";

const Admin = () => {
  const [foods, setFoods] = useState([]);
  const [newFood, setNewFood] = useState({ name: "", price: "" });
  const [imageFile, setImageFile] = useState(null);

  // Fetch foods
  const fetchFoods = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/foods");
      setFoods(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const handleChange = (e) => {
    setNewFood({ ...newFood, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleAddFood = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", newFood.name);
      formData.append("price", newFood.price);
      if (imageFile) formData.append("image", imageFile);

      await axios.post("http://localhost:5000/api/foods", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setNewFood({ name: "", price: "" });
      setImageFile(null);
      fetchFoods();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/foods/${id}`);
      fetchFoods();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-container">
      <h1>Admin Panel</h1>
      <form className="food-form" onSubmit={handleAddFood}>
        <input
          type="text"
          name="name"
          placeholder="Food Name"
          value={newFood.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newFood.price}
          onChange={handleChange}
          required
        />
        <input type="file" onChange={handleFileChange} accept="image/*" />
        <button type="submit">Add Food</button>
      </form>

      <div className="food-list">
        {foods.map((food) => (
          <div className="food-card" key={food._id}>
            <img
              src={food.image || "https://via.placeholder.com/100"}
              alt={food.name}
            />
            <h3>{food.name}</h3>
            <p>₹{food.price}</p>
            <button onClick={() => handleDelete(food._id)} className="delete-btn">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
