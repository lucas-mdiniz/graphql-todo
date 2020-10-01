import styled from 'styled-components';

const StyledButton = styled.button`
  background: #99dbff;
  border: none;
  padding: 10px 15px;
  color: #000;
  font-weight: bold;
  min-width: 150px;
  font-size: 16px;
  border-radius: 5px;
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
  cursor: pointer;
  min-height: 40px;

  &:hover {
    background: #72cdfe;
  }
`;

export default StyledButton;
