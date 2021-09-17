import React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Wrapper } from './Loader.styled';

const Spinner = () => (
  <Wrapper>
    <Loader
      type="ThreeDots"
      marginRight="auto"
      marginLeft="auto"
      color="#00BFFF"
      height={80}
      width={80}
    />
  </Wrapper>
);

export default Spinner;
