import axios from "axios";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "grommet";
import React, { useEffect, useState } from "react";
import Page from "../../templates/page";
import nodeArray from "./ndaunode.json";

const Ndaunodes = () => {

const [nodesArrayState, setNodesArrayState] = useState([]);

useEffect(() => {
 async function asyncGetNodesArrayState(){
  let nodesArr = await axios.get("https://utils.ndau.tech/crawl");
  setNodesArrayState(nodesArr);
 }
 asyncGetNodesArrayState();
}, [])


  return (
    <Page>
      <div>
        <Table border={"all"} style={{ fontSize: "16px" }}>
          <TableHeader
            style={{
              background:
                "transparent linear-gradient(180deg, #093D60 0%, #132A47 100%) 0% 0% no-repeat padding-box",
              boxShadow: "0px 3px 6px #00000029",
              borderRadius: "10px 10px 0px 0px",
              fontWeight: "bold",
              opacity: "1",
            }}
          >
            <TableRow > 
              <TableCell scope="col" border="bottom" style={{textAlign:"center"}}>
                Moniker
              </TableCell>
              <TableCell scope="col" border="bottom" style={{textAlign:"center"}}>
                Tendermint Address
              </TableCell>
              <TableCell scope="col" border="bottom">
               ndau Address
              </TableCell>
              <TableCell scope="col" border="bottom">
                Voting Power
              </TableCell>
              <TableCell scope="col" border="bottom" style={{textAlign:"center"}}>
                Latest Block Height
              </TableCell>
              <TableCell scope="col" border="bottom" style={{textAlign:"center"}}>
                Registration Date
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {nodesArrayState.map((val) => (
              <>
                <TableRow
                  style={{
                    color: "#F89D1C",
                    borderBottom: "1px solid #234065",
                    backgroundColor: "#132A47",
                  }}
                >
                  <TableCell scope="row">
                    <TableCell>{val.moniker}</TableCell>
                  </TableCell>
                  <TableCell>{val.tmAddress}</TableCell>
                  <TableCell>{val.ndauAddress}</TableCell>
                  <TableCell>{val.votingPower}</TableCell>
                  <TableCell>{val.latest_block_height}</TableCell>
                  <TableCell>{val.registrationDate}</TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </div>
    </Page>
  );
};

export default Ndaunodes;
