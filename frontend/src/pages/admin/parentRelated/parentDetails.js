import React, { useEffect, useState } from 'react';
import { getParentDetails } from '../../../redux/parentRelated/parentHandle';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
    Container, Typography, Card, CardContent, List, ListItem, 
    ListItemText, ListItemIcon, CircularProgress, Box, Button 
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import ChatIcon from '@mui/icons-material/Chat';
import ChatViewer from '../../../components/ChatViewer';

const ParentDetails = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { loading, parentDetails, error } = useSelector((state) => state.parent);

    const parentID = params.id;

    useEffect(() => {
        dispatch(getParentDetails(parentID));
    }, [dispatch, parentID]);

    if (error) {
        console.log(error);
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Card>
                    <CardContent>
                        <Typography variant="h4" align="center" gutterBottom>
                            Parent Details
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText primary="Parent Name" secondary={parentDetails?.name} />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <EmailIcon />
                                </ListItemIcon>
                                <ListItemText primary="Email" secondary={parentDetails?.email} />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <PhoneIcon />
                                </ListItemIcon>
                                <ListItemText primary="Phone Number" secondary={parentDetails?.phone} />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <ChildCareIcon />
                                </ListItemIcon>
                                <ListItemText 
                                    primary="Children" 
                                    secondary={
                                        parentDetails?.children?.length > 0 ? (
                                            parentDetails.children.map((child) => (
                                                <Typography key={child._id} variant="body2">
                                                    {child.name} - Class: {child.className}
                                                </Typography>
                                            ))
                                        ) : (
                                            "No children"
                                        )
                                    } 
                                />
                            </ListItem>
                        </List>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={() => navigate(-1)}
                                sx={{ mr: 2 }}
                            >
                                Back
                            </Button>
                            <Button 
                                variant="contained" 
                                color="secondary" 
                                onClick={() => setIsChatOpen(true)}
                                startIcon={<ChatIcon />}
                            >
                                Message
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            )}

            {isChatOpen && parentDetails && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 1300, // Ensures it's above other content
                        width: '90%',
                        maxWidth: '500px',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2
                    }}
                >
                    <ChatViewer 
                        recipientName={parentDetails.name} 
                        recipientId={parentDetails._id} 
                        recipientRole='Parent'
                    />
                </Box>
            )}
        </Container>
    );
};

export default ParentDetails;
