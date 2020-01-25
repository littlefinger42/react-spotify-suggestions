import React from "react";
import styled from "styled-components";
import { style } from "../config";

import Card from "../components/Card.jsx";
import Pagination from "../components/Pagination.jsx";
import TrackList from "../containers/TrackList.jsx";
import TopTracks from "./TopTracks.jsx";

const OutputContainerCountainer = styled(Card)`
  padding: ${style.sizeSm};
  flex: 1;
`;
const OutputItem = styled.div`
  flex: 1;
`;
const OutputContainerHeader = styled.div`
  height: 50px;
  padding-bottom: ${style.sizeSm};
  display: flex;
  justify-content: space-between;
`;

class InputContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTrackList: this.props.tracks.length - 1
    };
  }

  switchList = (event, id) => {
    this.setState({ selectedTrackList: id });
  };

  render() {
    return (
      <OutputContainerCountainer>
        <OutputContainerHeader>
          <span className="h2">Output</span>
          <div>
            <Pagination
              handleClick={this.switchList}
              selectedPageId={this.state.selectedTrackList}
              pages={this.props.tracks}
            />
          </div>
        </OutputContainerHeader>

        <OutputItem>
          <div style={{ width: "100%" }}>
            {this.props.tracks.map((trackList, index) => {
              console.log(this.props.tracks);
              return (
                <TrackList
                  className={
                    trackList.id === this.state.selectedTrackList
                      ? ""
                      : "hidden"
                  }
                  key={index}
                  id={index}
                  tracks={trackList.tracks}
                />
              );
            })}
          </div>
        </OutputItem>
      </OutputContainerCountainer>
    );
  }
}

export default InputContainer;
