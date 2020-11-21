import React from 'react';
import styled from 'styled-components';

interface SearchIconProps {
  fill?: string;
}

const SearchIcon: React.FC<SearchIconProps> = ({ fill }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="27.995"
      height="28"
      viewBox="0 0 27.995 28"
      fill={fill}
    >
      <path
        fill="fill"
        d="M27.614,24.208l-5.452-5.452a1.311,1.311,0,0,0-.93-.383h-.891a11.369,11.369,
        0,1,0-1.969,1.969v.891a1.311,1.311,0,0,0,.383.93l5.452,5.452a1.307,
        1.307,0,0,0,1.854,0l1.548-1.548A1.319,1.319,0,0,0,27.614,24.208ZM11.374,
        18.373a7,7,0,1,1,7-7A7,7,0,0,1,11.374,18.373Z"
      />
    </Svg>
  );
};

export default SearchIcon;

const Svg = styled.svg`
  position: absolute;
  top: 25%;
  right: 0;
  margin-right: 10px;
  height: 28px;
  width: 28px;
`;
