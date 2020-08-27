import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import { APP_URL } from "../../config";
import { getBackendAuthToken } from "../../session/localStorage";
import CircularProgress from "@material-ui/core/CircularProgress";

const IngredientRow = () => {
  // const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  const [ingredients, setIngredients] = React.useState([]);
  const [ingredient, setIngredient] = React.useState(null);
  const [searchName, setSearchName] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [kcal, setKcal] = React.useState("");

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

   getIngredients(searchName, active);

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setSearchName("");
      setOptions([]);
    //   setIngredient(getOptionSelected)
    }
  }, [open]);

  async function getIngredients(startsWith, active) {
    setSearchName(startsWith);
    console.log(startsWith);

    const endpoint =
      startsWith == ""
        ? "/api/ingredient/"
        : "/api/ingredient/?startswith=" + startsWith;
    try {
      const response = await axios.get(APP_URL + endpoint, {
        headers: {
          Authorization: `Token ${getBackendAuthToken()}`,
        },
      });
      const ingredients = response.data;
      console.log(ingredients);
      setIngredients(ingredients);
      if (active) {
        setOptions(ingredients.map((i) => i));
      }
    } catch (error) {
      console.log(error);
      setIngredients([]);
    }
  }

  return (
    <div>
      <Autocomplete
        id="asynchronous-demo"
        style={{ width: 300 }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        onChange={(e, v) => setIngredient(v.id)}
        getOptionSelected={(option, value) => option.name === value.name}
        getOptionLabel={(option) => option.name + " (" + option.kcal_per_100g + ")"}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Asynchronous"
            variant="outlined"
            onChange={
                (event) => getIngredients(event.target.value)
            }
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />

      <TextField
        label="Weight (in grams)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
    </div>
  );
};

export { IngredientRow };
