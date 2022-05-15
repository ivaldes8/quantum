import React from "react";
import { Field } from "react-final-form";
import { FormControl, FormHelperText, TextField } from "@mui/material";
import _ from "lodash";
import NumberFormat from "react-number-format";
import i18n from "../../../lang/i18nextConf";

const TextFieldInput = ({
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
          {(() => {
            if (rest.type === "number") {
              rest.type = "string";
              rest.setmasknumber = "true";
            }
          })()}
          {rest.setmasknumber === "true" ? (
            <NumberFormat
              variant="outlined"
              customInput={TextField}
              thousandSeparator={true}
              isNumericString={true}
              {...input}
              {...rest}
              label={rest.label ? i18n.t(rest.label) : null}
              error={meta.touched && !!meta.error}
              placeholder={rest.placeholder ? i18n.t(rest.placeholder) : null}
              defaultValue={allowZero ? input.value : input.value || ""}
              onValueChange={(values) => (rest.value = values.value)}
              onChange={(e) => {
                input.onChange(rest.value || "");
                if (onChange) onChange(e.target.value, e);
              }}
            />
          ) : (
            <TextField
              variant="outlined"
              {...input}
              {...rest}
              label={rest.label ? i18n.t(rest.label) : null}
              error={meta.touched && !!meta.error}
              placeholder={rest.placeholder ? i18n.t(rest.placeholder) : null}
              value={allowZero ? input.value : input.value || ""}
              onChange={(e) => {
                if (rest.type === "number") {
                  input.onChange(
                    !_.isEmpty(e.target.value) ? +e.target.value : ""
                  );
                  if (onChange)
                    onChange(
                      !_.isEmpty(e.target.value) ? +e.target.value : "",
                      e
                    );
                } else {
                  input.onChange(e.target.value);
                  if (onChange) onChange(e.target.value, e);
                }
              }}
            />
          )}
          {meta.touched && meta.error && (
            <FormHelperText>{i18n.t(meta.error)}</FormHelperText>
          )}
        </FormControl>
      )}
    </Field>
  ) : (
    <FormControl sx={{ m: 1 }} fullWidth={fullWidth}>
      <TextField
        variant="outlined"
        {...rest}
        placeholder={rest.placeholder ? i18n.t(rest.placeholder) : null}
        value={rest.value || ""}
        onChange={(e) => {
          if (onChange) onChange(e.target.value, e);
        }}
      />
    </FormControl>
  );

export default TextFieldInput;
