import { Heading, Text, Box } from "grommet";
import axios from "axios";
import Page from "../../templates/page";
import { useState, useEffect } from "react";
import api from "../../../api";

function Richlist() {
  const [richlistState, setRichlistState] = useState();

  useEffect(() => {
    axios.get(`${api}/richlist`).then((res) => {
      setRichlistState(res.data);
    });
  }, []);

  return (
    <Page>
      <Box width={"100%"}>
        <Heading margin="none" level={3} size="small" alignSelf="center">
          Richlist
        </Heading>

        <Box pad="small" direction="row" flex="row" background="#093D60">
          <Box width={"small"}>
            <Text>Rank</Text>
          </Box>
          <Box width={"large"}>
            <Text>Address</Text>
          </Box>
          <Box width={"medium"}>
            <Text>Balance</Text>
          </Box>
        </Box>

        {richlistState &&
          richlistState.map((item, index) => (
            <Box
              key={item[0] + index + "Key"}
              border={[
                {
                  side: "bottom",
                },
              ]}
              background={"#112740"}
              pad={{ bottom: "xsmall", top: "xsmall" }}
              direction="row"
            >
              <Box pad={{ left: "medium" }} width="small">
                {index + 1}
              </Box>

              <Box width={"large"}>
                <Text color={"#CCC"} margin={{ right: "small" }} truncate>
                  {item[0]}
                </Text>
              </Box>

              <Box Box width={"medium"}>
                <Text margin={{ right: "small" }} color={"#CCC"} truncate>
                  {item[1].balance}
                </Text>
              </Box>
            </Box>
          ))}
      </Box>
    </Page>
  );
}

export default Richlist;
