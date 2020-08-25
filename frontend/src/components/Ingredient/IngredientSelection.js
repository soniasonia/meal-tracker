import React from "react";
import axios from "axios";
import { APP_URL } from "../../config";
import { setBackendAuthToken, getBackendAuthToken, deleteBackendAuthToken } from "../../session/localStorage" 

const IngredientSelection = () => {

    const [ingredients, setIngredients] = React.useState([]);

    React.useEffect(() => {

        async function fetchData() {
            const response = await axios.get(APP_URL + "/api/ingredient/", {
                headers: {
                  Authorization: `Token ${getBackendAuthToken()}`,
                },
              });
              setIngredients(response.data);
          }
        
          fetchData();}, []);


return (<div>{
    
    ingredients ? ingredients.map(
    ({ name, kcal_per_100g }) => (
        <div>{name} {kcal_per_100g}</div>
    )
  ) : null};
</div>
)
    }

export {IngredientSelection}