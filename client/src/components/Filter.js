import React from "react";
import { ButtonGroup } from "@blueprintjs/core";
import FilterLink from "../containers/FilterLink";
import { VisibilityFilters } from "../actions";

const Filter = () => (
  <ButtonGroup>
    <FilterLink filter={VisibilityFilters.SHOW_ALL}>All</FilterLink>
    <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>Active</FilterLink>
    <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>Completed</FilterLink>
  </ButtonGroup>
);

export default Filter;
