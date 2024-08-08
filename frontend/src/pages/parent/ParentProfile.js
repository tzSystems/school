import React from 'react';
import styled from 'styled-components';
import { Card, CardContent, Typography, Grid, Box, Avatar, Container, Paper, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

const ParentProfile = () => {
  const dispatch = useDispatch();
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) { console.log(response); }
  else if (error) { console.log(error); }

  const handleFillDetails = () => {
    // Function to handle filling missing details
    // Replace this with actual dispatch or logic to update user details
    console.log('Filling missing details...');
    // Dispatch an action to update the details
    // dispatch(updateParentDetails(updatedDetails));
  };

  return (
    <>
      <Container maxWidth="md">
        <StyledPaper elevation={3}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Avatar alt="Parent Avatar" sx={{ width: 150, height: 150 }}>
                  {String(currentUser.name).charAt(0)}
                </Avatar>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Typography variant="h5" component="h2" textAlign="center">
                  {currentUser.name}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Typography variant="subtitle1" component="p" textAlign="center">
                  Parent ID: {currentUser.parentID}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </StyledPaper>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom align="center" fontWeight="bold">
              Personal Information
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" component="p"  fontWeight="">
                  <strong>Date of Birth:</strong> {currentUser.dob || 'Not provided'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" component="p"  fontWeight="">
                  <strong>Gender:</strong> {currentUser.gender || 'Not provided'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" component="p" fontWeight="">
                  <strong>Email:</strong> {currentUser.email}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" component="p" fontWeight="">
                  <strong>Phone:</strong> {currentUser.phone}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" component="p"  fontWeight="">
                  <strong>Address:</strong> {currentUser.address || 'Not provided'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" component="p" fontWeight="">
                  <strong>Occupation:</strong> {currentUser.occupation || 'Not provided'}
                </Typography>
              </Grid>
            </Grid>
            <Box display="flex" justifyContent="center" mt={2}>
              <Button variant="contained" color="primary" onClick={handleFillDetails}>
                Fill Missing Details
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default ParentProfile;

const StyledPaper = styled(Paper)`
  padding: 20px;
  margin-bottom: 20px;
`;
