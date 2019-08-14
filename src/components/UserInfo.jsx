import React from "react";
import { connect } from "react-redux";

import { getTouchedRecommendationParams } from "../store/selectors/index";
import { updateTopTracks, updateSearchParams } from "../store/actions/index";

import Button from "../components/Button.jsx";
import Card from "./Card.jsx";
import Avatar from "./Avatar.jsx";

const mapStateToProps = state => {
  return {
    user: {
      touchedRecommendationParams: getTouchedRecommendationParams(state)
    }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearSearchParams: prop => dispatch(clearSearchParams())
  };
};

class UserInfo extends React.Component {
  render() {
    const touchedParamsList = this.props.user.touchedRecommendationParams.map(
      param => (
        <li key={param.id}>
          {param.label}: {Math.round(param.value / param.step)}
        </li>
      )
    );
    return (
      <Card>
        <span>
          <strong>Username:</strong> {this.props.username}
        </span>
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
        <Avatar
          imgSrc={this.props.imgUrl}
          alt={this.props.username + " avatar"}
        />
      </Card>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfo);
