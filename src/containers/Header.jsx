import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { style } from "../config";

import Avatar from "../components/Avatar.jsx";

import {
  getUserAccessToken,
  getSpotifyDisplayName,
  getSpotifyDisplayImgUrl,
  getSpotifyUserId
} from "../store/selectors/index";

const HeaderStyled = styled.header`
  height: ${style.sizeLg};
  padding: 0 ${style.sizeSm};
  background-color: ${style.blackLevelOne};
  color: white;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
  > * {
    margin-left: ${style.sizeSm};
  }
`;

const HeaderTitle = styled.h1`
  font-size: 16px;
  @media ${style.device.tablet} {
    font-size: 20px;
  }
  @media ${style.device.laptop} {
    font-size: 24px;
  }
`;

const HeaderVersion = styled.span`
  font-size: 14px;
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
      accessToken: getUserAccessToken(state),
      spotify: {
        display_name: getSpotifyDisplayName(state),
        img_url: getSpotifyDisplayImgUrl(state),
        id: getSpotifyUserId(state)
      }
    }
  };
};

class Header extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <HeaderStyled>
        <HeaderTitle>{this.props.title}</HeaderTitle>

        <HeaderInfo>
          {user && user.spotify && user.spotify.display_name && (
            <>
              <span>Username: {user.spotify.display_name}</span>
              <Avatar
                imgSrc={user.spotify.img_url}
                alt={user.spotify.display_name + " avatar"}
              />
            </>
          )}
          <HeaderVersion>v{this.props.version}</HeaderVersion>
        </HeaderInfo>
      </HeaderStyled>
    );
  }
}

export default connect(mapStateToProps)(Header);
