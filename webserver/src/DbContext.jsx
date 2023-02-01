import PouchDB from "pouchdb";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { useProcessedDataBucket } from "./ProcessedDataBucketContext";
import { getProcessedDataBucket, updateProcessedDataBucket } from "./ProcessedDataBucket";

PouchDB.plugin(require("delta-pouch"));

const LocalDbContext = React.createContext();
const RemoteDbContext = React.createContext();

export function useLocalDb() {
  return useContext(LocalDbContext);
}

export function useRemoteDb() {
  return useContext(RemoteDbContext);
}

export function DbProvider({ children }) {
  // const pdbCtx = useProcessedDataBucket();
  // const { setProcessedDataBucket } = useProcessedDataBucket();
  // console.log(pdb);
  // const [localdb, setLocaldb] = useState(null);
  // const [remotedb, setRemotedb] = useState(null);
  // useEffect(() => {
  //   // setDatabaseName("denver_fr", setLocaldb, setRemotedb, setProcessedDataBucket);
  // });

  const [localdb, setLocaldb] = useState(new PouchDB("utah_fr"));
  const [remotedb, setRemotedb] = useState(
    new PouchDB("http://" + window.location.hostname + ":5984/utah_fr", {
      // skip_setup: true,
      auth: {
        username: "scouting",
        password: "Ridgebotics",
      },
    })
  );
  localdb.deltaInit();
  localdb
    // .setMaxListeners(400)
    .sync(remotedb, {
      // localdb
      //   .sync(remotedb, {
      live: true,
      retry: true,
    });
  // const [syncHandle, setSyncHandle] = useState(
  //   null
  //   // localdb
  //   //   // .setMaxListeners(400)
  //   //   .sync(remotedb, {
  //   //     // localdb
  //   //     //   .sync(remotedb, {
  //   //     live: true,
  //   //     retry: true,
  //   //   })
  //   // .on("complete", (info) => {
  //   //   console.log("REPLICATION CANCELLED");
  //   //   console.log(info);
  //   // })
  // );
  // if (syncHandle != null && typeof syncHandle.cancel !== "undefined") syncHandle.cancel();

  // localdb.on("change", (change) => {
  //   console.log("CHANGE");
  //   updateProcessedDataBucket(localdb, setProcessedDataBucket);
  // });

  // .catch(console.log);
  localdb.on("update", console.log);

  useEffect(() => {
    // handle.cancel();
    console.log("SYNCSYNCSYNCSYNCSYNC");
    // updateProcessedDataBucket(localdb, setProcessedDataBucket);
    // localdb
    //   // .setMaxListeners(400)
    //   .sync(remotedb, {
    //     // localdb
    //     //   .sync(remotedb, {
    //     live: true,
    //     retry: true,
    //   });
    // .on("complete", (info) => {
    //   console.log("REPLICATION CANCELLED");
    //   console.log(info);
    // })
  }, [localdb, remotedb]);

  // localdb.replicate.to(remotedb, {
  //   retry: true,
  // });
  // updateProcessedDataBucket(localdb, setProcessedDataBucket);

  // const [localNotesdb, setLocalNotesdb] = useState(new PouchDB("denver_notes"));
  // const [remoteNotesdb, setRemoteNotesdb] = useState(
  //   new PouchDB("http://" + window.location.hostname + ":5984/denver_notes", {
  //     skip_setup: true,
  //     auth: {
  //       username: "scouting",
  //       password: "Ridgebotics",
  //     },
  //   })
  // );
  // localNotesdb.replicate
  //   .from(remoteNotesdb, {
  //     live: true,
  //     retry: true,
  //   })
  //   .on("change", (change) => {
  //     // updateProcessedDataBucket(localdb, setProcessedDataBucket);
  //   });

  // updateProcessedDataBucket(localdb, setProcessedDataBucket);
  // useEffect(() => {
  //   setDatabaseName("denver_fr", setLocaldb, setRemotedb, setProcessedDataBucket);
  // });

  // useEffect(() => {
  //   updateProcessedDataBucket(localdb, setProcessedDataBucket);
  //   localdb
  //     .sync(remotedb, {
  //       live: true,
  //       retry: true,
  //     })
  //     .on("change", function (change) {
  //       console.log("DB CHANGED");
  //       updateProcessedDataBucket(localdb, setProcessedDataBucket);
  //     })
  //     .on("paused", function (info) {
  //       console.log("sync paused");
  //       // console.log(info);
  //     })
  //     .on("active", function (info) {
  //       console.log("sync active");
  //       // console.log(info);
  //     })
  //     .on("denied", function (info) {
  //       console.log("sync denied");
  //       // console.log(info);
  //     })
  //     .on("complete", function (info) {
  //       console.log("sync complete");
  //       // console.log(info);
  //     })
  //     .on("error", function (err) {
  //       console.error(err);
  //     });
  // }, [localdb, setProcessedDataBucket]);

  return (
    <LocalDbContext.Provider value={{ localdb, setLocaldb }}>
      <RemoteDbContext.Provider value={{ remotedb, setRemotedb }}>{children}</RemoteDbContext.Provider>
    </LocalDbContext.Provider>
  );
}

export function setDatabaseName(name, setLocaldb, setRemotedb, setProcessedDataBucket) {
  let localdb = new PouchDB(name);
  let remotedb = new PouchDB("http://" + window.location.hostname + ":5984/" + name, {
    skip_setup: true,
    auth: {
      username: "scouting",
      password: "Ridgebotics",
    },
  });
  localdb.sync(remotedb, {
    live: true,
    retry: true,
  });
  // .on("change", (change) => {
  //   updateProcessedDataBucket(localdb, setProcessedDataBucket);
  // });
  // updateProcessedDataBucket(localdb, setProcessedDataBucket);
  // localdb.replicate.to(remotedb, {
  //   live: true,
  //   retry: true,
  // });
  setLocaldb(localdb);
  setRemotedb(remotedb);
}
