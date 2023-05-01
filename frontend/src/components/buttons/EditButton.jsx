import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Typography } from "@mui/material";
import Edit from "../Edit";
import { useState } from "react";

const styles = {
  drawerWidth: 240,
  ml: 15,
  backgroundColor: "#124346",
  hoverColor: "#dce2e1",
};

export default function EditButton(props) {
  const [rowId, setRowId] = useState(null);
  const getRowId = () => {
    setRowId(props.rowId);
  };

  //console.log(`this is row id: ${props.rowId}`);
  // edit modal //
  const [showEditModal, setShowEditModal] = useState(false);
  const [editParentState, setEditParentState] = useState("");

  /*const handleCloseModal = () => {
    props.setParentState(childState);
    props.refreshPage();
    props.closeModal();
  };*/
  return (
    <>
      <Button
        variant="outlined"
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
        onClick={() => {
          getRowId();
          setShowEditModal(true);
          console.log("click");
          console.log(rowId);
        }}
      >
        {" "}
        <Typography textTransform="none">Edit</Typography>
      </Button>
      <Edit
        showEditModal={showEditModal}
        rowId={rowId}
        setParentState={props.setParentState}
        refreshPage={props.refreshPage}
        closeModal={() => setShowEditModal(false)}
        closePopover={props.closePopover}
      />
    </>
  );
}
