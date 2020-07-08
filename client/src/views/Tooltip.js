import styled from 'styled-components';

export default styled.span`
  position:relative;
  color:red;
  cursor:pointer;

  &:after {
    content:attr(data-tooltip);
    position:absolute;
    transition:0.3s;
    background-color:rgba(141, 184, 162, 0.9);
    color:white;
    left:0;
    bottom:100%;
    box-shadow:0 .5em 3em rgba(255,255,255,0.3);
    opacity:0;
    padding:0.2em 0.5em;
    border-radius:2px;
    font-size:0.7em;
  }

  &:hover:after {
    opacity:1;
  }
`;
