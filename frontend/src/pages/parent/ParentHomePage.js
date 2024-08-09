import React, { useEffect } from 'react';
import { Container, Grid, Paper, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import styled from 'styled-components';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';

const ParentHomePage = () => {
    console.log('we are in Parent Home Page');
    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        console.log('current user', currentUser);
        if (currentUser && currentUser._id) {
            dispatch(getUserDetails(currentUser._id, "Parent"));
            dispatch(getAllStudents(currentUser._id));
        }
    }, [dispatch, currentUser]);

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={0} justifyContent="center">
                <Grid item xs={12} sm={6} md={4}>
                    <StyledPaper>
                        <Button variant="contained" color="primary" fullWidth>
                            View Student Details
                        </Button>
                    </StyledPaper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <StyledPaper>
                        <Button variant="contained" color="secondary" fullWidth>
                            Student Progress
                        </Button>
                    </StyledPaper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <StyledPaper>
                        <Button variant="contained" color="success" fullWidth>
                            Student Result
                        </Button>
                    </StyledPaper>
                </Grid>
            </Grid>
        </Container>
    );
}

const StyledPaper = styled(Paper)`
  padding: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 200px;
  width: 200px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  margin: 16px auto;
`;

export default ParentHomePage;
