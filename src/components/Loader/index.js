import React from "react";
import LoadingOverlay from "react-loading-overlay";
import "./style.css";

class Loader extends React.Component {
  render() {
    const { active, text } = this.props;
    return (
      <LoadingOverlay active={active} spinner text={text}></LoadingOverlay>
    );
  }
}

export default Loader;
