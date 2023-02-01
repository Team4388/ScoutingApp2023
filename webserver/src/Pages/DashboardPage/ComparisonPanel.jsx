import React from "react";
import { ProcessedDataBucketContext, useProcessedDataBucket } from "../../ProcessedDataBucketContext";
import Chart from "react-apexcharts";
import { Box } from "@mui/material";
import ComparativeBoxPlot from "./ComparativeBoxPlot";

const ComparisonPanel = (props) => {
  let { processedDataBucket, setProcessedDataBucket } = useProcessedDataBucket();
  if (processedDataBucket == null) return <div />;

  //gets the given percentile of a sorted set
  return (
    <Box
      sx={{
        height: "400px",
        m: 1,
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "center",
        p: 1,
        gap: 2,
      }}
    >
      <ComparativeBoxPlot setName="total_match_points" title="Total Match Points" selectedTeams={props.selectedTeams} />
      <ComparativeBoxPlot setName="auto_points" title="Auto Points" selectedTeams={props.selectedTeams} />
      <ComparativeBoxPlot setName="teleop_hub_points" title="Teleop Hub Points" selectedTeams={props.selectedTeams} />
      <ComparativeBoxPlot setName="climb_points" title="Climb Points" selectedTeams={props.selectedTeams} />
      <ComparativeBoxPlot setName="upper_hub_auto" title="Upper Hub Auto" selectedTeams={props.selectedTeams} />
      <ComparativeBoxPlot setName="lower_hub_auto" title="Lower Hub Auto" selectedTeams={props.selectedTeams} />
      <ComparativeBoxPlot setName="upper_hub_teleop" title="Upper Hub Teleop" selectedTeams={props.selectedTeams} />
      <ComparativeBoxPlot setName="lower_hub_teleop" title="Lower Hub Teleop" selectedTeams={props.selectedTeams} />
      {/* <Box sx={{ width: "300px", height: "200px" }}>
        <Chart
          type="boxPlot"
          options={{
            chart: {
              type: "boxPlot",
              width: 350,
            },
            theme: {
              mode: "dark",
            },
          }}
          series={generateBoxPlotData(processedDataBucket, "upper_hub_auto", props.selectedTeams)}
        />
      </Box> */}
      {/* <Chart
        options={{
          chart: {
            width: 384,
            type: "pie",
          },
          labels: ["None", "Low", "Mid", "High", "Transversal"],
        }}
        series={processedDataBucket.teamData[4388].climb_counts}
        type="pie"
        width={380}
      /> */}
    </Box>
  );
};

export default ComparisonPanel;
