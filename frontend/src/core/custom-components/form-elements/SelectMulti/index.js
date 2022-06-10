import React from 'react'
import {  Field } from "react-final-form";
import i18n from "../../../lang/i18nextConf";
import MultiSelect from './MultiSelect';

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
    selectkey="name",
    ...rest }) => (
    <Field
        name={field}
        label={rest.label ? i18n.t(rest.label) : null}
        validate={validate}
        styling="field"
        options = {options}
        selectkey={selectkey}
        multiple={true}
        component={MultiSelect}
        
    />
)

export default index