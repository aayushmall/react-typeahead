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
    if (!value) {
      return;
    }

    let url = "http://localhost:8080";

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
      console.log(option.email, value.email);

      if (option.email && value.email) {
        return option.email.toLowerCase() === value.email.toLowerCase();
      }
    } else if (searchType === "order") {
      if (option.type && value.type) {
        return option.type.toLowerCase() === value.type.toLowerCase();
      }
    } else if (searchType === "asset") {
      if (option.name && value.name) {
        return option.name.toLowerCase() === value.name.toLowerCase();
      }
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
      <h5 style={{ textDecoration: "underline" }}>Search Your Entities</h5>

      <FormControl component="fieldset">
        <RadioGroup
          row
          aria-label="entities"
          name="entities"
          value={searchType}
          onChange={selectChange}
        >
          <FormLabel component="legend" className="entities-label">
            <b>Entities:</b>
          </FormLabel>
          <FormControlLabel
            value="client"
            control={<Radio color="primary" />}
            label="Clients"
          />
          <FormControlLabel
            value="asset"
            control={<Radio />}
            label="Assets"
            color="primary"
          />
          <FormControlLabel
            value="order"
            control={<Radio />}
            label="Orders"
            color="primary"
          />
        </RadioGroup>
      </FormControl>

      <Autocomplete
        key={key}
        id="combo-box-demo"
        options={options}
        getOptionLabel={getLabel}
        style={{ width: 400, marginLeft: "35%" }}
        openOnFocus
        multiple={true}
        filterSelectedOptions={true}
        onInputChange={handleChange}
        getOptionSelected={getOptionSelected}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Combo box"
            variant="outlined"
            margin="normal"
          />
        )}
      />
    </div>
  );
}
