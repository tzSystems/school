// StudentListPopup.js
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, Typography } from '@mui/material';

const StudentListPopup = ({ students, open, onClose, onSelectStudent }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Select a Student</DialogTitle>
      <DialogContent>
        <List>
          {students.map((student) => (
            <ListItem button key={student._id} onClick={() => onSelectStudent(student)}>
              <Typography variant="body1">{student.name}</Typography>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StudentListPopup;
