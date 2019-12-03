import React from "react";
import PropTypes from "prop-types";
import { Icon } from "@blueprintjs/core";
import "./UIState.scss";

const UIState = ({ icon, iconSize, intent = "none", title, desc }) => {
  return (
    <div className="ui-state">
      <div>{<Icon icon={icon} iconSize={iconSize} intent={intent}></Icon>}</div>
      <span className="ui-state-title">{title}</span>
      <span className="ui-state-desc">{desc}</span>
    </div>
  );
};

UIState.propTypes = {
  icon: PropTypes.string,
  iconSize: PropTypes.string,
  intent: PropTypes.string,
  title: PropTypes.string,
  desc: PropTypes.string
};

export default UIState;
