import styled from "styled-components";
import { style } from "../config"

const Card = styled.div`
	position: relative;
	background-color: ${style.blackLevelTwo};
	padding: ${style.sizeXs};
	margin: ${style.sizeXs} 0;
	border: 1px #000 solid;
	border-radius: ${style.borderRadius};
	box-shadow: #000 0px 0px ${style.sizeXs};

	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;

	@media ${style.device.tablet} {
		padding: ${style.sizeSm};
	  }

	&.active {
	  box-shadow: ${style.primaryColor} 0px 0px ${style.sizeXs} 2px;
	}
`;

export default Card;
