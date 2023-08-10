import "./CreateRestaurant.css";
import { useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import {createRestaurant} from '../graphql/mutations'
import { useNavigate } from "react-router-dom";
 

const CreateRestaurant = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

const navigate = useNavigate();
  const handleSubmit = async (e) => {

 
    e.preventDefault();
   
    try{
      const input = { name, location, description}
      const { data } = await API.graphql(
        graphqlOperation(createRestaurant, {input})
      );
       console.log(data);
        setName("");
        setDescription("");
        setLocation("");
        navigate('/');

    }catch(e){
      
      console.log('error');
      
    }
    
  };

  return (

  <div className="form">
       <form onSubmit={handleSubmit}>
            <h3>Create Restaurant</h3>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Enter name of restaurant"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label htmlFor="location">Location:</label>
      <input
        type="text"
        id="location"
        name="location"
        placeholder="Enter location of restaurant"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />

      <label htmlFor="description">Description:</label>
      <input
        type="text"
        id="description"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
        <div className="btn"> <button type="submit">Create</button></div>
     
    </form>

  </div>
     
    


  );
};

export default CreateRestaurant;
