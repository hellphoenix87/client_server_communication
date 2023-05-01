import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { Modal } from "@mui/material";

import StudentService from "../services/crud.js";

export default function BasicTextFields(props) {
  const [childState, setChildState] = useState("");

  const handleCloseModal = () => {
    //props.setParentState(childState);
    props.setParentState(childState);
    props.refreshPage();
    props.closeModal();
    props.closePopover();
  };

  const [data, setData] = useState({});
  const [response, setRespone] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (props.showEditModal && props.rowId) {
      StudentService.getOne(props.rowId)
        .then((response) => {
          console.log(`this is response: ${response.data.email}`);
          setData(response.data);
        })
        .catch((e) => {
          console.log(`this is error in http request: ${e}`);
        });
    }
  }, [props.showEditModal, props.rowId]);

  const handleSave = () => {
    StudentService.update(props.rowId, data)
      .then((response) => {
        setRespone(response.data);
        console.log(`this is response: ${response.data.email}`);
        //props.setParentState({ isUpdated: true });
        //props.refreshPage();
        //props.closeModal();
        handleCloseModal();
      })
      .catch((e) => {
        console.log(`this is error in http request: ${e}`);
      });
  };

  /*const handleCloseModal = () => {
    props.setParentState(childState);
    props.refreshPage();
    props.closeModal();
  };*/

  return (
    <Modal
      open={props.showEditModal}
      //onClose={setModalToClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        backgroundColor: "rgba(0,0,0,0.5)",

        margin: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Box
        sx={{
          borderRadius: "15px",
          bgcolor: "white",
          // "& > :not(style)": { m: 1 },
          //display: "flex",
          width: "50%",
          flexDirection: "column",
        }}
        noValidate
        autoComplete="off"
      >
        <Typography
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            paddingTop: "10px",
            paddingBottom: "10px",
            backgroundColor: "#124346",
            color: "#dce2e1",
            borderRadius: "15px 15px 0px 0px",
          }}
          variant="h6"
        >
          Edit Lead
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          divider={<Divider orientation="vertical" />}
          sx={{
            paddingTop: "20px",
            marginLeft: "10px",
            marginRight: "10px",
          }}
        >
          <TextField
            id="outlined-controlled"
            label="Index Number"
            value={data.index_no || ""}
            onChange={(event) => {
              setData({ ...data, index_no: event.target.value });
            }}
            sx={{
              flex: 2,
            }}
          />
          <TextField
            id="outlined-controlled"
            label="Full Name"
            value={data.name || ""}
            onChange={(event) => {
              setData({ ...data, name: event.target.value });
            }}
            sx={{
              flex: 2,
            }}
          />
        </Stack>
        <br />
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" />}
          sx={{
            marginLeft: "10px",
            marginRight: "10px",
          }}
        >
          <TextField
            id="outlined-controlled"
            label="Grade"
            value={data.grade || ""}
            onChange={(event) => {
              setData({ ...data, grade: event.target.value });
            }}
            sx={{
              flex: 1,
            }}
          />
        </Stack>
        <br />

        <Stack
          direction="row"
          spacing={1}
          divider={<Divider orientation="vertical" />}
          sx={{
            margin: "10px",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="outlined"
            onClick={() => {
              handleSave();

            }}
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
          >
            Save
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              handleCloseModal();
            }}
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
          >
            Cancel
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
