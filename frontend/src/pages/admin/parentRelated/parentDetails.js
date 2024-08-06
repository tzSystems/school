import React, { useEffect } from 'react';
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

const ParentDetails = () => {
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
                            <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
                                Back
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            )}
        </Container>
    );
};

export default ParentDetails;
