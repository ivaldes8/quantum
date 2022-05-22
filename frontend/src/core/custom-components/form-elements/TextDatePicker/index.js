import React from "react";
import { Field } from "react-final-form";
import { FormControl, FormHelperText, TextField } from "@mui/material";
import i18n from "../../../lang/i18nextConf";

const TextDatePicker = ({
  field,
  containerClass,
  fullWidth = true,
  onChange,
  allowZero = false,
  translateValues,
  validate,
  intl,
  marginContainer = true,
  ...rest
}) =>
  field ? (
    <Field name={field} validate={validate}>
      {({ meta, input }) => (
        <FormControl
          sx={{ m: 1 }}
          error={meta.touched && !!meta.error}
          fullWidth={fullWidth}
        >
          <TextField
            {...input}
            {...rest}
            variant="outlined"
            type="date"
            label={rest.label ? i18n.t(rest.label) : null}
            error={meta.touched && !!meta.error}
            placeholder={rest.placeholder ? i18n.t(rest.placeholder) : null}
            InputLabelProps={{
              shrink: true
            }}
            value={input.value || ''}
            onChange={(e) => {
              input.onChange(e.target.value);
              if (onChange) onChange(e.target.value, e);
            }}
          />
          {meta.touched && meta.error && (
            <FormHelperText>{i18n.t(meta.error)}</FormHelperText>
          )}
        </FormControl>
      )}
    </Field>
  ) : (
    <FormControl sx={{ m: 1 }} fullWidth={fullWidth}>
      <TextField
        {...rest}
        placeholder={rest.placeholder ? i18n.t(rest.placeholder) : null}
        value={rest.value || ""}
        onChange={(e) => {
          if (onChange) onChange(e.target.value, e);
        }}
      />
    </FormControl>
  );

export default TextDatePicker;
