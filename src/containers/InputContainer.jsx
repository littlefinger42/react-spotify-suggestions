import React from "react";
import styled from "styled-components";
import { style } from "../config";
import { connect } from "react-redux";

import { getTouchedRecommendationParams } from "../store/selectors/index";
import { clearSearchParams } from "../store/actions/index";

import Button from "../components/Button.jsx";
import Card from "../components/Card.jsx";
import TopTracks from "./TopTracks.jsx";
import SearchTracks from "./SearchTracks.jsx";
import RecommendationsSelector from "./RecommendationsSelector.jsx";

const InputContainerContainer = styled(Card)`
  padding: ${style.sizeSm};
`;
const InputItem = styled.div`
  flex: 1;
`;

const mapStateToProps = state => {
  return {
    user: {
      touchedRecommendationParams: getTouchedRecommendationParams(state)
    }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearSearchParams: prop => dispatch(clearSearchParams(prop))
  };
};

class InputContainer extends React.Component {
  notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

  render() {
    const touchedParamsList = this.props.user.touchedRecommendationParams.map(
      param => {
        return (
          <li key={param.id}>
            {param.label}:{" "}
            {param.id === "key"
              ? this.notes[param.value - 1]
              : Math.round(param.value / param.step)}
          </li>
        );
      }
    );
    return (
      <InputContainerContainer>
        <InputItem>
          <h1>Top Tracks</h1>
          <TopTracks />
        </InputItem>
        <InputItem>
          <h1>Search Tracks</h1>
          <SearchTracks />
        </InputItem>
        <InputItem>
          <strong>Seed tracks selected:</strong>
          <p>{this.props.tracksSelected}</p>
          <strong>Suggestion Parameters:</strong>
          <div>
            <RecommendationsSelector />
          </div>
          <p>
            <ul>
              {touchedParamsList && touchedParamsList.length === 0 && (
                <li>None Selected</li>
              )}
              {touchedParamsList}
              {touchedParamsList && touchedParamsList.length > 0 && (
                <li>
                  <Button handleClick={this.props.clearSearchParams}>
                    Clear
                  </Button>
                </li>
              )}
            </ul>
          </p>
        </InputItem>
      </InputContainerContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputContainer);
