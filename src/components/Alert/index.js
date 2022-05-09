import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";

export default class Alert extends React.Component {
  render() {
    let {
      description,
      handleAlertClose,
      tooltip,
      tooltipMsg,
      alertType,
    } = this.props;
    let background = null;
    let color = null;
    let info = null;
    let message = null;
    if (tooltipMsg && tooltipMsg.length !== 0) {
      background = tooltipMsg[0].background;
      color = tooltipMsg[0].color;
      info = tooltipMsg[0].info;
      message = tooltipMsg[0].message;
    }
    return (
      <div
        className={`alert alert-${alertType} alert-dismissible fade show ${background} ${color}`}
        role="alert"
      >
        <div className="text-center">
          {message || description}{" "}
          {tooltip && (
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip id="tooltip-disabled">{info}</Tooltip>}
            >
              <FeatherIcon icon="info" style={{ width: "15px" }}></FeatherIcon>
            </OverlayTrigger>
          )}
        </div>
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
          onClick={handleAlertClose}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  }
}
