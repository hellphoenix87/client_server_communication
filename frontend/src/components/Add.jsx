import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { Modal } from "@mui/material";

import StudentService from "../services/crud.js";

export default function BasicTextFields(props) {
  //console.log(props)
  const [childState, setChildState] = useState("");

  const handleCloseModal = () => {
    props.setParentState(childState);
    props.refreshPage();
    props.closeModal();
  };

  const initialLeadState = useState({
    id: null,
    index_no: "",
    name: "",
    grade: "",
  });

  const [lead, setLead] = useState(initialLeadState);
  const [submitted, setSubmitted] = useState(false);

  const saveLead = () => {
    var data = {
      index_no: lead.index_no,
      name: lead.name,
      grade: lead.grade,
    };

    StudentService.create(data)
      .then((response) => {
        setLead({
          id: response.data.id,
          index_no: response.data.index_no,
          name: response.data.name,
          grade: response.data.grade,
        });

        setSubmitted(true);
        console.log(`these are responses: ${response.data}`);
        handleCloseModal();
      })
      .catch((e) => {
        console.log(`this is error in http request: ${e}`);
      });
  };

  const newLead = () => {
    setSubmitted(false);
  };

  useEffect(() => {
    if (!props.showModal) {
      setLead(initialLeadState);
    }
  }, [props.showModal]);

  return (
    <Modal
      open={props.showModal}
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
          Add New Student
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
            value={lead.index_no || ""}
            onChange={(event) => {
              setLead({ ...lead, index_no: event.target.value });
            }}
            sx={{
              flex: 2,
            }}
          />
          <TextField
            id="outlined-controlled"
            label="Name"
            value={lead.name || ""}
            onChange={(event) => {
              setLead({ ...lead, name: event.target.value });
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
            label="Grades"
            value={lead.grade || ""}
            onChange={(event) => {
              setLead({ ...lead, grade: event.target.value });
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
              saveLead();
              newLead();
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
