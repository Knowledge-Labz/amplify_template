import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

export const Logo = styled((props) => {
  const { variant, ...other } = props;

  const color = variant === 'light' ? '#C1C4D6' : '#5048E5';

  return (
<svg 
  version="1.0" 
  xmlns="http://www.w3.org/2000/svg"
  width="50.000000pt" 
  height="54.66667pt" 
  viewBox="0 0 150.000000 164.000000"
  preserveAspectRatio="xMidYMid meet">
<metadata>
Created by potrace 1.16, written by Peter Selinger 2001-2019
</metadata>
<g 
  transform="translate(0.000000,164.000000) scale(0.100000,-0.100000)"
  fill="#00549F" 
  stroke="none">
<path d="M485 1601 c-155 -41 -284 -104 -398 -193 l-37 -30 0 -166 c0 -92 5
-196 10 -232 5 -36 12 -85 16 -110 11 -78 73 -268 114 -351 109 -217 277 -387
472 -479 77 -36 101 -37 173 -5 62 27 185 105 185 117 0 4 -94 8 -210 8 l-210
0 0 120 0 120 327 2 327 3 47 90 c26 50 50 101 54 115 l6 25 -381 -3 -380 -2
0 125 0 125 414 0 414 0 6 23 c4 12 9 64 13 115 l6 92 -427 0 -426 0 0 125 0
125 425 0 c253 0 425 4 425 9 0 5 -21 28 -47 50 -66 57 -249 146 -363 176 -86
23 -113 25 -290 24 -156 0 -209 -4 -265 -18z"/>
</g>
</svg>
  );
})``;

Logo.defaultProps = {
  variant: 'primary'
};

Logo.propTypes = {
  variant: PropTypes.oneOf(['light', 'primary'])
};
