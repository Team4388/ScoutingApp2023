import React, { useState, useCallback, useRef } from "react";
import { useLocalDb } from "../../DbContext";
import { ProcessedDataBucketContext, useProcessedDataBucket } from "../../ProcessedDataBucketContext";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import AnalyticsPanel from "./AnalyticsPanel";
import { getProcessedDataBucket, updateProcessedDataBucket } from "../../ProcessedDataBucket";

//https://ag-grid.com/react-data-grid/
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";

const DashboardPage = () => {
  // <ProcessedDataBucketContext.Consumer>
  {
    /* {(pdbCtx) => { */
  }
  // const pdb = useProcessedDataBucket().processedDataBucket;
  // const makePieChartData = (pdb, team_num) => {
  //   // console.log(team_num);
  //   // console.log(pdb.teamData);
  //   return {
  //     labels: ["None", "Low", "Mid", "High", "Transversal"],
  //     datasets: [
  //       {
  //         label: "Climbs",
  //         data: pdb.teamData[4388].climb_counts,
  //         backgroundColor: ["rgba(230,20,20)", "rgba(230,150,20)", "rgba(160,220,20)", "rgba(20,230,70)", "rgba(20,200,180)"],
  //       },
  //     ],
  //   };
  // };
  let {localdb} = useLocalDb();
  let { processedDataBucket, setProcessedDataBucket } = useProcessedDataBucket();
    // updateProcessedDataBucket(localdb, setProcessedDataBucket);

  let rowData = [];
  if (processedDataBucket != null) {
    //turns the values of the key value pairs in the list into an array
    let team_data_array = Object.values(processedDataBucket.teamData);
    // let team_data_array = Array.from(processedDataBucket.teamData);
    const roundPlaces = (n, d) => Math.round(n * Math.pow(10, d)) / Math.pow(10, d);
    // team_data_array.forEach((value, index, array) => {
    for (const property in processedDataBucket.teamData) {
      let value = processedDataBucket.teamData[property];
      rowData.push({
        id: value.team_number,
        average_auto_points: roundPlaces(value.average_auto_points, 2),
        average_teleop_hub_points: roundPlaces(value.average_teleop_hub_points, 2),
        average_climb_points: roundPlaces(value.average_climb_points, 2),
        average_total_match_points: roundPlaces(value.average_total_match_points, 2),
        matches_played: value.matches_played,
        num_disables: value.num_disables,
        num_flips: value.num_flips,
        fouls: value.fouls,
        fouls_tech: value.fouls_tech,
        red_cards: value.red_cards,
        yellow_cards: value.yellow_cards,
      });
    }
  }

  const [columnDefs] = useState([
    { field: "id", headerName: "Team", width: 100, checkboxSelection: true, pinned: "left", sortable: true },
    { field: "average_total_match_points", headerName: "Avg Total Pts", width: 120, sortable: true },
    { field: "average_auto_points", headerName: "Avg Auto Pts", width: 120, sortable: true },
    { field: "average_teleop_hub_points", headerName: "Avg Teleop Hub Pts", width: 160, sortable: true },
    { field: "average_climb_points", headerName: "Avg Climb Pts", width: 120, sortable: true },
    { field: "yellow_cards", headerName: "Yellow Cards", width: 120, sortable: true },
    { field: "red_cards", headerName: "Red Cards", width: 100, sortable: true },
    { field: "fouls", headerName: "Fouls", width: 70, sortable: true },
    { field: "fouls_tech", headerName: "Tech Fouls", width: 100, sortable: true },
    { field: "num_disables", headerName: "Disables", width: 100, sortable: true },
    { field: "num_flips", headerName: "Flips", width: 80, sortable: true },
    { field: "matches_played", headerName: "Matches", width: 100, sortable: true },
    { field: "", headerName: "", width: 150, sortable: true },
  ]);

  const [selectedTeams, setSelectedTeams] = useState([]);

  const gridRef = useRef();

  const onSelectionChanged = useCallback(() => {
    let selectedRows = gridRef.current.api.getSelectedRows();
    // var selectedRowsString = "";
    // var maxToShow = 5;
    let selectedTeams = [];
    selectedRows.forEach(function (selectedRow, index) {
      selectedTeams.push(selectedRow.id);
    });
    // if (selectedRows.length > maxToShow) {
    //   var othersCount = selectedRows.length - maxToShow;
    //   selectedRowsString += " and " + othersCount + " other" + (othersCount !== 1 ? "s" : "");
    // }
    // document.querySelector("#selectedRows").innerHTML = selectedRowsString;
    setSelectedTeams(selectedTeams);
  }, [selectedTeams]);

  // const { processedDataBucket, setProcessedDataBucket } = pdbCtx;
  // console.log(pdbCtx);

  //format data for the data grid
  // });

  return (
    <div>
      {/* <Pie data={makePieChartData(pdb, 4388)} /> */}
      <Box
        sx={{
          height: "400px",
          m: 2,
        }}
      >
        {/* <h2>{JSON.stringify(selectedTeams)}</h2> */}
        <div className="ag-theme-alpine-dark" style={{ height: 400, width: "100%" }}>
          <AgGridReact ref={gridRef} rowData={rowData} columnDefs={columnDefs} rowSelection={"multiple"} rowMultiSelectWithClick={true} onSelectionChanged={onSelectionChanged}></AgGridReact>
        </div>
      </Box>
      <AnalyticsPanel selectedTeams={selectedTeams} />
    </div>
  );
  //}}
  // </ProcessedDataBucketContext.Consumer>
};

export default DashboardPage;
