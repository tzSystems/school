import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Box,
  Container,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import { AccountCircle, School, Group, FamilyRestroom } from '@mui/icons-material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';
import lang from "../config/lang/chooseRole"; // Update import to new file

const ChooseUser = ({ visitor }) => {
  const {

    student,
    teacher,
    parent,
    login_as_admin,
    login_as_student,
    login_as_teacher,
    login_as_parent,
  } = lang;
  console.log('student', student)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = "zxc";

  const { code } = useSelector(state => state.language); // Language code
  const { status, currentUser, currentRole } = useSelector(state => state.user);

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigateHandler = (user) => {
    const fields = { password };

    switch (user) {
      case "Admin":
        if (visitor === "guest") {
          fields.email = "yogendra@12";
          setLoader(true);
          dispatch(loginUser(fields, user));
        } else {
          navigate('/Adminlogin');
        }
        break;
      case "Student":
        if (visitor === "guest") {
          fields.rollNum = "1";
          fields.studentName = "Dipesh Awasthi";
          setLoader(true);
          dispatch(loginUser(fields, user));
        } else {
          navigate('/Studentlogin');
        }
        break;
      case "Teacher":
        if (visitor === "guest") {
          fields.email = "tony@12";
          setLoader(true);
          dispatch(loginUser(fields, user));
        } else {
          navigate('/Teacherlogin');
        }
        break;
      case "Parent":
        if (visitor === "guest") {
          fields.email = "parent@12";
          setLoader(true);
          dispatch(loginUser(fields, user));
        } else {
          navigate('/Parentlogin');
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      switch (currentRole) {
        case 'Admin':
          navigate('/Admin/dashboard');
          break;
        case 'Student':
          navigate('/Student/dashboard');
          break;
        case 'Teacher':
          navigate('/Teacher/dashboard');
          break;
        case 'Parent':
          navigate('/Parent/dashboard');
          break;
        default:
          break;
      }
    } else if (status === 'error') {
      setLoader(false);
      setMessage("Network Error");
      setShowPopup(true);
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <StyledContainer>
      <Container>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <div onClick={() => navigateHandler("Admin")}>
              <StyledPaper elevation={3}>
                <Box mb={2}>
                  <AccountCircle fontSize="large" />
                </Box>
                <StyledTypography>Admin</StyledTypography>
                {login_as_admin[code]} {/* Adjusted key name */}
              </StyledPaper>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StyledPaper elevation={3}>
              <div onClick={() => navigateHandler("Student")}>
                <Box mb={2}>
                  <School fontSize="large" />
                </Box>
                <StyledTypography>{student[code]}</StyledTypography>
                {login_as_student[code]}
              </div>
            </StyledPaper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StyledPaper elevation={3}>
              <div onClick={() => navigateHandler("Teacher")}>
                <Box mb={2}>
                  <Group fontSize="large" />
                </Box>
                <StyledTypography>{teacher[code]}</StyledTypography>
                {login_as_teacher[code]}
              </div>
            </StyledPaper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StyledPaper elevation={3}>
              <div onClick={() => navigateHandler("Parent")}>
                <Box mb={2}>
                  <FamilyRestroom fontSize="large" />
                </Box>
                <StyledTypography>{parent[code]}</StyledTypography>
                {login_as_parent[code]}
              </div>
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
        Please Wait
      </Backdrop>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </StyledContainer>
  );
};

export default ChooseUser;

const StyledContainer = styled.div`
  background: linear-gradient(to bottom, #411d70, #19118b);
  height: 120vh;
  display: flex;
  justify-content: center;
  padding: 2rem;
`;

const StyledPaper = styled(Paper)`
  padding: 20px;
  text-align: center;
  background-color: #1f1f38;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;

  &:hover {
    background-color: #2c2c6c;
    color: white;
  }
`;

const StyledTypography = styled.h2`
  margin-bottom: 10px;
`;
