import styled from 'styled-components'
 
const Input = styled.input`
  color: ${props => props.theme.text1};
  border: 2px solid ${props => props.theme.fieldHighlight};
  background: ${props => props.theme.fieldBg1};

  margin-bottom: 10px;

  padding: 5px;

  font-family: ${props => props.theme.font};
  font-size: 1em;
`;

export default Input;