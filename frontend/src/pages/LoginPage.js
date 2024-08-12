import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Grid,
  Box,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  TextField,
  CssBaseline,
  IconButton,
  InputAdornment,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import bgpic from "../assets/designlogin.jpg";
import { LightPurpleButton } from '../components/buttonStyles';
import styled from 'styled-components';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';
import lang from "../config/lang/loginPage";

const defaultTheme = createTheme();

const LoginPage = ({ role }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);
    const { code } = useSelector(state => state.language);

    const {
        role_login,
        welcome_message,
        enter_roll_number,
        enter_name,
        enter_email,
        password,
        remember_me,
        forgot_password,
        no_account,
        signUp,
        password_required,
        email_required
    } = lang;

    const [toggle, setToggle] = useState(false);
    const [guestLoader, setGuestLoader] = useState(false);
    const [loader, setLoader] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [rollNumberError, setRollNumberError] = useState(false);
    const [studentNameError, setStudentNameError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (role === "Student") {
            const rollNum = event.target.rollNumber.value;
            const studentName = event.target.studentName.value;
            const passwordValue = event.target.password.value;

            if (!rollNum || !studentName || !passwordValue) {
                if (!rollNum) setRollNumberError(true);
                if (!studentName) setStudentNameError(true);
                if (!passwordValue) setPasswordError(true);
                return;
            }
            const fields = { rollNum, studentName, password: passwordValue };
            setLoader(true);
            dispatch(loginUser(fields, role));
        } else {
            const emailValue = event.target.email.value;
            const passwordValue = event.target.password.value;

            if (!emailValue || !passwordValue) {
                if (!emailValue) setEmailError(true);
                if (!passwordValue) setPasswordError(true);
                return;
            }

            const fields = { email: emailValue, password: passwordValue };
            setLoader(true);
            dispatch(loginUser(fields, role));
        }
    };

    const handleInputChange = (event) => {
        const { name } = event.target;
        if (name === 'email') setEmailError(false);
        if (name === 'password') setPasswordError(false);
        if (name === 'rollNumber') setRollNumberError(false);
        if (name === 'studentName') setStudentNameError(false);
    };

    const guestModeHandler = () => {
        const passwordValue = "zxc";

        const guestData = {
            Admin: { email: "yogendra@12", password: passwordValue },
            Student: { rollNum: "1", studentName: "Dipesh Awasthi", password: passwordValue },
            Teacher: { email: "tony@12", password: passwordValue },
            Parent: { email: "parent@12", password: passwordValue },
        };

        setGuestLoader(true);
        dispatch(loginUser(guestData[role], role));
    };

    useEffect(() => {
        if (status === 'success' || currentUser !== null) {
            console.log(`User logged in, current user ${currentUser.role}`);
            navigate(`/${currentRole}/dashboard`);
        } else if (status === 'failed') {
            console.log('Failed to navigate to dashboard, status:', status, currentUser);
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        } else if (status === 'error') {
            setMessage("Network Error");
            setShowPopup(true);
            setLoader(false);
            setGuestLoader(false);
        }
    }, [status, currentRole, navigate, error, response, currentUser]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <OuterGlassCard>
                <GlassCard>
                    <Grid container component="main" sx={{ height: '100vh' }}>
                        <CssBaseline />
                        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                            <InnerGlassCard>
                                <Box
                                    sx={{
                                        my: 8,
                                        mx: 4,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Typography variant="h4" sx={{ mb: 2, color: "#2c2143" }}>
                                        {role_login[code].replace('{role}', role)}
                                    </Typography>
                                    <Typography variant="h7">
                                        {welcome_message[code]}
                                    </Typography>
                                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
                                        {role === "Student" ? (
                                            <>
                                                <TextField
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="rollNumber"
                                                    label={enter_roll_number[code]}
                                                    name="rollNumber"
                                                    autoComplete="off"
                                                    type="number"
                                                    autoFocus
                                                    error={rollNumberError}
                                                    helperText={rollNumberError && 'Roll Number is required'}
                                                    onChange={handleInputChange}
                                                />
                                                <TextField
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="studentName"
                                                    label={enter_name[code]}
                                                    name="studentName"
                                                    autoComplete="name"
                                                    autoFocus
                                                    error={studentNameError}
                                                    helperText={studentNameError && 'Name is required'}
                                                    onChange={handleInputChange}
                                                />
                                            </>
                                        ) : (
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="email"
                                                label={enter_email[code]}
                                                name="email"
                                                autoComplete="email"
                                                autoFocus
                                                error={emailError}
                                                helperText={emailError && `${email_required[code]}`}
                                                onChange={handleInputChange}
                                            />
                                        )}
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="password"
                                            label={password[code]}
                                            type={toggle ? 'text' : 'password'}
                                            id="password"
                                            autoComplete="current-password"
                                            error={passwordError}
                                            helperText={passwordError && `${password_required[code]}`}
                                            onChange={handleInputChange}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton onClick={() => setToggle(!toggle)}>
                                                            {toggle ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                        <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <FormControlLabel
                                                control={<Checkbox value="remember" color="primary" />}
                                                label={remember_me[code]}
                                            />
                                            <StyledLink to="#">
                                                {forgot_password[code]}
                                            </StyledLink>
                                        </Grid>
                                        <LightPurpleButton
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3 }}
                                        >
                                            {loader ? <CircularProgress size={24} color="inherit" /> : role_login[code].replace('{role}', '')}
                                        </LightPurpleButton>
                                    
                                        {role === "Admin" &&
                                            <Grid container>
                                                <Grid>
                                                {no_account[code]}
                                                </Grid>
                                                <Grid item sx={{ ml: 2 }}>
                                                    <StyledLink to="/Adminregister">
                                                        {signUp[code]}
                                                    </StyledLink>
                                                </Grid>
                                            </Grid>
                                        }
                                    </Box>
                                </Box>
                            </InnerGlassCard>
                        </Grid>
                        <Grid
                            item
                            xs={false}
                            sm={4}
                            md={7}
                            sx={{
                                backgroundImage: `url(${bgpic})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundColor: (t) =>
                                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        />
                    </Grid>
                    <GradientSmallCard position="top-left" />
                    <GradientSmallCard position="top-right" />
                    <GradientSmallCard position="bottom-left" />
                    <GradientSmallCard position="bottom-right" />
                </GlassCard>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={guestLoader}
                >
                    Please Wait
                </Backdrop>
                <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
            </OuterGlassCard>
        </ThemeProvider>
    );
}

export default LoginPage;

const StyledLink = styled(Link)`
  margin-top: 9px;
  text-decoration: none;
  color: #7f56da;
`;

const GlassCard = styled.div`
  position: relative;
  width: 85%;
  height: 85%;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3); /* Edge Highlight */
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(12px);
  overflow: hidden;
`;

const InnerGlassCard = styled.div`
  padding: 20px;
  background: rgba(255, 255, 255, 0.25);
  border: 2px solid rgba(255, 255, 255, 0.4); /* Inner Edge Highlight */
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.25);
  border-radius: 20px;
  width: 95%;
  height: 80%;
  position: relative;
  
`;

const OuterGlassCard = styled.div`
  position: relative;
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

const GradientSmallCard = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #6a11cb, #2575fc, #b23367);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.8); /* Card Border */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Shadow for Depth */
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

