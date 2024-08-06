

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import { getAllStudents } from '../../../redux/userRelated/userHandle'; // Assuming this action exists
import { useNavigate } from 'react-router-dom';
import { PurpleButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';

const ChooseStudent = ({ situation }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { studentsList, loading, error, getresponse } = useSelector((state) => state.user);
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getAllStudents(currentUser._id)); // Assuming the action takes the user ID as a parameter
  }, [currentUser._id, dispatch]);

  if (error) {
    console.log(error);
  }

  const navigateHandler = (studentID) => {
    navigate("/Admin/parents/add/" + studentID);
  };

  const studentColumns = [
    { id: 'name', label: 'Student Name', minWidth: 170 },
  ];

  const studentRows = studentsList && studentsList.length > 0 && studentsList.map((student) => {
    return {
      name: student.name,
      id: student._id,
    };
  });

  const StudentButtonHaver = ({ row }) => {
    return (
      <>
        <PurpleButton variant="contained"
          onClick={() => navigateHandler(row.id)}>
          Choose
        </PurpleButton>
      </>
    );
  };

  return (
    <>
      {loading ?
        <div>Loading...</div>
        :
        <>
          {getresponse ?
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              <Button variant="contained" onClick={() => navigate("/Admin/addstudent")}>
                Add Student
              </Button>
            </Box>
            :
            <>
              <Typography variant="h6" gutterBottom component="div">
                Choose a student
              </Typography>
              {Array.isArray(studentsList) && studentsList.length > 0 &&
                <TableTemplate buttonHaver={StudentButtonHaver} columns={studentColumns} rows={studentRows} />
              }
            </>}
        </>
      }
    </>
  );
}

export default ChooseStudent;
