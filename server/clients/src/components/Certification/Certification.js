
import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";


const CertificationForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    certificateName: "",
    providedBy: "",
    issuedOn: "",
    startDate: "",
    endDate: "",
    certificateId: "",
  });
  const [certifications, setCertifications] = useState([]);

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
    }

    const newCertification = {
      ...formData,
      id: new Date().getTime(),
    };

    setCertifications([...certifications, newCertification]);
    setFormData({
      certificateName: "",
      providedBy: "",
      issuedOn: "",
      startDate: "",
      endDate: "",
      certificateId: "",
    });
  };

  const handleDeleteCertification = (id) => {
    setCertifications(certifications.filter((cert) => cert.id !== id));
  };

  return (
    <Box sx={{ p: 2, maxWidth: 900, mx: "auto" }}>
      <Paper
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

        <Typography variant="h5" gutterBottom textAlign="center" color="black">
          Certification Details
        </Typography>

        <Box component="form" sx={{ mt: 1 }}>
          <Grid container spacing={2}>
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

            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Issued By"
                name="providedBy"
                value={formData.providedBy}
                onChange={handleInputChange}
              />
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

            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleAddCertification}
              >
                Add Certification
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* {certifications.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Added Certifications
            </Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Certificate Name</TableCell>
                  <TableCell>Issued By</TableCell>
                  <TableCell>Issued On</TableCell>
                  <TableCell>Start Date</TableCell>
                  {certifications.some((cert) => cert.endDate) && (
                    <TableCell>Expiry Date</TableCell>
                  )}
                  <TableCell>Certificate ID</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {certifications.map((cert) => (
                  <TableRow key={cert.id}>
                    <TableCell>{cert.certificateName}</TableCell>
                    <TableCell>{cert.providedBy}</TableCell>
                    <TableCell>{cert.issuedOn}</TableCell>
                    <TableCell>{cert.startDate || "N/A"}</TableCell>
                    {cert.endDate && <TableCell>{cert.endDate}</TableCell>}
                    <TableCell>{cert.certificateId}</TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteCertification(cert.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )} */}
      </Paper>
    </Box>
  );
};

export default CertificationForm;


