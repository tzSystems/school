import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Card, CardContent, Typography, Grid, Box, Avatar, Container, Paper, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { fetchChild } from '../../redux/parentRelated/parentHandle';

const ChildProfile = () => {
  const dispatch = useDispatch();
  const [selectedChild, setSelectedChild] = useState(null);
  const [childrenDetails, setChildrenDetails] = useState([]);
  const [loadingChildren, setLoadingChildren] = useState(false);

  const { currentUser, loading, response, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (currentUser && currentUser._id) {
      dispatch(getUserDetails(currentUser._id, "Parent"));
  
      if (currentUser.children && currentUser.children.length > 0) {
        setLoadingChildren(true);
        const fetchChildrenDetails = async () => {
          for (const childId of currentUser.children) {
            try {
              const res = await dispatch(fetchChild(childId));
              if (res && res.payload) {
                setChildrenDetails(prevDetails => {
                  if (!prevDetails.some(child => child._id === res.payload._id)) {
                    return [...prevDetails, res.payload];
                  }
                  return prevDetails;
                });
              }
            } catch (err) {
              console.error('Failed to fetch child details:', err);
            }
          }
          setLoadingChildren(false);
        };
        fetchChildrenDetails();
      }
    }
  }, [dispatch, currentUser]);
  
  const handleChildChange = (event) => {
    const selectedId = event.target.value;
    const child = childrenDetails.find(student => student._id === selectedId);
    setSelectedChild(child);
  };
  
  // Rendering part
  
  

  useEffect(() => {
    if (response) {
      console.log(response);
    } else if (error) {
      console.log(error);
    }
  }, [response, error]);

  return (
    <Container maxWidth="md">
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6" component="div" gutterBottom>
          Select Child
        </Typography>
        <select onChange={handleChildChange} value={selectedChild ? selectedChild._id : ''}>
          <option value="" disabled>Select Child</option>
          {childrenDetails.map((student) => (
            <option key={student._id} value={student._id}>
              {student.name}
            </option>
          ))}
        </select>
      </Box>

      {loadingChildren ? (
        <Box display="flex" justifyContent="center" sx={{ marginBottom: 2 }}>
          <CircularProgress />
        </Box>
      ) : selectedChild && (
        <>
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
        </>
      )}
    </Container>
  );
};

export default ChildProfile;

const StyledPaper = styled(Paper)`
  padding: 20px;
  margin-bottom: 20px;
`;
