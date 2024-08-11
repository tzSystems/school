import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Students from "../assets/students.svg";
import { LightPurpleButton } from '../components/buttonStyles';
import lang from "../config/lang/homePage";
import { changeLang } from '../redux/langRelated/langHandle';

const Homepage = () => {
    const {
        welcome,
        school_management,
        system,
        body,
        login,
        signUp,
        no_account
    } = lang;

    const dispatch = useDispatch();
    const { code } = useSelector(state => state.language);

    const [language, setLanguage] = useState(code);

    const handleLanguageChange = (event) => {
        const selectedLang = event.target.value;
        setLanguage(selectedLang);
        dispatch(changeLang(selectedLang));
    };

    return (
        <StyledContainer>
            <Grid container spacing={0}>
                <Grid item xs={12} md={6}>
                    <img src={Students} alt="students" style={{ width: '100%' }} />
                    <FormControl variant="outlined" size="small" sx={{ mt: 2, minWidth: 120 }}>
                        <InputLabel id="language-select-label">Language</InputLabel>
                        <Select
                            labelId="language-select-label"
                            id="language-select"
                            value={language}
                            onChange={handleLanguageChange}
                            label="Language"
                        >
                            <MenuItem value={0}>English</MenuItem>
                            <MenuItem value={1}>Swahili</MenuItem>
                            <MenuItem value={2}>French</MenuItem>
                            <MenuItem value={3}>Spanish</MenuItem>
                            <MenuItem value={4}>Igbo</MenuItem>
                            <MenuItem value={5}>Yoruba</MenuItem>
                            <MenuItem value={6}>Zulu</MenuItem>
                            <MenuItem value={7}>Xhosa</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <StyledPaper elevation={3}>
                        <StyledTitle>
                            {welcome[code]}
                            <br />
                            {school_management[code]}
                            <br />
                            {system[code]}
                        </StyledTitle>
                        <StyledText>
                            {body[code]}
                        </StyledText>
                        <StyledBox>
                            <StyledLink to="/choose">
                                <LightPurpleButton variant="contained" fullWidth>
                                    {login[code]}
                                </LightPurpleButton>
                            </StyledLink>
                            <StyledText>
                                {no_account[code]}{' '}
                                <Link to="/Adminregister" style={{ color: "#550080" }}>
                                    {signUp[code]}
                                </Link>
                            </StyledText>
                        </StyledBox>
                    </StyledPaper>
                </Grid>
            </Grid>
        </StyledContainer>
    );
};

export default Homepage;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledPaper = styled.div`
  padding: 24px;
  height: 100vh;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px;
`;

const StyledTitle = styled.h1`
  font-size: 3rem;
  color: #252525;
  font-weight: bold;
  padding-top: 0;
  letter-spacing: normal;
  line-height: normal;
`;

const StyledText = styled.p`
  margin-top: 30px;
  margin-bottom: 30px;
  letter-spacing: normal;
  line-height: normal;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
