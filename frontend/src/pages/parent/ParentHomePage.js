import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import styled from 'styled-components';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import ChildIcon from "../../assets/students.svg";
import { getAllStudents } from '../../redux/studentRelated/studentHandle';

const ParentHomePage = () => {
    console.log('we are in Parent Home Page')
    const dispatch = useDispatch();

    const { userDetails, currentUser, loading, response } = useSelector((state) => state.user);
    const { studentList } = useSelector((state) => state.student);

    const [children, setChildren] = useState([]);

    useEffect(() => {
        console.log('current user', currentUser)
        if (currentUser && currentUser._id) {
            dispatch(getUserDetails(currentUser._id, "Parent"));
            dispatch(getAllStudents(currentUser._id));
        }
    }, [dispatch, currentUser]);

    const numberOfChildren = children && children.length;

    useEffect(() => {
        if (userDetails) {
            setChildren(userDetails.children || []);
        }
    }, [userDetails]);

    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper>
                            <img src={ChildIcon} alt="Children" />
                            <Title>
                                Total Children
                            </Title>
                            <Data start={0} end={numberOfChildren} duration={2.5} />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <SeeNotice />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

const StyledPaper = styled(Paper)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

const Title = styled.p`
  font-size: 1.25rem;
`;

const Data = styled(CountUp)`
  font-size: calc(1.3rem + .6vw);
  color: green;
`;

export default ParentHomePage;
