import _ from 'lodash';
import i18n from '../../lang/i18nextConf';



const email = val => ( val ? /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test( val ) ? null : i18n.t('fieldError.email') : null );

const equalTo = fieldToValue => ( fieldFromValue, values ) => ( fieldFromValue === values[fieldToValue] ? null : 'fieldError.equalTo' );

const greaterThan = fieldToValue => ( fieldFromValue, values ) => ( !_.get( values, fieldToValue ) || !fieldFromValue || fieldFromValue > _.get( values, fieldToValue ) ? null : 'fieldError.greaterThan' );
const greaterOrEqualThan = fieldToValue => ( fieldFromValue, values ) => ( !_.get( values, fieldToValue ) || !fieldFromValue || fieldFromValue >= _.get( values, fieldToValue ) ? null : 'fieldError.greaterOrEqualThan' );

const lessOrEqualThan = fieldToValue => ( fieldFromValue, values ) => ( !_.get( values, fieldToValue ) || !fieldFromValue || fieldFromValue <= _.get( values, fieldToValue ) ? null : 'fieldError.lessOrEqualThan' );

const greaterThanValue = min => fieldFromValue => ( Number( fieldFromValue ) > Number( min ) ? null : 'fieldError.greaterThanValue' );
const greaterOrEqualValue = min => fieldFromValue => ( Number( fieldFromValue ) >= Number( min ) ? null : 'fieldError.greaterOrEqualThanValue' );
const greaterOrEqualThanValue = min => fieldFromValue => ( Number( fieldFromValue ) >= Number( min ) ? null : 'fieldError.greaterOrEqualThanValue2' );

const lessThanValue = min => fieldFromValue => ( Number( fieldFromValue ) < Number( min ) ? null : 'fieldError.lessThanValue' );
const lessOrEqualValue = min => fieldFromValue => ( Number( fieldFromValue ) <= Number( min ) ? null : 'fieldError.lessOrEqualThanValue' );
const lessOrEqualThanValue = min => fieldFromValue => ( Number( fieldFromValue ) <= Number( min ) ? null : 'fieldError.lessOrEqualThanValue2' );

const minLength = ( val, length ) => ( val && val.length >= length ? null : `${length} or more characters is required` );

const required = ( val ) => {
  if ( _.isBoolean( val ) ) {
    return val ? null : 'fieldError.required';
  }
  if ( _.isNumber( val ) ) {
    return val || val === 0 ? null : 'fieldError.required';
  }
  return val && val.toString().length ? null : 'fieldError.required';
};

const passwordZulipValidation = val => ( val.match( /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{10,14}$/ ) ? null
  : 'fieldError.strongZulipPassword' );

const passwordWeakValidation = val => ( val.match( /^[.!@#$%^&*0-9a-zA-Z]{7,14}$/ ) ? null
  : 'fieldError.weakPassword' );

const validUrl = ( val ) => {
  if ( val ) {
    return val.match( /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/ ) ? null : 'This is not a valid url';
  }
  return null;
};

const validZip = val => ( val && /^\d{4,5}(?:-\d{4})?$/.test( val ) ? null : 'This is not a valid zip' );

const composeValidators = ( ...validators ) => ( value, values ) => (
  validators.reduce( ( error, validator ) => error || validator( value, values ), undefined )
);

export {
  email,
  equalTo,
  minLength,
  greaterThan,
  greaterThanValue,
  lessThanValue,
  required,
  passwordZulipValidation,
  passwordWeakValidation,
  validUrl,
  validZip,
  greaterOrEqualValue,
  lessOrEqualValue,
  lessOrEqualThanValue,
  lessOrEqualThan,
  composeValidators,
  greaterOrEqualThan,
  greaterOrEqualThanValue,
};
