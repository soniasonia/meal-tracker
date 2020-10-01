import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import axios from "axios";
import React, { useEffect } from "react";
import useConstant from "use-constant";
import { APP_URL } from "../../config";
import { getBackendAuthToken } from "../../session/localStorage";

const getIngredientsEndpoint = searchPhrase => {
  if (searchPhrase === "") {
    return `${APP_URL}/api/ingredient/`;
  }
  return `${APP_URL}/api/ingredient/?startswith=${searchPhrase}`;
};

const IngredientRow = ({ addIngredientToForm, index = 0 }) => {
  // const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [searchName, setSearchName] = React.useState("");
  const [backendAnswered, setBackendAnswered] = React.useState(false);
  const [selectedIngridient, setSelectedIngridient] = React.useState({
    id: null,
    name: "",
    kcal_per_100g: 0,
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
      console.log("getIngredients api response", {
        url,
        data: response.data,
      }); // TODO: DELETE LOGS
      setBackendAnswered(true);
      setOptions(response.data);
    } catch (error) {
      console.log(error);
      setOptions([]);
    }
  }
  
  // Debounce the original search async function
  const debouncedGetIngredients = useConstant(() =>
    AwesomeDebouncePromise(getIngredients, 1000)
  );

  const loading = open && options.length === 0 && !backendAnswered;

  useEffect(() => {
    if (loading) {
      getIngredients("");
    }
  }, [open]); // Run effect again when 'open' is changed

  useEffect(() => {
    setBackendAnswered(false);
    // Get intredients when user removes every character.
    if (open && searchName === "") {
      getIngredients("");
    }
    if (searchName !== "") {
      debouncedGetIngredients(searchName);
    }
  }, [searchName]); // Run effect again when 'searchName' is changed

  useEffect(() => {
    if (selectedIngridient.id !== null && selectedIngridient.weight > 0) {
      addIngredientToForm(index, selectedIngridient);
    }
  }, [selectedIngridient]) // Run effect again when 'selectedIngridient' is changed

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
          // Deconstruct current selectedIngridient to keep default values from initial state.
          setSelectedIngridient({ ...selectedIngridient, ...v });
        }}
        getOptionSelected={(option, value) => option.name === value.name}
        getOptionLabel={(option) =>
          option.name + " (" + option.kcal_per_100g + ")"
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
        value={selectedIngridient.weight}
        onChange={(e) =>
          setSelectedIngridient({
            ...selectedIngridient,
            weight: Number(e.target.value),
          })
        }
      />
    </div>
  );
};

export { IngredientRow };
