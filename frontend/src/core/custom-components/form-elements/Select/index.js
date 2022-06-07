import React from 'react';
import { Field } from 'react-final-form';
import { FormControl, FormHelperText, TextField } from "@mui/material";
import _ from 'lodash';
import classNames from 'classnames';
import Select from 'react-select';
import i18n from "../../../lang/i18nextConf";

const SelectField = ( {
                        field, idKey, labelKey, onChange,
                        containerClass, emptyValue = false, fullWidth = true, marginContainer = true,
                        intl, label, options, translateOptions = true, translateValues, validate, ...rest
                      } ) => {
  options = emptyValue && !rest.isMulti ? [{ id: null }, ...options] : options;
  if (options && options[0] && options[0].id === null) {
    options[0][labelKey || 'name'] = '--';
  }

  return (
    field ? (
      <Field name={field} validate={validate}>
        {( { input, meta } ) => {
          const predefinedValue = input.value || ( rest.isMulti ? [] : '' );

          return (
            <FormControl
              className={classNames( containerClass, { 'mb-4': marginContainer } )}
              style={fullWidth ? {
                flex: 1,
                display: 'flex'
              } : {}}
              error={meta.touched && !!meta.error}
            >
              {label && (
                <label>
                  {i18n.t(label)}
                </label>
              )}
              <Select
                {...rest}
                classNamePrefix="custom-select"
                className={classNames( 'custom-select-container', {
                  'is-invalid': meta.touched && meta.error,
                } )}
                placeholder={rest.placeholder ? i18n.t(rest.placeholder) : ''}
                value={rest.isMulti ? predefinedValue.map( item => ( {
                    value: item,
                    label: _.get( options.find( o => o[idKey || 'id'] === item ), [labelKey || 'name'] ),
                  } ) )
                  : predefinedValue && {
                  value: predefinedValue,
                  label: _.get( options.find( o => o[idKey || 'id'] === predefinedValue ), [labelKey || 'name'] ),
                }}
                onChange={( val ) => {
                  if (val !== input.value) {
                    input.onChange( val ? rest.isMulti ? _.map( val, 'value' ) : val.value : null );
                    if (onChange) onChange( val ? rest.isMulti ? _.map( val, 'value' ) : val.value : null, input.value );
                  }
                }}
                options={_.map( options, option => ( {
                  value: _.get( option, idKey || 'id' ),
                  label: translateOptions ? option[labelKey || 'name'] ? intl.formatMessage( { id: option[labelKey || 'name'] } )
                    : option[labelKey || 'name']
                    : _.get( option, labelKey || 'name' ),
                } ) )}
              />
              {meta.touched && meta.error
              && <FormHelperText>{meta.error}</FormHelperText>
              }
            </FormControl>
          );
        }}
      </Field>
    ) : (
      <FormControl
        className={classNames( containerClass, { 'mb-4': marginContainer } )}
        style={fullWidth ? {
          flex: 1,
          display: 'flex'
        } : {}}
      >
        {label &&
        <label>
           {i18n.t(label)}
        </label>
        }

        <Select
          {...rest}
          className="pb-0"
          classNamePrefix="custom-select"
          placeholder={rest.placeholder ?  i18n.t(rest.placeholder) : ''}
          value={rest.value ? rest.isMulti ? rest.value.map( item => ( {
              value: item,
              label: _.get( options.find( o => o[idKey || 'id'] === item ), [labelKey || 'name'] ),
            } ) )
            : {
              value: rest.value,
              label: _.get( options.find( o => o[idKey || 'id'] === rest.value ), [labelKey || 'name'] ),
            } : rest.isMulti ? [] : ''
          }
          onChange={( val ) => {
            if (val !== rest.value) {
              if (onChange) {
                if (val) {
                  onChange( rest.isMulti ? _.map( val, 'value' ) : val.value ? val.value : null );
                } else {
                  onChange( null );
                }
              }
            }
          }}
          options={_.map( options, option => ( {
            value: _.get( option, idKey || 'id' ),
            label: translateOptions ? _.get( option, labelKey || 'name' ) ? intl.formatMessage( { id: _.get( option, labelKey || 'name' ) } )
              : _.get( option, labelKey || 'name' )
              : _.get( option, labelKey || 'name' ),
          } ) )}
        />
      </FormControl>
    ) );
};

export default SelectField;
