import React from "react";
import axios from "axios";
import { APP_URL } from "../../config";
import { setBackendAuthToken, getBackendAuthToken, deleteBackendAuthToken } from "../../session/localStorage" 

const IngredientForm = () => {
    const [name, setName] = React.useState("");
    const [kcalPer100, setKcalPer100] = React.useState("");

  const onFormSubmit = (event) => {
    event.preventDefault();
    async function createIngredient() {
        const response = await axios.post(APP_URL + "/api/ingredient/", 
      {
        'name': name,
        'kcal_per_100g': kcalPer100,
      }, {
        headers: {
            Authorization: `Token ${getBackendAuthToken()}`,
        },
    });
  }
  createIngredient()}

    return (
      <div>
        <form onSubmit={(event) => onFormSubmit(event)} className="ui form">
          <div className="field">
              <label>Name</label>
              <input 
                  type="text" 
                  value={name}
                  onChange={e => setName(e.target.value)}
              />
          </div>
          <div className="field">
              <label>Calories per 100g</label>
              <input 
                  type="text" 
                  value={kcalPer100}
                  onChange={e => setKcalPer100(e.target.value)}
              />
          </div>
          <button type="submit" className="ui button">Add new ingredient</button>                    
      </form><br></br>
      </div>
    );
  }

export {IngredientForm}
