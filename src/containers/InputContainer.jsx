import React, { useState } from "react";
import styled from "styled-components";
import { style } from "../config";
import { connect } from "react-redux";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

import { getTouchedRecommendationParams } from "../store/selectors/index";
import { clearSearchParams } from "../store/actions/index";

import Button from "../components/Button.jsx";
import Card from "../components/Card.jsx";
import TopTracks from "./TopTracks.jsx";
import SelectedTracks from "./SelectedTracks.jsx";
import RecentTracks from "./RecentTracks.jsx";
import SearchTracks from "./SearchTracks.jsx";
import RecommendationsSelector from "./RecommendationsSelector.jsx";

const InputContainerContainer = styled.div`
  flex-basis: 100%;
  flex-grow: 0;
  @media ${style.device.tablet} {
    flex-basis: 50%;
  }
`;
const InputItem = styled.div`
  flex: 1;
  margin-bottom: ${style.sizeSm};
  &:last-child {
    margin-bottom: 0;
  }
`;
const InputItemHeader = styled.h3`
  margin-bottom: ${style.sizeXs};
  cursor: pointer;
  font-size: 14px;
  ${props => (props.strong ? "font-weight: bold;" : "")}
  @media ${style.device.tablet} {
    font-size: 16px;
  }
  @media ${style.device.laptop} {
    font-size: 18px;
  }
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

function InputContainer(props) {
  const [tabOpen, setTabOpen] = useState("topTracks");
  const notes = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B"
  ];

  const touchedParamsList = props.user.touchedRecommendationParams.map(
    param => {
      return (
        <li key={param.id} style={{ marginTop: 10 }}>
          {param.label}:{" "}
          {param.id === "key"
            ? notes[param.value - 1]
            : `${Math.round(param.value / param.step)}/${param.range[1] /
                param.step}`}
        </li>
      );
    }
  );

  return (
    <InputContainerContainer>
      <Card>
        <InputItem>
          <InputItemHeader strong>Selected Tracks</InputItemHeader>
          <SelectedTracks />
        </InputItem>
      </Card>
      <Card>
        <InputItem>
          <InputItemHeader onClick={() => setTabOpen("suggestionParameters")}>
            Suggestion Parameters (
            {props.user.touchedRecommendationParams.length})
            {tabOpen === "suggestionParameters" ? (
              <MdExpandLess />
            ) : (
              <MdExpandMore />
            )}
          </InputItemHeader>
          {tabOpen === "suggestionParameters" && (
            <div>
              <InputItem>
                <RecommendationsSelector />
              </InputItem>

              <InputItem>
                <ul>
                  {touchedParamsList && touchedParamsList.length === 0 && (
                    <li>None Selected</li>
                  )}
                  {touchedParamsList}
                  {touchedParamsList && touchedParamsList.length > 0 && (
                    <li style={{ marginTop: 10 }}>
                      <Button handleClick={props.clearSearchParams}>
                        Clear
                      </Button>
                    </li>
                  )}
                </ul>
              </InputItem>
            </div>
          )}
        </InputItem>
        <InputItem>
          <InputItemHeader onClick={() => setTabOpen("topTracks")}>
            Top Tracks
            {tabOpen === "topTracks" ? <MdExpandLess /> : <MdExpandMore />}
          </InputItemHeader>
          {tabOpen === "topTracks" && <TopTracks />}
        </InputItem>
        <InputItem>
          <InputItemHeader onClick={() => setTabOpen("recentTracks")}>
            Recent Tracks
            {tabOpen === "recentTracks" ? <MdExpandLess /> : <MdExpandMore />}
          </InputItemHeader>
          {tabOpen === "recentTracks" && <RecentTracks />}
        </InputItem>
        <InputItem>
          <InputItemHeader onClick={() => setTabOpen("searchTracks")}>
            Search Tracks
            {tabOpen === "searchTracks" ? <MdExpandLess /> : <MdExpandMore />}
          </InputItemHeader>
          {tabOpen === "searchTracks" && <SearchTracks />}
        </InputItem>
      </Card>
    </InputContainerContainer>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(InputContainer);
