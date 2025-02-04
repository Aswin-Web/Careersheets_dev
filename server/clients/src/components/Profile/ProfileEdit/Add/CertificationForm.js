import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,

} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { REACT_APP_SERVER_URL } from "../../../../config";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { certificateActions } from "../../../../redux/reducers/certificationInfo";

const CertificationForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.value);

  const [formData, setFormData] = useState({
    existingId: "",
    certificateName: "",
    providedBy: "",
    issuedOn: "",
    startDate: "",
    endDate: "",
    certificateId: "",
    approval: "false",
  });

  const [certificationProviders, setCertificationProviders] = useState([]);
  const [customProvider, setCustomProvider] = useState("");
  const [isCustomProvider, setIsCustomProvider] = useState(false);

  useEffect(() => {
    getCertificationProvider();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddCertification = () => {
    if (
      !formData.certificateName ||
      !formData.providedBy ||
      !formData.certificateId
    ) {
      alert("Please fill in all required fields.");
      return;
    } else {
      sendRequest();
      dispatch(certificateActions.addCertification({ ...formData }));
    }
  };

  const handleProviderChange = (event) => {
    const value = event.target.value;
    if (value === "Other") {
      setIsCustomProvider(true);
      setFormData({ ...formData, providedBy: "" });
    } else {
      setIsCustomProvider(false);
      setFormData({ ...formData, providedBy: value });
    }
  };

  const sendRequest = async () => {
    const response = await axios
      .post(
        REACT_APP_SERVER_URL + "/user/createCertification",
        {
          formData,
          isCustomProvider
        },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((error) => console.log(error, "@status error"));

    const data = response.data.certification;
    console.log("dataaaaaaaaaaa", data);

    if (response.status === 200) {
      setFormData({
        existingId: "",
        certificateName: "",
        providedBy: "",
        issuedOn: "",
        startDate: "",
        endDate: "",
        certificateId: "",
      });

      onClose();
    } else {
      toast("Failed to add the Certification");
    }
    return data;
  };

  const getCertificationProvider = async () => {
    const response = await axios
      .get(REACT_APP_SERVER_URL + "/user/getCertificationProvider", {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => console.log(error, "@status error"));

    const data = response.data.CertificationProviderInfo;

    
    if (response.status === 200) {
      setCertificationProviders(data);
    } else {
      toast("Failed to add the Certification");
    }
  };

  console.log("certification providerrrrrrrrrrrrrrrrrr", certificationProviders);

  return (
    <Box sx={{ p: 2, maxWidth: 800, mx: "auto" }}>
      <Box
        elevation={4}
        sx={{
          p: 2,
          maxHeight: 600,
          overflowY: "auto",
          position: "relative",
        }}
      >
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 1,
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>

        <Typography
          variant="h5"
          gutterBottom
          textAlign="center"
          color="black"
          style={{ marginBottom: "2rem", fontWeight: "bolder" }}
        >
          Certification Details
        </Typography>

        <Box component="form" sx={{ mt: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Certificate Name"
                name="certificateName"
                value={formData.certificateName}
                onChange={handleInputChange}
              />
            </Grid>

            {/* <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Issued By"
                name="providedBy"
                value={formData.providedBy}
                onChange={handleInputChange}
              />
            </Grid> */}

            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Issued By</InputLabel>
                <Select
                  value={isCustomProvider ? "Other" : formData.providedBy}
                  onChange={handleProviderChange}
                  label="Issued By"
                >
                  {certificationProviders.map((provider) => (
                    <MenuItem key={provider.id} value={provider.ProviderName}>
                      {provider.ProviderName}
                    </MenuItem>
                  ))}
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              {isCustomProvider && (
                <TextField
                  fullWidth
                  required
                  label="Custom Provider"
                  value={customProvider}
                  onChange={(e) => {
                    setCustomProvider(e.target.value);
                    setFormData({ ...formData, providedBy: e.target.value });
                  }}
                  sx={{marginTop:"1rem"}}
                />
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Certificate Issued On"
                name="issuedOn"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.issuedOn}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Start Date"
                name="startDate"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.startDate}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Expiry Date (Optional)"
                name="endDate"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.endDate}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Certificate ID"
                name="certificateId"
                value={formData.certificateId}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={6}>
              <Button
                onClick={handleAddCertification}
                style={{
                  top: "1rem",
                  left: "2rem",
                }}
              >
                Add Certification
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default CertificationForm;
