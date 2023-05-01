import axios from "axios";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import {
  Container,
  Toolbar,
  Paper,
  Button,
  Stack,
  MenuItem,
} from "@mui/material";
import Popover from "@mui/material/Popover";
import TextField from "@mui/material/TextField";

import EditButton from "./components/buttons/EditButton.jsx";
//import Edit from "../components/Edit";
import Delete from "./components/Delete";
import { flexbox } from "@mui/system";
import { useState, useEffect } from "react";
//import AddEdit from "../components/addEdit";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import WidgetsIcon from "@mui/icons-material/Widgets";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Slide from "@mui/material/Slide";
//import leadData from "../service/data/leadData";
import Add from "./components/Add";
import StudentService from "./services/crud.js";
import SearchToolbar from "./components/SearchToolbar";

export default function DataGridDemo() {
  //const [leads, setLeads] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  const [data, setData] = useState([]);
  const [filterId, setFilterId] = useState("");
  const [filterName, setFilterName] = useState("");

  const loadDataTable = async () => {
    setData([]);
    let newData = await StudentService.getAll()
      .then((response) => {
        console.log(`length before refresh: ${response.data.length}`);
        return response;
      })
      .finally(() => {
        console.log(`length after refresh: ${data.length}`);
      });

    setData(newData.data);
    console.log(`length after refresh: ${data.length}`);
  };

  useEffect(() => {
    loadDataTable();
  }, []);

  // add modal //
  const [showModal, setShowModal] = useState(false);
  const [parentState, setParentState] = useState("");

  // popover menu for edit/delete //
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closePopover = () => {
    setAnchorEl(null);
  };

  const menuOpen = Boolean(anchorEl);
  const id = menuOpen ? "popover" : undefined;

  // get row ID for edit/delete //
  const [rowId, setRowId] = useState(null);
  const getRowId = (row) => {
    setRowId(row.id);
  };

  // edit modal //
  const [showEditModal, setShowEditModal] = useState(false);
  const [editParentState, setEditParentState] = useState("");

  const [pageSize, setPageSize] = React.useState(5);

  // filter by ID handler//
  const handleFilterChange = (event) => {
    setFilterId(event.target.value);
  };

  // filter by Name handler//
  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value);
  };

  const columns = [

    {
      field: "index_no",
      headerName: "Index Number",
      width: 150,
      editable: false,
      flex: 2,
    },
    {
      field: "name",
      headerName: "Full Name",
      width: 150,
      editable: false,
      flex: 2,
    },
    
    {
      field: "grade",
      headerName: "Grades",
      width: 150,
      editable: false,
      flex: 2,
    },

    {
      field: "menu",
      headerName: "",
      disableColumnMenu: true,
      sortable: false,
      width: 160,
      align: "right",
      renderCell: ({ row }) => (
        <IconButton
          aria-describedby={id}
          //size="large"
          onClick={(event) => {
            //event.stopPropagation();
            handleClick(event);
          }}

          //aria-controls="simple-menu"
        >
          {<MenuOutlinedIcon />}
        </IconButton>
      ),
      flex: 2,
    },
  ];
  return (
    <Container>

      <Box
        component={Box}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "95vw",

          justifyContent: "center",
        }}
      >
        <Button
          onClick={() => setShowModal(true)}
          //
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
        >
          Add New Student
        </Button>
        <Add
          showModal={showModal}
          setParentState={setParentState}
          refreshPage={loadDataTable}
          //refreshPage={handleRefresh}
          //refreshPage={fetchData}
          closeModal={() => setShowModal(false)}
        />

        <br />
        <SearchToolbar
          onFilterChange={handleFilterChange}
          onFilterNameChange={handleFilterNameChange}
        />

        <br />
        <div style={{ height: 400 }}>
          <DataGrid
            /*onRowClick={(e) => {
            console.log(e.row.id, e.row.firstName);
          }}*/
            onRowClick={getRowId}
            //disableExtendRowFullWidth={true}
            sx={{
              ".MuiDataGrid-columnSeparator": {
                display: "none",
              },
              "&.MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-row: click": {
                backgroundColor: "black",
              },
            }}
            pageSize={pageSize}
            //disableExtendRowFullWidth={false}
            //autoWidth={false}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            //checkboxSelection
            rows={data.filter(
              (row) =>
                row.index_no.toString().includes(filterId) &&
                row.name.toString().includes(filterName)
            )}
            columns={columns}
            disableSelectionOnClick={true}
          />
          <>
            <Popover
              id={id}
              open={menuOpen}
              //open={handleClick}
              //anchorEl={menuOpen}
              anchorEl={anchorEl}
              onClose={closePopover}
              anchororigin={{ vertical: "top", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              PaperProps={{
                sx: {
                  paddingBottom: 0.5,
                  paddingRight: 1,
                  width: 180,
                  //backgroundColor: "#124346",
                  boxShadow: "none",
                  "& .MuiMenuItem-root": {
                    //px: ,
                    typography: "body2",
                    borderRadius: 0.75,
                  },
                },
              }}
            >
              <Slide direction="left" in={menuOpen} mountOnEnter unmountOnExit>
                <Stack spacing={2} direction="row">
                  <EditButton
                    rowId={rowId}
                    setParentState={setParentState}
                    refreshPage={loadDataTable}
                    closeModal={() => setShowModal(false)}
                    closePopover={() => setAnchorEl(null)}
                  />
                  <Delete
                    rowId={rowId}
                    setParentState={setParentState}
                    refreshPage={loadDataTable}
                    closePopover={() => setAnchorEl(null)}
                  />
                </Stack>
              </Slide>
            </Popover>
          </>
        </div>
      </Box>
    </Container>
  );
}
