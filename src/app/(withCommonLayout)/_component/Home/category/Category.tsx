/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useGetCategoriesQuery } from "@/redux/api/categoryApi";
import { Box, Container, Typography } from "@mui/material";
import LoadingForCategory from "./LoadingForCategory";
import Image from "next/image";

const Category = () => {
  const { data: category, isLoading } = useGetCategoriesQuery("");

  return (
    <Box
      sx={{
        marginTop: { lg: "100px", xs: "50px" },
        paddingBottom: { lg: "100px", xs: "150px" },
      }}
    >
      <Container>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "40px",
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 700,
              position: "relative",
            }}
          >
            Shop By Categories
          </Typography>
        </Box>

        {isLoading ? (
          <LoadingForCategory />
        ) : (
          <Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  lg: "repeat(3, 1fr)",
                  xs: "repeat(2, 1fr)",
                },
                gap: { lg: 4, xs: 2 },
              }}
            >
              {category?.data?.slice(0, 6)?.map((categoryData: any) => (
                <Box
                  key={categoryData._id}
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "10px",
                    cursor: "pointer",
                    height: { lg: "250px", xs: "200px" },
                    "&:hover img": {
                      transform: "scale(1.1)",
                      transition: "transform 0.3s ease",
                    },
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Image
                    src={categoryData.imageUrl}
                    alt={categoryData.categoryName}
                    fill
                    style={{
                      objectFit: "cover",
                      transition: "transform 0.3s ease",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: "10%",
                      left: "10%",
                      right: "10%",
                      backgroundColor: "rgba(0,0,0,0.6)",
                      padding: "8px 12px",
                      borderRadius: "30px",
                      backdropFilter: "blur(5px)",
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { lg: "18px", xs: "14px" },
                        color: "white",
                        fontWeight: "bold",
                        textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                        lineHeight: 1.2,
                      }}
                    >
                      {categoryData.categoryName}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Category;
