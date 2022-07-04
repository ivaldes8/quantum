import _ from 'lodash';
import numeral from 'numeral';

// eslint-disable-next-line import/no-anonymous-default-export
export default {

  formatCurrency( number, currency ) {
    if ( number === 0 ) return '$0';
    if ( !number ) return number;

    let format = '$0,0.[000]';
    if ( currency === 'EUR' ) {
      format = '0,0.[000] EUR';
    }

    return numeral( number ).format( format );
  },

  formatCurrencyNoDecimals( number, currency ) {
    if ( number === 0 ) return '$0';
    if ( !number ) return number;

    let format = '$0,0';
    if ( currency === 'EUR' ) {
      format = '0,0 EUR';
    }

    return numeral( number ).format( format );
  },
  formatNumber( number ) {
    if ( !number ) return number;
    if ( !_.isNumber( number ) ) return number;
    return numeral( number ).format( '0,0.[00]' );
  },

  formatNumberFixedDec( number ) {
    if ( !number ) return number;
    if ( !_.isNumber( number ) ) return number;
    return numeral( number ).format( '0,0.00' );
  },

  formatNumberNoDecimals( number ) {
    if ( !number ) return number;
    if ( !_.isNumber( number ) ) return number;
    return numeral( number ).format( '0,0' );
  },
};
