import React from "react";
import ComparisonPanel from "./ComparisonPanel";

const AnalyticsPanel = (props) => {
  if (props.selectedTeams.length > 0) return <ComparisonPanel selectedTeams={props.selectedTeams} />;
  return <div />;
};

export default AnalyticsPanel;
