import React from "react";
import {Link} from "react-router-dom";

function Logout(props) {
  return (
      <div>
        <Link to="/login/">{props.text}</Link>
      </div>
  );
}
export default Logout;