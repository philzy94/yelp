import "./ListRestaurants.css";
import { Link } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import { listRestaurants } from "../graphql/queries";
import {deleteRestaurant} from '../graphql/mutations'
import { useEffect, useState } from "react";

const ListRestaurants = () => {
  const [data, setData] = useState([]);

  const handleDelete = async(restaurant) =>{
    try{ 
      const { data: restData } =  await API.graphql(
      graphqlOperation(deleteRestaurant, {input: {id: restaurant.id}}))
      console.log(restData);
      setData((prevData) => prevData.filter((item) => item.id !== restaurant.id));
    }

      
      catch(e){
        console.log("error: "+ e)
      }
   
  }

  useEffect(() => {
    const allRestaurants = async () => {
        try {
          const restaurants = await API.graphql(graphqlOperation(listRestaurants));
          const newData = restaurants.data.listRestaurants.items;
          setData(newData)
          
        } catch (e) {
          console.log("error");
        }
      };
   allRestaurants();
   
  },[])

  console.log(data);
  return (
    <div>
        <Link to={"/create"}>
        <div className="success-button">Create new</div>
      </Link>
      <div className="columns">
        {
            data ?
            data.map((restaurant) => (
       
                <div className="card" key={restaurant.id}>
                <h2>{restaurant.name}</h2>
                <p>Location: {restaurant.location}</p>
                <p>description: {restaurant.description}</p>
               
                <div className="del"><button onClick={() =>handleDelete(restaurant)}>Delete</button></div>
                </div>
      
            )):<div>No restaurants</div>
        }
      </div>

     
    </div>
  );
};
export default ListRestaurants;
