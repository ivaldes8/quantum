import React from "react";
import { Field, File } from "react-final-form";
import { CardMedia, FormControl, FormHelperText, TextField } from "@mui/material";
import FileBase from "react-file-base64";
import i18n from "../../../lang/i18nextConf";

const FileFieldInput = ({
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
          <label htmlFor="icon-button-file">
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                input.onChange(base64)
              }
            />
            {input.value &&
              <CardMedia
                component="img"
                height="140"
                image={input.value}
                alt="green iguana"
              />
            }
          </label>
          {meta.touched && meta.error && (
            <FormHelperText>{i18n.t(meta.error)}</FormHelperText>
          )}
        </FormControl>
      )}
    </Field>
  ) : null;

export default FileFieldInput;
