import React from "react";
import axios from "axios";
import { APP_URL } from "../../config";
import {
  setBackendAuthToken,
  getBackendAuthToken,
  deleteBackendAuthToken,
} from "../../session/localStorage";

const IngredientSelection = (props) => {

  return (
    <div>
      {props.ingredients
        ? props.ingredients.map(({ id, name, kcal_per_100g }) => (
            <div key={id}>
              {name} {kcal_per_100g}
            </div>
          ))
        : null}
      ;
    </div>
  );
};

export { IngredientSelection };
