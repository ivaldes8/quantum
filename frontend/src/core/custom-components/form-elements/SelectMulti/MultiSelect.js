import React from "react";
import _ from 'lodash';
import { Checkbox, ListItemText, Box, InputLabel, MenuItem, FormControl, Select, Chip } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

export default ({
  input: { value, name, onChange, ...restInput },
  meta,
  ...rest
}) => (
  <FormControl sx={{ m: 1 }} fullWidth>
    <InputLabel>{rest.label}</InputLabel>
    <Select
      MenuProps={MenuProps}
      multiple
      displayEmpty
      {...rest}
      name={name}
      inputProps={restInput}
      error={meta.error && meta.touched}
      onChange={onChange}
      value={[...value]}
      renderValue={selected => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {selected.map((val) => (
            <Chip key={val._id}
              value={val}
              label={val.name}
              className="multi-select-chip" />
          ))}
        </Box>
      )}
    >
      {_.uniqBy(_.concat(value, rest.options), '_id').map((v) => (
        <MenuItem key={v._id} value={v}>
          <Checkbox checked={_.find(value, { '_id': v._id }) ? true : false} />
          <ListItemText primary={v.name} />
        </MenuItem>
      ))}
    </Select>

  </FormControl>
)