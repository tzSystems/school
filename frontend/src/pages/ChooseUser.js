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
    <OuterGlassCard>
      <GlassCard>
        <InnerGlassCard>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <CardWrapper onClick={() => navigateHandler("Admin")}>
                <StyledPaper elevation={3}>
                  <Box mb={2}>
                    <AccountCircle fontSize="large" />
                  </Box>
                  <StyledTypography>Admin</StyledTypography>
                  {login_as_admin[code]}
                </StyledPaper>
              </CardWrapper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CardWrapper onClick={() => navigateHandler("Student")}>
                <StyledPaper elevation={3}>
                  <Box mb={2}>
                    <School fontSize="large" />
                  </Box>
                  <StyledTypography>{student[code]}</StyledTypography>
                  {login_as_student[code]}
                </StyledPaper>
              </CardWrapper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CardWrapper onClick={() => navigateHandler("Teacher")}>
                <StyledPaper elevation={3}>
                  <Box mb={2}>
                    <Group fontSize="large" />
                  </Box>
                  <StyledTypography>{teacher[code]}</StyledTypography>
                  {login_as_teacher[code]}
                </StyledPaper>
              </CardWrapper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CardWrapper onClick={() => navigateHandler("Parent")}>
                <StyledPaper elevation={3}>
                  <Box mb={2}>
                    <FamilyRestroom fontSize="large" />
                  </Box>
                  <StyledTypography>{parent[code]}</StyledTypography>
                  {login_as_parent[code]}
                </StyledPaper>
              </CardWrapper>
            </Grid>
          </Grid>
        </InnerGlassCard>
        <SmallCard position="top-left" />
        <SmallCard position="top-right" />
        <SmallCard position="bottom-left" />
        <SmallCard position="bottom-right" />
      </GlassCard>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
        Please Wait
      </Backdrop>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </OuterGlassCard>
  );
};

export default ChooseUser;

// Styles

const OuterGlassCard = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.3); /* Semi-transparent background */
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 1; /* Ensure it sits on top of other content */
`;

const GlassCard = styled.div`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  max-width: 1200px;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const InnerGlassCard = styled.div`
  background: rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 16px rgba(31, 38, 135, 0.25);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  max-width: 1000px;
  width: 100%;
  height: auto;
  position: relative;
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
  font-size: 1.5rem;
`;

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const SmallCard = styled.div`
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(31, 38, 135, 0.25);
  position: absolute;

  ${({ position }) => {
    switch (position) {
      case 'top-left':
        return 'top: -25px; left: -25px;';
      case 'top-right':
        return 'top: -25px; right: -25px;';
      case 'bottom-left':
        return 'bottom: -25px; left: -25px;';
      case 'bottom-right':
        return 'bottom: -25px; right: -25px;';
      default:
        return '';
    }
  }}
`;

