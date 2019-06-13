import style from "styled-components";

const Card = style.div`
	background-color: #303030;
	padding: 16px;
	margin: 8px 0;
	border: 1px #000 solid;
	border-radius: 4px;
	box-shadow: #000 0px 0px 8px;

	display: flex;
	justify-content: space-between;
	align-items: center;

	&.active {
	  box-shadow: #7f7 0px 0px 8px;
	}
`;

export default Card;
