const Loader = ({ size = 20 }) => {
  const borderSize = 4; // épaisseur de la bordure

  const loaderStyle = {
    width: size,
    height: size,
    margin: "auto",
    // border: `${borderSize}px solid rgba(255, 255, 255, 0.2)`, // bordure claire
    border: `${borderSize}px solid #9229a0`,
    borderTop: `${borderSize}px solid #fff`, // bordure blanche en haut
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  return <div style={loaderStyle} />;
};

export default Loader;
