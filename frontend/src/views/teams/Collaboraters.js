import { useEffect, useState } from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEquipes, fetchEquipesbyId } from '../../JS/actions/equipe';

import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';

const Collaboraters = ({ searchQuery }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.userReducer.user);
  const userId = user._id;

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === user.length - 1 ? 0 : prevIndex + 1));
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? user.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    dispatch(fetchEquipes(userId));
  }, [dispatch, userId]);

  const equipeuser = user?.equipes || [];

  useEffect(() => {
    equipeuser.forEach((equipeId) => {
      dispatch(fetchEquipesbyId(equipeId));
    });
  }, [dispatch, equipeuser]);

  const equipes = useSelector((state) => state.equipeReducer.equipes);

  return (
    <>
      <div
        className="container"
        style={{
          height: '200px',
          display: 'flex',
          justifyContent: 'left',
          marginLeft: '50px',
          position: 'relative',
          marginTop: '20px',
        }}
      >
        <div
          className="wrapper"
          style={{
            display: 'flex',
            flexDirection: 'row',
            transform: `translateX(-${currentIndex * 310}px)`,
            transition: 'transform 0.3s ease',
          }}
        >
          {equipes.map((equipe) =>
            equipe.members
              .filter((member) => member.memberId._id !== userId && member.memberId.firstName.toLowerCase().includes(searchQuery))
              .map((member) => (
                <Card
                  key={member.memberId._id}
                  sx={{
                    width: '150px',
                    minWidth: '50px',
                    margin: '0 5px',
                    height: '180px',
                    opacity: '250%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.09)',
                    },
                  }}
                >
                  <CardActionArea onClick={() => navigate(`/equipe/${equipe._id}`)}>
                    <CardMedia>
                      <Avatar src={member.memberId.profilePicture} sx={{ fontSize: '23px', bgcolor: '#42a5f5', width: '70px', height: '70px' }} style={{ margin: 'auto' }}>
                        {member.memberId.firstName.substring(0, 2).toUpperCase()}
                      </Avatar>
                    </CardMedia>
                    <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                      <Typography gutterBottom style={{ fontSize: '13px',fontWeight:"500",fontFamily:"sans-serif", color: '#555555', justifyContent: 'center',alignItems: 'center' }}>
                        {member.memberId.firstName}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))
          )}
        </div>
        <IconButton
          onClick={goToPrevSlide}
          style={{ position: 'absolute', top: '50%', left: '-50px', transform: 'translateY(-50%)' }}
        >
          <ChevronLeft />
        </IconButton>
        <IconButton
          onClick={goToNextSlide}
          style={{ position: 'absolute', top: '43%', right: '15px', transform: 'translateY(-50%)' }}
        >
          <ChevronRight />
        </IconButton>
      </div>
    </>
  );
};

export default Collaboraters;
