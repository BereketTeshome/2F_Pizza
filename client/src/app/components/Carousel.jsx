"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Box, Button, Typography } from "@mui/material";
import "../../../CarouselComponent.css"; // Import your CSS file
import Slides from "../../store/Slides";

export default function CarouselComponent() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
        style={{
          borderRadius: "15px",
          overflow: "hidden",
        }}
      >
        {Slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Box
              sx={{
                display: "flex", // Responsive: stack content on smaller screens
                width: "100%", // Adjust height on small screens
                borderRadius: "15px",
                overflow: "hidden",
                backgroundColor: slide.bgColor,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Box
                sx={{
                  padding: 2,
                  padding: { xs: 1, sm: 2, md: 3 }, // Adjust padding based on screen size
                  width: "fit-content",
                  textAlign: "left",
                  color: "#fff",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "1.2rem", sm: "1.8rem", md: "2.5rem" },
                    fontWeight: "bold",
                    lineHeight: "1.2",
                  }}
                >
                  {slide.title}{" "}
                  <span style={{ color: "orange" }}>{slide.highlight}</span>
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" }, // Responsive font size for description
                    my: { xs: 1, sm: 2 }, // Margin adjustments for spacing
                    fontWeight: "lighter",
                  }}
                >
                  {slide.description}
                </Typography>
                <Button
                  variant="contained"
                  color="warning"
                  component="a"
                  href="#popularPizzas"
                  sx={{
                    fontWeight: "bold",
                    width: { xs: "100%", sm: "auto" }, // Full-width button on small screens
                    fontSize: { xs: "0.8rem", sm: "1rem" }, // Full-width button on small screens
                  }}
                >
                  Order Now
                </Button>
              </Box>
              <Box
                sx={{
                  width: { xs: "100%", md: "50%" }, // Image takes full width on small, half on medium
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  component="img"
                  sx={{
                    flex: 2,
                    maxWidth: "300px",
                    ml: { xs: 0, sm: "auto" },
                  }}
                  alt="Pizza Image"
                  src={slide.img}
                />
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
