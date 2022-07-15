/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import React from "react";
import { Link } from "react-router-dom";
import { Anchor as StyledAnchor } from "grommet";
import { makeURLQuery } from "../../../helpers";

function Anchor(props) {
  const openInNewTab = props.openInNewTab;
  let target;
  let rel;
  if (openInNewTab) {
    target = "_blank";
    rel = "noopener noreferrer";
  }
  return (
    <Link
      to={`${props.href}${makeURLQuery(props.additionalQuery)}`}
      onClick={(event) => event.stopPropagation()}
      style={{ textDecoration: "none" }}
      target={target}
      rel={rel}
    >
      <StyledAnchor label={props.label} as="span">
        {props.children}
      </StyledAnchor>
    </Link>
  );
}

export default Anchor;
