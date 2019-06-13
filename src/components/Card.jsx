import styled from "styled-components";
import { style } from "../config"

const Card = styled.div`
	background-color: ${style.blackLevelTwo};
	padding: ${style.sizeSm};
	margin: ${style.sizeXs} 0;
	border: 1px #000 solid;
	border-radius: ${style.borderRadius};
	box-shadow: #000 0px 0px ${style.sizeXs};

	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;

	&.active {
	  box-shadow: #7f7 0px 0px ${style.sizeXs} -2px;
	}
`;

export default Card;
