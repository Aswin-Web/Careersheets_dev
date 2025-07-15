import React, { useEffect, useState } from "react";
import {
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
  Chip,
  CircularProgress,
  Stack, // Used for layout
  FormControl, // Used for the dropdown
  InputLabel,  // Used for the dropdown
  Select,      // The dropdown itself
  MenuItem,    // Items in the dropdown
  Typography
} from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { REACT_APP_SERVER_URL } from "../../config";

const SkillAdminform = ({ SkillValues, getSkills }) => {
  const token = useSelector((state) => state.auth.value);

  // --- STATE MANAGEMENT ---
  const [internalSkills, setInternalSkills] = useState([]); // Skills chosen for this job
  const [availableSkills, setAvailableSkills] = useState([]); // All skills from DB
  
  // State for the dropdown selection
  const [selectedSkill, setSelectedSkill] = useState("");
  // State for the "add new" text input
  const [newCustomSkill, setNewCustomSkill] = useState("");

  // UI states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- HOOKS (These remain the same) ---
  useEffect(() => {
    if (Array.isArray(SkillValues)) {
      setInternalSkills(SkillValues);
    }
  }, [SkillValues]);

  useEffect(() => {
    getSkills(internalSkills.join(","));
  }, [internalSkills, getSkills]);

  useEffect(() => {
    if (!token) return;
    const fetchSkills = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${REACT_APP_SERVER_URL}/user/platformskills`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const sortedSkills = response.data.skill.sort((a, b) => a.skill.localeCompare(b.skill));
        setAvailableSkills(sortedSkills.map((item) => item.skill));
      } catch (err) {
        console.error("Failed to fetch skills:", err);
        setError("Could not load skills.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSkills();
  }, [token]);


  // --- HANDLERS FOR THE NEW DESIGN ---
  const handleAddFromDropdown = () => {
    if (selectedSkill && !internalSkills.includes(selectedSkill)) {
      setInternalSkills([...internalSkills, selectedSkill]);
    }
    setSelectedSkill(""); // Reset dropdown after adding
  };

  const handleAddNewCustom = () => {
    const skillToAdd = newCustomSkill.trim();
    if (skillToAdd && !internalSkills.includes(skillToAdd)) {
      setInternalSkills([...internalSkills, skillToAdd]);
    }
    setNewCustomSkill(""); // Reset text field after adding
  };
  
  const handleDeleteSkill = (skillToDelete) => {
    setInternalSkills(internalSkills.filter((skill) => skill !== skillToDelete));
  };

  return (
    <Box sx={{ p: 2, border: '1px solid #ddd', borderRadius: '4px' }}>
      <DialogTitle sx={{ p: 0, pb: 2 }}>Manage Skills</DialogTitle>
      <DialogContent sx={{ p: 0 }}>

        {/* --- SECTION 1: SELECT FROM EXISTING --- */}
        <Typography variant="subtitle1" gutterBottom>Select an Existing Skill</Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
          <FormControl fullWidth>
            <InputLabel id="select-skill-label">Existing Skills</InputLabel>
            <Select
              labelId="select-skill-label"
              value={selectedSkill}
              label="Existing Skills"
              onChange={(e) => setSelectedSkill(e.target.value)}
              disabled={isLoading}
            >
              {isLoading && <MenuItem disabled><em><CircularProgress size={20}/> Loading...</em></MenuItem>}
              {error && <MenuItem disabled><em>{error}</em></MenuItem>}
              {availableSkills.map((skill) => (
                <MenuItem key={skill} value={skill}>
                  {skill}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            onClick={handleAddFromDropdown}
            disabled={!selectedSkill}
          >
            Add
          </Button>
        </Stack>

        {/* --- SECTION 2: ADD A NEW SKILL --- */}
        <Typography variant="subtitle1" gutterBottom>Or Add a New Skill</Typography>
        <Stack direction="row" spacing={1}>
          <TextField
            fullWidth
            label="New Skill Name"
            variant="outlined"
            value={newCustomSkill}
            onChange={(e) => setNewCustomSkill(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={handleAddNewCustom}
            disabled={!newCustomSkill.trim()}
          >
            Add New
          </Button>
        </Stack>
        
        {/* --- SECTION 3: DISPLAY CHOSEN SKILLS --- */}
        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Current Skills for this Job</Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, minHeight: "40px", p:1, border: '1px solid #eee', borderRadius: '4px' }}>
          {internalSkills.length > 0 ? (
            internalSkills.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                onDelete={() => handleDeleteSkill(skill)}
                color="primary"
              />
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">No skills added yet.</Typography>
          )}
        </Box>
      </DialogContent>
    </Box>
  );
};

export default SkillAdminform;