import styled from "styled-components/native";
import colors from "../../colors";

const Button = styled.TouchableOpacity`
  background-color: "rgba(4, 136, 237, 0.08)";
  border-width: 1;
  border-style: solid;
  border-color: ${colors.primaryColor};
  padding-left: 7;
  padding-right: 7;
  padding-top: 3;
  padding-bottom: 3;
  border-radius: 10;
`;

export default Button;
