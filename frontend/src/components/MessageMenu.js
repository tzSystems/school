import React, { useState } from 'react';
import { Box, Badge, Menu, MenuItem, IconButton, Tooltip } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const MessageMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (path) => {
        navigate(path); // Navigate to the specified path
        handleClose(); // Close the menu
    };

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Messages">
                    <IconButton
                        onClick={() => handleMenuItemClick('/chatlist')}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'message-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Badge badgeContent={4} color="secondary" >
                            <MailIcon />
                        </Badge>
                    </IconButton>
                </Tooltip>
            </Box>
            
        </>
    );
};

export default MessageMenu;

const styles = {
    styledPaper: {
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        mt: 1.5,
        '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
        },
    }
};
