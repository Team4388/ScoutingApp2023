import React from "react";
import { ProcessedDataBucketContext, useProcessedDataBucket } from "../../ProcessedDataBucketContext";
import Chart from "react-apexcharts";
import { Box } from "@mui/material";

const ComparativeBoxPlot = (props) => {
  let { processedDataBucket, setProcessedDataBucket } = useProcessedDataBucket();
  const getPercentile = (sorted_set, percentile) => {
    let idx = percentile * sorted_set.length;
    if (Math.floor(idx) == idx) return sorted_set[idx - 1] / 2 + sorted_set[idx] / 2;
    else return sorted_set[Math.floor(idx)];
  };
  const getFiveNumberSummary = (set) => {
    set.sort();
    return [set[0], getPercentile(set, 0.25), getPercentile(set, 0.5), getPercentile(set, 0.75), set[set.length - 1]];
  };
  const generateBoxPlotData = (pdb, setName, selectedTeams) => {
    let data = [];
    for (const teamNumber of selectedTeams) {
      //console.log(pdb.teamData[teamNumber].data_sets[setName]);
      data.push({
        x: teamNumber,
        y: getFiveNumberSummary(pdb.teamData[teamNumber].data_sets[setName]),
      });
    }
    return [
      {
        type: "boxPlot",
        data: data,
      },
    ];
  };

  return (
    <Box sx={{ width: "350px", height: "220px" }}>
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
          title: {
            text: props.title,
          },
        }}
        series={generateBoxPlotData(processedDataBucket, props.setName, props.selectedTeams)}
      />
    </Box>
    /* <Chart
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
      /> */
  );
};
export default ComparativeBoxPlot;
