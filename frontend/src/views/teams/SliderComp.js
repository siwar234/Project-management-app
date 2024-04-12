import { useEffect, useState } from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
  Box,
  TextField,
  Button,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEquipes, fetchEquipesbyId } from '../../JS/actions/equipe';
import image1 from '../../assets/images/2717003.jpg';
import Avatar from '@mui/material/Avatar';
import image2 from '../../assets/images/portrait.jpg';
import image3 from '../../assets/images/womenavatar.png';
import AvatarGroup from '@mui/material/AvatarGroup';
export const SliderComp = ({ searchQuery, handlecreate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();

  const equipes = useSelector((state) => state.equipeReducer.equipes);

  const handleOpen = (equipeId) => {
    if (equipeId) {
      window.location.href = `/team/equipe/${equipeId}`;
    } else {
      console.log('Equipe ID is not provided');
    }
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === equipes.length - 1 ? 0 : prevIndex + 1));
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? equipes.length - 1 : prevIndex - 1));
  };

  const user = useSelector((state) => state.userReducer.user);
  const firstName = user.firstName;
  useEffect(() => {
    dispatch(fetchEquipes(user._id));
  }, [dispatch]);

  return (
    <>
      <div
        className="container"
        style={{ height: '200px', display: 'flex', justifyContent: 'left', position: 'relative' }}
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
          <Card
            sx={{
              width: '180px',
              minWidth: '200px',
              height: '220px',
              margin: '0 8px',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.09)',
              },
            }}
          >
            {' '}
            <CardActionArea>
              <CardMedia
                sx={{
                  height: '100px',
                  backgroundImage: 'linear-gradient(to right, #abcef3, #dcf9ff)',
                  display: 'flex',
                }}
              >
                {' '}
                <AvatarGroup
                  style={{ justifyContent: 'center', alignItems: 'center', marginLeft: '50px' }}
                  max={3}
                >
                  <Avatar
                    src={user?.profilePicture}
                    sx={{
                      bgcolor: '#42a5f5',
                      width: '35px',
                      height: '35px',
                      fontSize: '15px',
                      alignItems: 'center',
                    }}
                  >
                    {user?.firstName && user?.firstName.substring(0, 2).toUpperCase()}
                  </Avatar>
                  <Avatar
                    src={image2}
                    sx={{
                      width: '35px',
                      height: '35px',
                      alignItems: 'center',
                    }}
                  ></Avatar>
                  <Avatar
                    src={image3}
                    sx={{
                      bgcolor: '#fff',
                      width: '35px',
                      height: '35px',
                      alignItems: 'center',
                    }}
                  ></Avatar>
                </AvatarGroup>
              </CardMedia>
              <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                  gutterBottom
                  style={{ fontSize: '15px', color: '#555555', justifyContent: 'center' }}
                >
                  {' '}
                  Your new team !{' '}
                </Typography>
                <br />
                <Button
                  variant="contained"
                  style={{
                    marginLeft: '10px',
                    fontWeight: 'bold',

                    fontSize: '12px',
                    width: '134px',
                    backgroundColor: '#e1dfdf',
                    color: 'rgb(39 22 22 / 84%)',
                    border: 'none',
                  }}
                  onClick={handlecreate}
                >
                  Create a Team
                </Button>
              </CardContent>
            </CardActionArea>
          </Card>
          {equipes
            .filter((equipe) => equipe.NameEquipe.toLowerCase().includes(searchQuery))
            .map((equipe) => (
              <Card
                onClick={() => handleOpen(equipe._id)}
                key={equipe._id}
                sx={{ width: '220px', minWidth: '200px', height: '220px', margin: '0 8px' ,transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.09)', 
                }, }}
              >
                <CardActionArea>
                  <CardMedia component="img" height="100" image={image1} alt="green iguana" />
                  <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography
                      gutterBottom
                      component="div"
                      style={{
                        size: '20px',
                        fontWeight: '100px',
                        color: '#555555',
                        justifyContent: 'center',
                      }}
                    >
                      {equipe.NameEquipe}
                    </Typography>
                    <br />

                    <AvatarGroup max={4} style={{ justifyContent: 'center' }}>
                      <Tooltip
                        className="customtooltip"
                        style={{ backgroundColor: '#42a5f5' }}
                        title={equipe.owner.firstName}
                      >
                        <Avatar
                          style={{
                            fontSize: '15px',
                            justifyContent: 'center',
                            width: '35px',
                            height: '35px',
                            backgroundColor: '#42a5f5',
                          }}
                          alt={equipe.owner.firstName}
                          src={equipe.owner.profilePicture || undefined}
                        >
                          {!equipe.owner.profilePicture &&
                            equipe.owner.firstName.substring(0, 2).toUpperCase()}
                        </Avatar>
                      </Tooltip>

                      {equipe.members.map((member) => (
                        <Tooltip
                          className="customtooltip"
                          key={member.memberId._id}
                          style={{ opacity: 0.9 }}
                          title={member.memberId.firstName}
                        >
                          <Avatar
                            style={{
                              fontSize: '15px',
                              justifyContent: 'center',
                              width: '35px',
                              height: '35px',
                            }}
                            alt={member.memberId.firstName}
                            src={member.memberId.profilePicture}
                          >
                            {!member.memberId.profilePicture &&
                              member.memberId.firstName.substring(0, 2).toUpperCase()}{' '}
                          </Avatar>
                        </Tooltip>
                      ))}
                    </AvatarGroup>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
        </div>
        <IconButton
          onClick={goToPrevSlide}
          style={{ position: 'absolute', top: '50%', left: '-50px', transform: 'translateY(-50%)' }}
        >
          <ChevronLeft />
        </IconButton>
        <IconButton
        onClick={goToNextSlide}
        style={{
          position: 'absolute',
          bottom: '30%',
          right: '-350px',
          transform: 'translateY(-50%)',
        }}
      >
        <ChevronRight />
      </IconButton>
      </div>
      

      {/* <EquipeDetails ouvrir={ouvrir} handleClosee={close} /> */}
    </>
  );
};
