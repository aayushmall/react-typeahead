import "./styles.css";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import axios from "axios";

export default function App() {
  const [options, setOptions] = useState([]);
  const [searchType, setSearchType] = useState("client");
  const [key, setKey] = useState(false);

  const handleChange = async (e, value) => {
    let url = "https://c71cj.sse.codesandbox.io";

    if (searchType === "client") {
      url += `/clients`;
    } else if (searchType === "order") {
      url += `/orders`;
    } else if (searchType === "asset") {
      url += `/assets`;
    }

    url += `?search_term=${value}`;

    try {
      const response = await axios.get(url);
      if (response.data) {
        setOptions(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getOptionSelected = (option, value) => {
    if (searchType === "client") {
      return option.email === value.email;
    } else if (searchType === "order") {
      return option.type === value.type;
    } else if (searchType === "asset") {
      return option.name === value.name;
    }
  };

  const selectChange = (event) => {
    setOptions([]);
    setKey(!key);
    setSearchType(event.target.value);
  };

  const getLabel = (option) => {
    if (searchType === "client") {
      return option.email;
    } else if (searchType === "order") {
      return option.type;
    } else if (searchType === "asset") {
      return option.name;
    }
  };

  return (
    <div className="App">
      <h4>Welcome to </h4>
      <h5>Search you entities here</h5>

      <FormControl component="fieldset">
        <FormLabel component="legend">Entities</FormLabel>
        <RadioGroup
          aria-label="entities"
          name="entities"
          value={searchType}
          onChange={selectChange}
        >
          <FormControlLabel
            value="client"
            control={<Radio />}
            label="Clients"
          />
          <FormControlLabel value="asset" control={<Radio />} label="Assets" />
          <FormControlLabel value="order" control={<Radio />} label="Orders" />
        </RadioGroup>
      </FormControl>

      <Autocomplete
        key={key}
        id="combo-box-demo"
        options={options}
        getOptionLabel={getLabel}
        style={{ width: 450 }}
        multiple={true}
        filterSelectedOptions={true}
        onInputChange={handleChange}
        getOptionSelected={getOptionSelected}
        renderInput={(params) => (
          <TextField {...params} label="Combo box" variant="outlined" />
        )}
      />
    </div>
  );
}
