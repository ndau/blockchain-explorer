import axios from "axios";
import { Text, Box } from "grommet";
import { useParams } from "react-router-dom";

import Page from "../../../templates/page";
import React from 'react';



function VerifyUser() {
  const { token :verificationtoken} = useParams();

  const [active, setActive] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(false);
   axios.put('http://localhost:3001/api/user/verify',{verificationtoken}).then(() => {
      setActive(true);
      setLoading(false);
    
    }).catch(()=>{
      setLoading(false);
    });
  }, []);


  return (
    <>
      {loading? <Page>
        <Box width={"medium"} alignSelf="center">
          <Text>Loading...</Text>
        </Box>
      </Page>:!active ? (
        <Page>
        <Box width={"medium"} alignSelf="center">
          <Text>Token has been Expired</Text>
        </Box>
      </Page>
      ) : (
        <Page>
          <Box width={"medium"} alignSelf="center">
            <Text>Your Email has been Verified</Text>
          </Box>
        </Page>
      )}
    </>
  );
}

export default VerifyUser;
