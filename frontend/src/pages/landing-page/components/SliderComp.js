import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FiArrowRightCircle, FiArrowLeftCircle } from "react-icons/fi";
import { useResponsive } from "./useResponsive";
import { useRef } from "react";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";

export const SliderComp = ({
  data,
  label,
  heading,
  subheading,
  slideNum,
  autoplay,
  autoplaySpeed,
}) => {
  const { screenType } = useResponsive();
  const sliderRef = useRef();

  const settings = {
    arrows: false,
    dots: true,
    swipeToSlide: true,
    infinite: true,
    autoplay: autoplay,
    autoplaySpeed: autoplaySpeed,
    slidesToShow: screenType === "MOBILE" ? 2 : slideNum,
    slidesToScroll: screenType === "MOBILE" ? 2 : slideNum,
  };

  return (
    <>
      <div className="container" style={{ height: "500px" }}>
        <div className="wrapper">
          {screenType !== "MOBILE" && (
            <div onClick={() => sliderRef.current.slickPrev()} className="prev">
              <FiArrowLeftCircle style={{ fontSize: 24 }} />
            </div>
          )}

          <Slider
            {...settings}
            ref={sliderRef}
            loop={true}
            // effect="coverflow"
            // coverflowEffect={{ rotate: 0, depth: 100, modifier: 1 }}
            // grabCursor={true}
            // centeredSlides={true}
          >
            {" "}
            {data?.length > 0 &&
              data?.map((item, index) => (
                <Card sx={{ maxWidth: 550, height: 480 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="280"
                      image={item.image}
                      alt="green iguana"
                    />
                    <CardContent >
                      <Typography gutterBottom variant="h5" component="div">
                        {item.title}
                      </Typography>
                      <br></br>
                      <Typography variant="body2" color="text.secondary" style={{fontSize:"17px"}}
                      xs={{fontSize:"12px"}}>
                        Lizards are a widespread group of squamate reptiles,
                        with over 6,000 species, ranging across all continents
                        except Antarctica.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
          </Slider>
          {screenType !== "MOBILE" && (
            <div onClick={() => sliderRef.current.slickNext()} className="next">
              <FiArrowRightCircle style={{ fontSize: 24 }} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
