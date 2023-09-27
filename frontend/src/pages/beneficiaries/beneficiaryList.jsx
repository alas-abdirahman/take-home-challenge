import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  FormControlLabel,
  Checkbox,
  IconButton,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getBeneficiaries } from "../../redux/slices/beneficiarySlice";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { makeStyles } from "@mui/styles";
import { Add } from "@mui/icons-material";
import { Backdrop, Fade, Modal } from "@mui/material";
import BeneficiaryForm from "./beneficiaryForm";
import { deleteBeneficiary } from "../../redux/thunk/beneficiaryThunk";
import { toast } from "react-toastify";

const useStyles = makeStyles({
  tableContainer: {
    margin: "10px auto",
  },
  table: {
    border: "1px solid #ccc",
  },
});
const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const BeneficiaryTable = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { beneficiaries } = useSelector((state) => state.beneficiary);
  const [searchTerm, setSearchTerm] = useState("");
  const [targetGroups, setTargetGroups] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [update, setUpdate] = useState(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTargetGroupChange = (event) => {
    const selectedTargetGroup = event.target.name;
    setTargetGroups((prevTargetGroups) => {
      if (prevTargetGroups.includes(selectedTargetGroup)) {
        return prevTargetGroups.filter(
          (group) => group !== selectedTargetGroup
        );
      } else {
        return [...prevTargetGroups, selectedTargetGroup];
      }
    });
  };

  const filteredBeneficiaries = beneficiaries.filter((beneficiary) => {
    // Filter based on search term and selected target groups
    const fullNameMatches = beneficiary?.fullName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const targetGroupMatches =
      targetGroups.length === 0 ||
      targetGroups.includes(beneficiary?.targetGroup);
    return fullNameMatches && targetGroupMatches;
  });

  const handleBeneficiaryDelete = async (beneficiary) => {
    const req = {
      id: beneficiary?.id,
    };
    if (window.confirm("Are you sure to delete")) {
      const res = await dispatch(deleteBeneficiary(req));
      if (res.type === "beneficiary/deleteBeneficiary/fulfilled") {
        toast.success("Beneficiary deleted successfully");
        dispatch(getBeneficiaries({}));
      } else if (res.type === "beneficiary/deleteBeneficiary/rejected") {
        toast.error(
          res.payload.error
            ? res.payload.error
            : "Error: Beneficiary Delete Failed."
        );
      }
    }
  };

  useEffect(() => {
    dispatch(getBeneficiaries({}));
  }, [dispatch]);

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <BeneficiaryForm
              update={update}
              beneficiaries={beneficiaries}
              handleClose={handleClose}
            />
          </Box>
        </Fade>
      </Modal>
      <div style={{ marginTop: "5%", width: "90%", margin: "auto" }}>
        <div>
          <Typography variant="h4">Manage Beneficiaries</Typography>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "5%",
          }}
        >
          <TextField
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by name"
            variant="outlined"
            size="small"
            InputProps={{
              endAdornment: <SearchIcon />,
            }}
          />
          <Button variant="outlined" startIcon={<Add />} onClick={handleOpen}>
            New beneficiary
          </Button>
        </div>
        <TableContainer className={classes.tableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Full Name</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>Target Group</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBeneficiaries.length === 0 && (
                <Typography
                  sx={{ color: "GrayText", textAlign: "center", width: "300%" }}
                >
                  No data to show
                </Typography>
              )}
              {filteredBeneficiaries.map((beneficiary) => (
                <TableRow key={beneficiary?.id}>
                  <TableCell>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          overflow: "hidden",
                          marginRight: "10px",
                        }}
                      >
                        <img
                          src={beneficiary?.avatar}
                          alt="Avatar"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <span>{beneficiary?.fullName}</span>
                    </div>
                  </TableCell>
                  <TableCell>{beneficiary?.mobile}</TableCell>
                  <TableCell>{beneficiary?.targetGroup}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="Edit"
                      onClick={() => {
                        setUpdate(beneficiary);
                        handleOpen();
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="Delete"
                      onClick={() => {
                        handleBeneficiaryDelete(beneficiary);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow align="center">
                <TableCell colSpan={5}>
                  <FormControlLabel
                    sx={{ cursor: "default" }}
                    control={<Typography>Filter by group: </Typography>}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={targetGroups.includes("Household")}
                        onChange={handleTargetGroupChange}
                        name="Household"
                      />
                    }
                    label="Household"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={targetGroups.includes("Teacher")}
                        onChange={handleTargetGroupChange}
                        name="Teacher"
                      />
                    }
                    label="Teacher"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={targetGroups.includes("Principle")}
                        onChange={handleTargetGroupChange}
                        name="Principle"
                      />
                    }
                    label="Principle"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={targetGroups.includes("FHW")}
                        onChange={handleTargetGroupChange}
                        name="FHW"
                      />
                    }
                    label="FHW"
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default BeneficiaryTable;
