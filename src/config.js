const spotify = {
  clientId: "6a055beb5e304ad19bf4dc36a07e3fcd",
  // redirectUrl: "http://localhost:8080/"
  redirectUrl: "https://spotify-suggestions-generator.netlify.com/"
};

const sizes = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px"
};

const style = {
  blackBackground: "#101010",
  blackLevelOne: "#212121",
  blackLevelTwo: "#303030",
  primaryColor: "#6200ee",
  secondaryColor: "#2700ee",
  disabledColor: "#756e80",
  textColor: "#fff",
  sizeXs: "8px",
  sizeSm: "16px",
  sizeMd: "32px",
  sizeLg: "64px",
  borderRadius: "4px",
  device: {
    mobileS: `only screen and (min-width: ${sizes.mobileS})`,
    mobileM: `only screen and (min-width: ${sizes.mobileM})`,
    mobileL: `only screen and (min-width: ${sizes.mobileL})`,
    tablet: `only screen and (min-width: ${sizes.tablet})`,
    laptop: `only screen and (min-width: ${sizes.laptop})`,
    laptopL: `only screen and (min-width: ${sizes.laptopL})`,
    desktop: `only screen and (min-width: ${sizes.desktop})`,
    desktopL: `only screen and (min-width: ${sizes.desktop})`
  }
};

export { spotify, style };
