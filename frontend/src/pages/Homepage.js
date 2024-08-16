import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box, MenuItem, Select, FormControl, InputLabel, Button } from '@mui/material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Students from "../assets/students.svg";
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
        <OuterGlassCard>
            <GlassCard>
            
                <InnerGlassCard>
                    <Grid container spacing={0}>
                        <Grid item xs={12} md={6}>
                            <StyledImage src={Students} alt="students" />
                        </Grid>
                        <Grid item xs={12} md={6}>
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
                                    <CustomGlassButton variant="contained" fullWidth>
                                        {login[code]}
                                    </CustomGlassButton>
                                </StyledLink>
                                <StyledText>
                                    {no_account[code]}{' '}
                                    <Link to="/Adminregister" style={{ color: "#0F4C75", textDecoration: "underline" }}>
                                        {signUp[code]}
                                    </Link>
                                </StyledText>
                                <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
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
                            </StyledBox>
                        </Grid>
                    </Grid>
                </InnerGlassCard>
            </GlassCard>
        </OuterGlassCard>
    );
};

export default Homepage;

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
  max-width: 1200px; /* Set a maximum width for the card */
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InnerGlassCard = styled.div`
  background: rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 16px rgba(31, 38, 135, 0.25);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  max-width: 1000px; /* Set a maximum width for the inner card */
  width: 100%;
  height: auto;
`;

const StyledImage = styled.img`
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
  display: block;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2));

  @media (max-width: 600px) {
    max-width: 250px;
    margin-bottom: 20px;
  }
`;

const StyledTitle = styled.h1`
  font-size: 2.8rem;
  color: #ffffff;
  font-weight: 700;
  text-align: center;
  line-height: 1.3;

  @media (max-width: 600px) {
    font-size: 2.2rem;
  }
`;

const StyledText = styled.p`
  color: #ffffff;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 1.1rem;
  line-height: 1.6;

  @media (max-width: 600px) {
    margin-top: 16px;
    margin-bottom: 16px;
    font-size: 1rem;
  }
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 20px;

  @media (max-width: 600px) {
    padding: 16px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const CustomGlassButton = styled(Button)`
  background-color: #3282b8 !important; /* Mid-blue button color */
  color: white !important;
  font-weight: bold;
  padding: 12px 20px;
  border-radius: 8px;
  border: 2px solid rgba(255, 255, 255, 0.18) !important;
  backdrop-filter: blur(5px);

  &:hover {
    background-color: #1b262c !important; /* Darker blue on hover */
  }

  @media (max-width: 600px) {
    padding: 10px 16px;
    font-size: 1rem;
  }
`;
