import React from "react";
import styled from "styled-components";
import { style } from "../config";
import { connect } from "react-redux";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

import { getTouchedRecommendationParams } from "../store/selectors/index";
import { clearSearchParams } from "../store/actions/index";

import Button from "../components/Button.jsx";
import Card from "../components/Card.jsx";
import TopTracks from "./TopTracks.jsx";
import SearchTracks from "./SearchTracks.jsx";
import RecommendationsSelector from "./RecommendationsSelector.jsx";

const InputContainerContainer = styled(Card)`
  padding: ${style.sizeSm};
  max-width: 400px;
`;
const InputItem = styled.div`
  flex: 1;
  margin-bottom: ${style.sizeSm};
`;
const InputItemHeader = styled.h3`
  margin-bottom: ${style.sizeXs};
  cursor: pointer;
`;
const InputContainerHeader = styled.div`
  height: 50px;
  padding-bottom: ${style.sizeSm};
  display: flex;
  justify-content: space-between;
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
  constructor(props) {
    super(props);
    this.abortController = new AbortController();
    this.state = {
      tabsOpen: {
        topTracks: true,
        searchTracks: false,
        suggestionParameters: false
      }
    };
  }

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

    const toggleTab = tab =>
      this.setState(prevState => ({
        tabsOpen: {
          ...prevState.tabsOpen,
          [tab]: !prevState.tabsOpen[tab]
        }
      }));

    return (
      <InputContainerContainer>
        <InputContainerHeader>
          <span className="h2">Input</span>
          <span style={{ flexBasis: "50%" }}>
            <div>
              <strong>Seed Tracks: </strong>
              {this.props.tracksSelected}
            </div>
            <div>
              <strong>Suggestion Parameters: </strong>
              {this.props.user.touchedRecommendationParams.length > 0 ? (
                <span>
                  {this.props.user.touchedRecommendationParams
                    .map(param => param.label)
                    .join(", ")}
                </span>
              ) : (
                "None"
              )}
            </div>
          </span>
        </InputContainerHeader>

        <InputItem>
          <InputItemHeader onClick={() => toggleTab("topTracks")}>
            Top Tracks
            {this.state.tabsOpen.topTracks ? (
              <MdExpandLess />
            ) : (
              <MdExpandMore />
            )}
          </InputItemHeader>
          {this.state.tabsOpen.topTracks && <TopTracks />}
        </InputItem>
        <InputItem>
          <InputItemHeader onClick={() => toggleTab("searchTracks")}>
            Search Tracks
            {this.state.tabsOpen.searchTracks ? (
              <MdExpandLess />
            ) : (
              <MdExpandMore />
            )}
          </InputItemHeader>
          {this.state.tabsOpen.searchTracks && <SearchTracks />}
        </InputItem>
        <InputItem>
          <InputItemHeader onClick={() => toggleTab("suggestionParameters")}>
            Suggestion Parameters{" "}
            {this.state.tabsOpen.suggestionParameters ? (
              <MdExpandLess />
            ) : (
              <MdExpandMore />
            )}
          </InputItemHeader>
          {this.state.tabsOpen.suggestionParameters && (
            <div>
              <div>
                <RecommendationsSelector />
              </div>

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
            </div>
          )}
        </InputItem>
      </InputContainerContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputContainer);
