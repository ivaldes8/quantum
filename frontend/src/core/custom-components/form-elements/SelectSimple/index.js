import React from 'react'
import { Field } from "react-final-form";
import i18n from "../../../lang/i18nextConf";
import SimpleSelect from './SimpleSelect';

const options = {}

const index = ({ field,
    containerClass,
    fullWidth = true,
    onChange,
    value,
    allowZero = false,
    translateValues,
    validate,
    intl,
    marginContainer = true,
    options,
    simple = false,
    selectkey = "name",
    ...rest }) =>
(
    <Field
        name={field}
        label={rest.label ? i18n.t(rest.label) : null}
        validate={validate}
        styling="field"
        options={options}
        selectkey={selectkey}
        component={SimpleSelect}
        simple={simple}

    />
)

export default index