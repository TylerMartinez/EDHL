import styled from 'styled-components'
 
const CommandButton = styled.button`
  color: ${props => props.theme.text1};
  border: 2px solid ${props => props.theme.fieldHighlight};
  background: ${props => props.theme.fieldBg1};

  display: block;

  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;

  font-family: ${props => props.theme.font};
  font-size: 2em;

  cursor: pointer;
`;

export default CommandButton;