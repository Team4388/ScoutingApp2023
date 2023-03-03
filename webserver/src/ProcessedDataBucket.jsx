const processSchedule = (doc) => {};

const createDefaultTeamData = (team_number, teamData) => {
  //if there's no processed data on a team yet, create a default data entry
  if (typeof teamData[team_number] === "undefined") {
    teamData[team_number] = {
      team_number: team_number,
      matches_played: 0,
      notes: [],
      data_sets: {
        cones_scored_auto: [],
        cubes_scored_auto: [],
        tier_1_scores_auto: [],
        tier_2_scores_auto: [],
        tier_3_scores_auto: [],
        balanced_level_auto: [],
        balance_points_auto: [],
        auto_points: [],

        teleop_points: [],
        cones_scored_teleop: [],
        cubes_scored_teleop: [],
        tier_1_scores_teleop: [],
        tier_2_scores_teleop: [],
        tier_3_scores_teleop: [],
        balanced_level_teleop: [],
        balance_points_teleop: [],
        links: [],
        total_match_points: [],
      },
      balace_counts_auto: [0, 0, 0],
      average_cones_scored_auto: 0,
      average_cubes_scored_auto: 0,
      average_tier_1_scores_auto: 0,
      average_tier_2_scores_auto: 0,
      average_tier_3_scores_auto: 0,
      average_balanced_level_auto: 0,
      average_balance_points_auto: 0,
      average_auto_points: 0,
      
      balace_counts_teleop: [0, 0, 0],
      average_cones_scored_teleop: 0,
      average_cubes_scored_teleop: 0,
      average_tier_1_scores_teleop: 0,
      average_tier_2_scores_teleop: 0,
      average_tier_3_scores_teleop: 0,
      average_balanced_level_teleop: 0,
      average_balance_points_teleop: 0,
      average_teleop_points: 0,
      average_num_links: 0,
      average_total_match_points: 0,
      num_disables: 0,
      num_flips: 0,
      fouls: 0,
      fouls_tech: 0,
      red_cards: 0,
      yellow_cards: 0,
    };
  }
};

