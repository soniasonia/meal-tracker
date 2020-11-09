import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import axios from "axios";
import React, { useEffect } from "react";
import useConstant from "use-constant";
import { APP_URL } from "../../config";
import { getBackendAuthToken } from "../../session/localStorage";

const getIngredientsEndpoint = (searchPhrase) => {
  if (searchPhrase === "") {
    return `${APP_URL}/api/ingredient/`;
  }
  return `${APP_URL}/api/ingredient/?contains=${searchPhrase}`;
};

const IngredientRow = ({ addIngredientToForm, key = 0 }) => {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [searchName, setSearchName] = React.useState("");
  const [backendAnswered, setBackendAnswered] = React.useState(false);
  const [selectedIngredient, setselectedIngredient] = React.useState({
    id: null,
    name: "",
    kcalPer100g: 0,
    weight: 0,
  });

  async function getIngredients(searchPhrase = "") {
    const url = getIngredientsEndpoint(searchPhrase);

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Token ${getBackendAuthToken()}`,
        },
      });
      setBackendAnswered(true);
      setOptions(response.data);
    } catch (error) {
      setOptions([]);
    }
  }

  const loading = open && options.length === 0 && !backendAnswered;

  useEffect(() => {
    if (loading) {
      getIngredients("");
    }
  }, [open, loading]);


  // Debounce the original search async function
  const debouncedGetIngredients = useConstant(() =>
    AwesomeDebouncePromise(getIngredients, 1000)
  );

  useEffect(() => {

    async function getIngredientsWhenInputEmpty() {
      getIngredients("");
    }
    setBackendAnswered(false);
    if (open && searchName === "") {
      getIngredientsWhenInputEmpty();
    }
    if (searchName !== "") {
      debouncedGetIngredients(searchName);
    }
  }, [open, searchName, debouncedGetIngredients]);

  useEffect(() => {
    if (selectedIngredient.id !== null && selectedIngredient.weight > 0) {
      addIngredientToForm(key, selectedIngredient);
    }
  }, [selectedIngredient, addIngredientToForm, key]);

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
        onChange={(e, v) => {
          // Deconstruct current selectedIngredient to keep default values from initial state.
          setselectedIngredient({ ...selectedIngredient, ...v });
        }}
        getOptionSelected={(option, value) => option.name === value.name}
        getOptionLabel={(option) =>
          option.name + " (" + option.kcalPer100g + ")"
        }
        options={options}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Asynchronous"
            variant="outlined"
            onChange={(event) => setSearchName(event.target.value)}
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
        value={selectedIngredient.weight}
        onChange={(e) =>
          setselectedIngredient({
            ...selectedIngredient,
            weight: Number(e.target.value),
          })
        }
      />
    </div>
  );
};

export { IngredientRow };
