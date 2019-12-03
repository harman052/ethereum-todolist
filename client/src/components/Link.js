import React from "react";
import { Button } from "@blueprintjs/core";
import PropTypes from "prop-types";

const Link = ({ active, children, onClick }) => (
  <Button onClick={onClick} disabled={active}>
    {children}
  </Button>
);

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Link;
