import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Typography, Box, Avatar, Paper, CircularProgress, Tabs, Tab, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { fetchChild } from '../../redux/parentRelated/parentHandle';

const ChildProfile = () => {
  const dispatch = useDispatch();
  const [selectedChild, setSelectedChild] = useState(null);
  const [childrenDetails, setChildrenDetails] = useState([]);
  const [loadingChildren, setLoadingChildren] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const { currentUser } = useSelector((state) => state.user);

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

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

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

          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="Attendance" />
            <Tab label="Quizzes & Exercises" />
            <Tab label="Results" />
            <Tab label="Notice" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            {/* Attendance Tab */}
            {selectedChild.attendance && selectedChild.attendance.length > 0 ? (
              <ul>
                {selectedChild.attendance.map((record) => (
                  <li key={record._id}>
                    {record.subName?.subName}: {record.status} on {new Date(record.date).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            ) : (
              <Typography>No attendance records found.</Typography>
            )}
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            {/* Quizzes & Exercises Tab */}
            {/* Render quizzes and exercises data here */}
            <Typography>No quizzes or exercises data available.</Typography>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            {/* Results Tab */}
            {selectedChild.examResult && selectedChild.examResult.length > 0 ? (
              <ul>
                {selectedChild.examResult.map((result) => (
                  <li key={result._id}>
                    {result.subjectName}: {result.score}%
                  </li>
                ))}
              </ul>
            ) : (
              <Typography>No results found.</Typography>
            )}
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            {/* Notice Tab */}
            {/* Render notices here */}
            <Typography>No notices available.</Typography>
          </TabPanel>
        </>
      )}
    </Container>
  );
};

export default ChildProfile;

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const StyledPaper = styled(Paper)`
  padding: 20px;
  margin-bottom: 20px;
`;
