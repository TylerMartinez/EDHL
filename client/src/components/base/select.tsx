import styled from 'styled-components'
 
interface SelectProps {
  placeholder?: string;
}

const Select = styled.select<SelectProps>`
  color: ${props => props.theme.text1};
  border: 2px solid ${props => props.theme.fieldHighlight};
  background: ${props => props.theme.fieldBg1};

  margin-bottom: 10px;

  width: 100%;

  padding: 5px;

  font-family: ${props => props.theme.font};
  font-size: 1em;

  display:block;

  .placeholder {
    display: none;
  }
`;

export default Select;