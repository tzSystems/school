import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllParents } from '../../../redux/parentRelated/parentHandle';
import {
    Paper, Table, TableBody, TableContainer,
    TableHead, TablePagination, IconButton,
    Box, Typography, Tooltip, CircularProgress
} from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { StyledTableCell, StyledTableRow } from '../../../components/styles';
import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';

const ShowParents = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { parentsList, loading, error } = useSelector((state) => state.parent);
    const { currentUser } = useSelector((state) => state.user);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (currentUser && currentUser._id) {
            dispatch(getAllParents(currentUser._id));
        }
    }, [currentUser, dispatch]);

    const deleteHandler = (deleteID) => {
        console.log(deleteID);
        setMessage("Sorry, the delete function has been disabled for now.");
        setShowPopup(true);

        // dispatch(deleteUser(deleteID, "Parents")).then(() => {
        //     dispatch(getAllParents(currentUser._id));
        // });
    };

    const columns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'email', label: 'Email', minWidth: 100 },
        { id: 'childName', label: 'Child Name', minWidth: 170 },
    ];

    // Ensure parentsList is defined before mapping
    const rows = parentsList ? parentsList.map((parent) => {
        return {
            name: parent.name,
            email: parent.email,
            childName: parent.children.map(child => child.name).join(', ') || 'N/A',
            id: parent._id,
        };
    }) : [];

    const actions = [
        {
            icon: <PersonAddAlt1Icon color="primary" />, name: 'Add New Parent',
            action: () => navigate("/Admin/parents/choosestudent")
        },
        {
            icon: <PersonRemoveIcon color="error" />, name: 'Delete All Parents',
            action: () => deleteHandler(currentUser._id)
        },
    ];

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    } else if (error) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography color="error">Error: {error.message}</Typography>
            </Box>
        );
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', padding: '20px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <Typography variant="h5" component="div">
                    Parents List
                </Typography>
                <GreenButton variant="contained" onClick={() => navigate("/Admin/parents/choosestudent")}>
                    Add Parent
                </GreenButton>
            </Box>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <StyledTableRow>
                            {columns.map((column) => (
                                <StyledTableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </StyledTableCell>
                            ))}
                            <StyledTableCell align="center">
                                Actions
                            </StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                {columns.map((column) => {
                                    const value = row[column.id];
                                    return (
                                        <StyledTableCell key={column.id} align={column.align}>
                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                        </StyledTableCell>
                                    );
                                })}
                                <StyledTableCell align="center">
                                    <Tooltip title="Delete Parent">
                                        <IconButton onClick={() => deleteHandler(row.id)}>
                                            <PersonRemoveIcon color="error" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="View Parent">
                                        <BlueButton
                                            variant="contained"
                                            onClick={() => navigate("/Admin/parents/parent/" + row.id)}
                                        >
                                            View
                                        </BlueButton>
                                    </Tooltip>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
                onRowsPerPageChange={(event) => {
                    setRowsPerPage(parseInt(event.target.value, 10));
                    setPage(0);
                }}
            />

            <SpeedDialTemplate actions={actions} />
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Paper>
    );
};

export default ShowParents;
