import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { Typography } from "@mui/material";
import StudentService from "../services/crud.js";

const styles = {
  drawerWidth: 240,
  ml: 15,
  backgroundColor: "#124346",
  hoverColor: "#dce2e1",
};

export default function DeleteButton(props) {
  const [childState, setChildState] = useState("");

  const handleClosePopover = () => {
    //console.log("handleClosePopover");
    props.setParentState(childState);
    props.refreshPage();
    props.closePopover();
  };

  const handleDelete = () => {
    //console.log(`Row id from child: ${props.rowId}`);
    StudentService.deleteById(props.rowId)
      .then((response) => {
        //console.log(response.data);
        handleClosePopover();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Button
      sx={{
        "&.MuiButton-outlined": {
          color: "#124346",
          borderColor: "#124346",
          borderRadius: 3,
          "&: hover": {
            backgroundColor: "#124346",
            boxShadow: 2,
            color: "#dce2e1",

            textDecoration: "none",
          },
        },
      }}
      variant="outlined"
      color="error"
      startIcon={<DeleteIcon />}
      onClick={() => {
        handleDelete();
      }}
    >
      <Typography textTransform="none">Delete</Typography>
    </Button>
  );
}
