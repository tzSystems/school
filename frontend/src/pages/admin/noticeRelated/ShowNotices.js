import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {
    Paper, Box, IconButton
} from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllNotices } from '../../../redux/noticeRelated/noticeHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import TableTemplate from '../../../components/TableTemplate';
import { GreenButton } from '../../../components/buttonStyles';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';

const ShowNotices = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { noticesList, loading, error, response } = useSelector((state) => state.notice);
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getAllNotices(currentUser._id, "Notice"));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.log(error);
    }

    const deleteHandler = (deleteID, address) => {
        dispatch(deleteUser(deleteID, address))
            .then(() => {
                dispatch(getAllNotices(currentUser._id, "Notice"));
            });
    }

    const noticeColumns = [
        { id: 'title', label: 'Title', minWidth: 170 },
        { id: 'details', label: 'Details', minWidth: 100 },
        { id: 'date', label: 'Date', minWidth: 170 },
    ];

    const noticeRows = noticesList && noticesList.length > 0 && noticesList.map((notice) => {
        const date = new Date(notice.date);
        const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
        return {
            title: notice.title,
            details: notice.details,
            date: dateString,
            id: notice._id,
        };
    });

    const NoticeButtonHaver = ({ row }) => {
        return (
            <>
                <IconButton onClick={() => deleteHandler(row.id, "Notice")}>
                    <DeleteIcon color="error" />
                </IconButton>
            </>
        );
    };

    const actions = [
        {
            icon: <NoteAddIcon color="primary" />, name: 'Add New Notice',
            action: () => navigate("/Admin/addnotice")
        },
        {
            icon: <DeleteIcon color="error" />, name: 'Delete All Notices',
            action: () => deleteHandler(currentUser._id, "Notices")
        }
    ];

    const styles = {
        container: {
            minHeight: '100vh',
            margin: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(90deg, #0000ff 0%, #00ff7f 100%)',
            fontFamily: 'Arial, sans-serif',
            padding: '20px',
        },
        card: {
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',  // For Safari support
            border: '1px solid rgba(255, 255, 255, 0.3)',
            padding: '20px',
            width: '100%',
            maxWidth: '800px',
            color: 'white',
            position: 'relative',
            zIndex: 1,
        },
        edgeCard: {
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            width: '50px',
            height: '50px',
            position: 'absolute',
            zIndex: -1,
        },
        edgeCardTopLeft: {
            top: '-30px',
            left: '-30px',
        },
        edgeCardTopRight: {
            top: '-30px',
            right: '-30px',
        },
        edgeCardBottomLeft: {
            bottom: '-30px',
            left: '-30px',
        },
        edgeCardBottomRight: {
            bottom: '-30px',
            right: '-30px',
        },
        table: {
            marginTop: '20px',
        },
        loading: {
            color: 'white',
            fontSize: '24px',
            textAlign: 'center',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                {loading ? (
                    <div style={styles.loading}>Loading...</div>
                ) : (
                    <>
                        {response ? (
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                                <GreenButton variant="contained"
                                    onClick={() => navigate("/Admin/addnotice")}>
                                    Add Notice
                                </GreenButton>
                            </Box>
                        ) : (
                            <>
                                {Array.isArray(noticesList) && noticesList.length > 0 && (
                                    <div style={styles.table}>
                                        <TableTemplate buttonHaver={NoticeButtonHaver} columns={noticeColumns} rows={noticeRows} />
                                        <SpeedDialTemplate actions={actions} />
                                        {/* Edge Cards */}
                                        <div style={{ ...styles.edgeCard, ...styles.edgeCardTopLeft }}></div>
                                        <div style={{ ...styles.edgeCard, ...styles.edgeCardTopRight }}></div>
                                        <div style={{ ...styles.edgeCard, ...styles.edgeCardBottomLeft }}></div>
                                        <div style={{ ...styles.edgeCard, ...styles.edgeCardBottomRight }}></div>
                                    </div>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ShowNotices;
