import React, { useEffect, useState } from 'react';
import { BsCalendarCheck } from 'react-icons/bs';
import { SiGooglemeet } from 'react-icons/si';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Button, Container, Grid, TextField, Card, CardContent, Box } from '@mui/material';
import MeetIcon from '../../../assets/images/meet.png'; // Assuming you have an image asset
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/components/shared/DashboardCard';

const MeetHomePage = () => {
    const [roomcode, setRoomcode] = useState('');
    const navigate = useNavigate();

  

    const handleInitiateMeeting = () => {
        const generatedRoomCode = Math.random().toString(36).substring(7); 
        setRoomcode(generatedRoomCode);
        navigate(`/communication/meetRoom/${generatedRoomCode}`);

    
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
        window.location.replace(roomcode); 
    };

    return (
        <PageContainer title="Meet page" description="This is Meet page">
            <DashboardCard>
                <Container>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} md={5}>
                            <Typography variant="h4">Teamsync Meet</Typography>
                        </Grid>
                        <Grid item xs={12} md={5} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <div style={{ fontSize: "1.5em", paddingRight: "20px" }}>
                                <BsCalendarCheck />
                            </div>
                            <div style={{ fontSize: "1.5em" }}>
                                <SiGooglemeet />
                            </div>
                        </Grid>
                    </Grid>

                    <Box my={4}>
                        <Card variant="outlined">
                            <CardContent>
                                <Grid container spacing={3} alignItems="center">
                                    <Grid item xs={12} md={6}>
                                        <img src={MeetIcon} alt="Meet Icon" style={{ width: "100%" }} />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="h5">Premium Video Meetings</Typography>
                                        <hr />
                                        <Typography variant="subtitle1">Now available and free for this space members</Typography>
                                        <Typography variant="body2">Communicate, Collaborate, and send feedbacks wherever you are with Teamsync Meet</Typography>

                                        <Box mt={3}>
                                            <form onSubmit={handleSubmit}>
                                                <TextField
                                                    variant="outlined"
                                                    fullWidth
                                                    placeholder="Enter room code"
                                                    value={roomcode}
                                                    onChange={(e) => setRoomcode(e.target.value)}
                                                />
                                                <Box mt={2} textAlign="right">
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={handleInitiateMeeting} 
                                                    >
                                                        Initiate Zoom Call
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        style={{ marginLeft: "10px" }}
                                                        onClick={() => navigate(-1)}
                                                    >
                                                        Leave
                                                    </Button>
                                                </Box>
                                            </form>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Box>
                </Container>
            </DashboardCard>
        </PageContainer>
    );
};

export default MeetHomePage;
