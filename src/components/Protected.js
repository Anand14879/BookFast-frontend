import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

function Protected(props) {
  const Cmp = props.cmp;
  useEffect(() => {
    if (!localStorage.getItem("user-info")) {
      navigate("/register", { replace: true });
    }
  });
  const navigate = useNavigate();
  return (
    <>
      <div>
        <Cmp />
      </div>
    </>
  );
}
export default Protected;
