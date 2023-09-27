import React, { useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import { makeStyles } from "@mui/styles";
import * as Yup from "yup";
import {
  Box,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { LoadingButton } from "@mui/lab";
import {
  createBeneficiary,
  updateBeneficiary,
} from "../../redux/thunk/beneficiaryThunk";
import { getBeneficiaries } from "../../redux/slices/beneficiarySlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

let easing = [0.6, -0.05, 0.01, 0.99];

const animate = {
  opacity: 1,
  y: 0,
  transition: {
    duration: 0.6,
    ease: easing,
    delay: 0.16,
  },
};

function BeneficiaryForm({ update = null, beneficiaries, handleClose }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (data) => {
    const req = {
      beneficiary: data,
    };
    setLoading(true);
    const res = await dispatch(createBeneficiary(req));
    if (res.type === "beneficiary/create-beneficiary/fulfilled") {
      toast.success("Beneficiary Created SuccessFully");
      dispatch(getBeneficiaries({ page: 0 }));
      handleClose(false);
    } else if (res.type === "beneficiary/create-beneficiary/rejected") {
      toast.error(res.payload.error);
    }
    setLoading(false);
    handleClose();
  };

  const handleUpdateBeneficiary = async (beneficiary) => {
    const req = {
      id: beneficiary.id,
      beneficiary,
    };
    setLoading(true);
    const res = await dispatch(updateBeneficiary(req));
    if (res.type === "beneficiary/update-beneficiary/fulfilled") {
      toast.success("Beneficiary Updated Successfuly");
      dispatch(getBeneficiaries({ page: 0 }));
      handleClose(false);
    } else if (res.type === "beneficiary/update-beneficiary/rejected") {
      toast.error(res.payload.response.data.error);
    }
    setLoading(false);
    handleClose();
  };

  const RegisterSchema = Yup.object().shape({
    fullName: Yup.string().required("Fullname is required"),
    mobile: Yup.string()
      .matches(/^(61|77|62|90)\d{7}$/, "Invalid mobile number")
      .required("(should only accept 9 digit number, starting at 61 or 77 for hormuud, 62 for somtel, 90 for Golis)"),
    targetGroup: Yup.string().required("Target group is required"),
  });

  const formik = useFormik({
    initialValues: {
      id: update ? update?.id : "",
      fullName: update ? update?.fullName : "",
      mobile: update ? update?.mobile : "",
      avatar: update ? update?.avatar : "",
      targetGroup: update ? update?.targetGroup : "",
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      console.log("submitting...");
      !update ? handleRegister(values) : handleUpdateBeneficiary(values);
    },
  });

  const {
    errors,
    touched,
    values,
    isSubmitting,
    setFieldValue,
    handleSubmit,
    getFieldProps,
  } = formik;
  return (
    <div>
      <Typography
        id="transition-modal-title"
        variant="h6"
        component="h2"
        sx={{ mb: "2%" }}
      >
        {!update ? "Create a new beneficiary" : "Update beneficiary"}
      </Typography>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Box
            component={motion.div}
            animate={{
              transition: {
                staggerChildren: 0.55,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
              component={motion.div}
              initial={{ opacity: 0, y: 40 }}
              animate={animate}
            >
              <Grid container spacing={4}>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    fullWidth
                    autoComplete="avatar"
                    type="text"
                    label="Avatar"
                    {...getFieldProps("avatar")}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    fullWidth
                    autoComplete="fullName"
                    type="text"
                    label="Full fullName"
                    {...getFieldProps("fullName")}
                    error={Boolean(touched.fullName && errors.fullName)}
                    helperText={touched.fullName && errors.fullName}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    fullWidth
                    autoComplete="mobile"
                    type="number"
                    label="Phone number"
                    {...getFieldProps("mobile")}
                    error={Boolean(touched.mobile && errors.mobile)}
                    helperText={touched.mobile && errors.mobile}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">+252</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    select
                    fullWidth
                    label="Target Group"
                    {...getFieldProps("targetGroup")}
                    error={Boolean(touched.targetGroup && errors.targetGroup)}
                    helperText={touched.targetGroup && errors.targetGroup}
                  >
                    {["Household", "Teacher", "Principle", "FHW", "FHS"].map(
                      (option, i) => (
                        <MenuItem key={i} value={option}>
                          {option}
                        </MenuItem>
                      )
                    )}
                  </TextField>
                </Grid>
              </Grid>
            </Box>

            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={animate}
              sx={{ mt: 4 }}
            >
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={loading}
                sx={{
                  backgroundColor: "rgb(254, 152, 121)",
                  color: "white",
                }}
              >
                {loading ? "loading..." : "Save"}
              </LoadingButton>
            </Box>
          </Box>
        </Form>
      </FormikProvider>
    </div>
  );
}

export default BeneficiaryForm;
