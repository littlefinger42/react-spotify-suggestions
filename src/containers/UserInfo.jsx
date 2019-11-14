import React from "react";
import { connect } from "react-redux";

import { getTouchedRecommendationParams } from "../store/selectors/index";
import { clearSearchParams } from "../store/actions/index";

import Button from "../components/Button.jsx";
import Card from "../components/Card.jsx";

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

class UserInfo extends React.Component {
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
      <Card>
        <span>
          <strong>Tracks Selected:</strong> {this.props.tracksSelected}
        </span>
        <span>
          <strong>Suggestion Parameters:</strong>
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
        </span>
      </Card>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
