import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Box, Typography, CircularProgress, Container, Grid } from '@mui/material';
import Popup from '../../../components/Popup';
import StudentListPopup from '../../../components/StudentListPopup';
import { registerUser } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { fetchStudentNames } from '../../../redux/studentRelated/studentSearchHandle';

const AddParent = () => {
  const { studentId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, response, error, currentUser } = useSelector(state => state.user);
  const { studentsList: studentNames = [], loading: studentLoading } = useSelector(state => state.studentSearch);
  const school_name = currentUser.schoolName;

  const [name, setName] = useState('');
  const [studentName, setStudentName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');
  const [loader, setLoader] = useState(false);
  const [showStudentList, setShowStudentList] = useState(false);

  const role = 'Parent';

  const fields = { name, email, password, phone, address, role, childId: selectedStudent ? selectedStudent._id : studentId };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(registerUser(fields, role));
  };

  useEffect(() => {
    if (status === 'added') {
      dispatch(underControl());
      navigate('/Admin/parents');
    } else if (status === 'failed') {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === 'error') {
      setMessage('Network Error');
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, error, response, dispatch]);

  const handleStudentNameChange = (event) => {
    setStudentName(event.target.value);
    if (event.target.value.length > 2) {
      dispatch(fetchStudentNames(event.target.value, school_name));
      setShowStudentList(true);
    }
  };

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    setStudentName(student.name);
    setShowStudentList(false);
  };

  const handleCloseStudentList = () => {
    setShowStudentList(false);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, mb: 3 }}>
        <Typography variant="h4" component="div" gutterBottom>
          Add Parent
        </Typography>
      </Box>
      <form onSubmit={submitHandler}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Student Name"
              variant="outlined"
              value={studentName}
              onChange={handleStudentNameChange}
              autoComplete="student-name"
              required
            />
            {studentLoading && <CircularProgress size={24} />}
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone"
              variant="outlined"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              autoComplete="tel"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              variant="outlined"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              autoComplete="street-address"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              disabled={loader}
              startIcon={loader && <CircularProgress size={24} color="inherit" />}
            >
              {loader ? 'Registering...' : 'Register'}
            </Button>
          </Grid>
        </Grid>
      </form>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
      {showStudentList && (
        <StudentListPopup
          students={studentNames} // Ensure students prop is always an array
          open={showStudentList}
          onClose={handleCloseStudentList}
          onSelectStudent={handleStudentSelect}
        />
      )}
    </Container>
  );
};

export default AddParent;
