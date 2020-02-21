import React from "react";
import { connect } from "react-redux";

import {
  getTouchedRecommendationParams,
  getSelectedTracks,
  getRecommendedTracks
} from "../store/selectors/index";

import Main from "../components/Main.jsx";
import InputContainer from "../containers/InputContainer.jsx";
import OutputContainer from "../containers/OutputContainer.jsx";
import FlexContainer from "../components/FlexContainer.jsx";

const mapStateToProps = state => {
  return {
    user: {
      touchedRecommendationParams: getTouchedRecommendationParams(state)
    },
    selectedTracks: getSelectedTracks(state),
    recommendedTracks: getRecommendedTracks(state)
  };
};

function HomeContainer(props) {
  return (
    <Main>
      <FlexContainer>
        <InputContainer
          tracksSelected={props.selectedTracks.length}
          touchedParams={props.touchedRecommendationParams}
        />
        {props.recommendedTracks && props.recommendedTracks.length > 0 && (
          <OutputContainer tracks={props.recommendedTracks} />
        )}
      </FlexContainer>
    </Main>
  );
}

export default connect(mapStateToProps)(HomeContainer);
