

import React, { useEffect } from 'react';
import { getParentDetails } from '../../../redux/parentRelated/parentHandle'; // Make sure to update the path according to your project structure
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Typography } from '@mui/material';

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
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <Container>
                    <Typography variant="h4" align="center" gutterBottom>
                        Parent Details
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Parent Name: {parentDetails?.name}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Email: {parentDetails?.email}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Phone Number: {parentDetails?.phone}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Children:
                    </Typography>
                    <ul>
                        {parentDetails?.children?.map((child) => (
                            <li key={child._id}>{child.name} - Class: {child.className}</li>
                        ))}
                    </ul>
                    {/* Add any additional details you want to display */}
                </Container>
            )}
        </>
    );
};

export default ParentDetails;
