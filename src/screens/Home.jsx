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
import Button from "../components/Button.jsx";
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

class HomeContainer extends React.Component {
  render() {
    return (
      <Main>
        <FlexContainer>
          <InputContainer
            tracksSelected={this.props.selectedTracks.length}
            touchedParams={this.props.touchedRecommendationParams}
          />
          {this.props.recommendedTracks &&
            this.props.recommendedTracks.length > 0 && (
              <OutputContainer tracks={this.props.recommendedTracks} />
            )}
        </FlexContainer>
        {alert}
      </Main>
    );
  }
}

export default connect(mapStateToProps)(HomeContainer);
