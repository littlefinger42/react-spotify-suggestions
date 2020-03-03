import React, { useState } from "react";
import styled from "styled-components";
import { style } from "../config";
import { connect } from "react-redux";
import {
  getTouchedRecommendationParams,
  getSelectedTracks,
  getUserAccessToken
} from "../store/selectors/index";
import { addRecommendedTracks } from "../store/actions/index";

import spotifyUtils from "../utils/spotifyUtils";

import Spinner from "../components/Spinner.jsx";
import Alert from "../components/Alert.jsx";
import Button from "../components/Button.jsx";
import TrackList from "../containers/TrackList.jsx";

const ButtonContainer = styled.div`
  margin-top: ${style.sizeXs};
`;

const mapStateToProps = state => ({
  user: {
    accessToken: getUserAccessToken(state),
    touchedRecommendationParams: getTouchedRecommendationParams(state)
  },
  selectedTracks: getSelectedTracks(state)
});

const mapDispatchToProps = dispatch => ({
  addRecommendedTracks: prop => dispatch(addRecommendedTracks(prop))
});

function SelectedTracks(props) {
  const [isLoading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  /**
   * Uses spotify utils to fetch recommendations based on selected tracks in the state, then sets them to the state
   */
  const getRecommendations = () => {
    const { user, addRecommendedTracks, selectedTracks } = props;

    if (selectedTracks.length === 0) {
      setAlert({
        type: "warning",
        message: "Select some tracks as seeds first!"
      });
      return false;
    }

    setLoading(true);
    spotifyUtils
      .getSpotifyRecommendations(
        user.accessToken,
        selectedTracks.map(track => track.id),
        user.touchedRecommendationParams
      )
      .then(response => {
        if (response.error) {
          setAlert({ type: "danger", message: response.error });
          setLoading(false);
          return false;
        }
        addRecommendedTracks(response);
        setLoading(false);
      });
  };

  return (
    <div>
      {props.selectedTracks.length > 0 ? (
        <div>
          <TrackList min tracks={props.selectedTracks} />
          <ButtonContainer>
            <Button
              disabled={props.selectedTracks.length < 1 || isLoading}
              handleClick={getRecommendations}
            >
              Suggest tracks
            </Button>
            {isLoading && <Spinner />}
          </ButtonContainer>
        </div>
      ) : (
        <Alert
          type="warning"
          message="Select some tracks to use as seeds for suggestions."
        />
      )}
      {alert && alert.message && (
        <Alert type={alert.type} message={alert.message}></Alert>
      )}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedTracks);