const processMatch = (doc, thisTeamData) => {
  console.log("MATCH: " + doc._id);
  //add this game's data to the respective team data:
  thisTeamData.matches_played++;

  let auto_points = (parseInt(doc.taxi_auto) ? 3 : 0) + parseInt(doc.tier_1_scores_auto) * 3 + parseInt(doc.tier_2_scores_auto) * 4 + parseInt(doc.tier_3_scores_auto) * 6 + (parseInt(doc.balanced_level_auto) == 1 ? 8 : 0) + (parseInt(doc.balanced_level_auto) == 2 ? 12 : 0);
  let teleop_points = + parseInt(doc.tier_1_scores_teleop) * 2 + parseInt(doc.tier_2_scores_teleop) * 3 + parseInt(doc.tier_3_scores_teleop) * 5 + (parseInt(doc.balanced_level_teleop) == 1 ? 6 : 0) + (parseInt(doc.balanced_level_teleop) == 2 ? 10 : 0) + doc.links * 5;
  let balance_points_auto = (parseInt(doc.balanced_level_auto) == 1 ? 8 : 0) + (parseInt(doc.balanced_level_auto) == 2 ? 12 : 0);
  let balance_points_teleop = (parseInt(doc.balanced_level_auto) == 1 ? 6 : 0) + (parseInt(doc.balanced_level_auto) == 2 ? 10 : 0);
  let total_match_points = auto_points + teleop_points;// + climb_points;
  //data sets - auto
  thisTeamData.data_sets.cones_scored_auto.push(parseInt(doc.cones_scored_auto));
  thisTeamData.data_sets.cubes_scored_auto.push(parseInt(doc.cubes_scored_auto));
  thisTeamData.data_sets.tier_1_scores_auto.push(parseInt(doc.tier_1_scores_auto));
  thisTeamData.data_sets.tier_2_scores_auto.push(parseInt(doc.tier_2_scores_auto));
  thisTeamData.data_sets.tier_3_scores_auto.push(parseInt(doc.tier_3_scores_auto));
  thisTeamData.data_sets.balanced_level_auto.push(parseInt(doc.balanced_level_auto));
  thisTeamData.data_sets.balance_points_auto.push(balance_points_auto)
  thisTeamData.data_sets.auto_points.push(parseInt(auto_points));

  //data sets - teleop
  thisTeamData.data_sets.teleop_points.push(parseInt(teleop_points));
  thisTeamData.data_sets.cones_scored_teleop.push(parseInt(doc.cones_scored_teleop));
  thisTeamData.data_sets.cubes_scored_teleop.push(parseInt(doc.cubes_scored_teleop));
  thisTeamData.data_sets.tier_1_scores_teleop.push(parseInt(doc.tier_1_scores_teleop));
  thisTeamData.data_sets.tier_2_scores_teleop.push(parseInt(doc.tier_2_scores_teleop));
  thisTeamData.data_sets.tier_3_scores_teleop.push(parseInt(doc.tier_3_scores_teleop));
  thisTeamData.data_sets.balanced_level_teleop.push(parseInt(doc.balanced_level_teleop));
  thisTeamData.data_sets.balance_points_auto.push(balance_points_teleop)
  thisTeamData.data_sets.links.push(parseInt(doc.links))
  thisTeamData.data_sets.total_match_points.push(total_match_points)

  //climb data
  thisTeamData.balace_counts_auto[parseInt(doc.balanced_level_auto)]++;
  thisTeamData.balace_counts_auto[parseInt(doc.balanced_level_teleop)]++;

  //misc data
  thisTeamData.num_disables += doc.disabled ? 1 : 0;
  thisTeamData.num_flips += doc.flipped ? 1 : 0;
  thisTeamData.fouls += parseInt(doc.fouls);
  thisTeamData.fouls_tech += parseInt(doc.fouls_tech);
  thisTeamData.red_cards += parseInt(doc.red_cards);
  thisTeamData.yellow_cards += parseInt(doc.yellow_cards);

  //sum of all points in the match points data set for this team
  //function for getting the sum of an array, use in reduce function of array
  const sum = (accum, current) => accum + current;
  thisTeamData.average_auto_points = thisTeamData.data_sets.auto_points.reduce(sum, 0) / thisTeamData.matches_played;
  thisTeamData.average_teleop_points = thisTeamData.data_sets.teleop_points.reduce(sum, 0) / thisTeamData.matches_played;
  thisTeamData.average_balance_points_auto = thisTeamData.data_sets.balance_points_auto.reduce(sum, 0) / thisTeamData.matches_played;
  thisTeamData.average_balance_points_teleop = thisTeamData.data_sets.balance_points_teleop.reduce(sum, 0) / thisTeamData.matches_played;
  thisTeamData.average_total_match_points = thisTeamData.data_sets.total_match_points.reduce(sum, 0) / thisTeamData.matches_played;
};

export function updateProcessedDataBucket(db, setProcessedDataBucket) {
  console.log("updating pdb");
  return db
    .all()
    .then((result) => {
      // console.log("TESTH");
      // console.log(result);
      //reset data
      let teamData = {};
      let matchData = {};

      Object.values(result).forEach((doc) => {
        // console.log(doc);
        if (doc.type === "schedule") {
          return;
        }

        let first_two_letters = doc.$id.substring(0,2);
        let is_a_match = first_two_letters === "qm"
        || first_two_letters === "qf"
        || first_two_letters === "sf"
        || first_two_letters === "fi"
        console.log(first_two_letters + is_a_match);

        // if (doc.type === "match") {
       if(is_a_match){ 
        // if (doc.$id.substring(0,2)) {
          let team_num = doc.$id.split("_")[1];
          console.log(doc);
          createDefaultTeamData(team_num, teamData);
          let thisTeamData = teamData[team_num];
          processMatch(doc, thisTeamData);
        }
        // if (doc.type === "notes") {
        //   createDefaultTeamData(doc, teamData);
        //   thisTeamData.notes.push(doc.notes);
        // }
      });
      setProcessedDataBucket({ teamData: teamData, matchData: matchData });
    })
    .catch((err) => {
      console.log("Error while processing data!");
      console.error(err);
    });
}
