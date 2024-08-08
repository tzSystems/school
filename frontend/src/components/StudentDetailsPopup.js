import React from 'react';
import { Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, Typography } from '@mui/material';

const StudentListPopup = ({ students, open, onClose, onSelectStudent }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Select a Student</DialogTitle>
      <DialogContent>
        {students && students.length > 0 ? (
          <List>
            {students.map((student) => (
              <ListItem
                button
                key={student._id}
                onClick={() => onSelectStudent(student)}
              >
                <ListItemText primary={student.name} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body1" color="textSecondary">
            No students found with that name.
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default StudentListPopup;
