

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Card, CardContent, Typography, Grid, Box, Avatar, Container, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';

const ParentChildProfile = () => {
  const dispatch = useDispatch();
  const [selectedChild, setSelectedChild] = useState(null);
  
  const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserDetails(currentUser._id, "Parent"));
  }, [dispatch, currentUser._id]);

  const handleChildChange = (event) => {
    const selectedId = event.target.value;
    const child = userDetails.children.find(student => student._id === selectedId);
    setSelectedChild(child);
  };

  if (response) { console.log(response) }
  else if (error) { console.log(error) }

  return (
    <>
      <Container maxWidth="md">
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6" component="div" gutterBottom>
            Select Child
          </Typography>
          <select onChange={handleChildChange} value={selectedChild ? selectedChild._id : ''}>
            <option value="" disabled>Select Child</option>
            {userDetails?.children?.map((student) => (
              <option key={student._id} value={student._id}>
                {student.name}
              </option>
            ))}
          </select>
        </Box>

        {selectedChild && (
          <StyledPaper elevation={3}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center">
                  <Avatar alt="Student Avatar" sx={{ width: 150, height: 150 }}>
                    {String(selectedChild.name).charAt(0)}
                  </Avatar>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center">
                  <Typography variant="h5" component="h2" textAlign="center">
                    {selectedChild.name}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center">
                  <Typography variant="subtitle1" component="p" textAlign="center">
                    Student Roll No: {selectedChild.rollNum}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center">
                  <Typography variant="subtitle1" component="p" textAlign="center">
                    Class: {selectedChild.sclassName?.sclassName}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center">
                  <Typography variant="subtitle1" component="p" textAlign="center">
                    School: {selectedChild.school?.schoolName}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </StyledPaper>
        )}

        {selectedChild && (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" component="p">
                    <strong>Date of Birth:</strong> {selectedChild.dateOfBirth || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" component="p">
                    <strong>Gender:</strong> {selectedChild.gender || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" component="p">
                    <strong>Email:</strong> {selectedChild.email || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" component="p">
                    <strong>Phone:</strong> {selectedChild.phone || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" component="p">
                    <strong>Address:</strong> {selectedChild.address || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" component="p">
                    <strong>Emergency Contact:</strong> {selectedChild.emergencyContact || "N/A"}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
      </Container>
    </>
  )
}

export default ParentChildProfile;

const StyledPaper = styled(Paper)`
  padding: 20px;
  margin-bottom: 20px;
`;
