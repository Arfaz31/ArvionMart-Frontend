/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useGetCategoriesQuery } from "@/redux/api/categoryApi";
import { Box, Container, Divider, Typography } from "@mui/material";
import LoadingForCategory from "./LoadingForCategory";
import Image from "next/image";
import { TrendingUp } from "@mui/icons-material";

const Category = () => {
  const { data: category, isLoading } = useGetCategoriesQuery("");
  // [
  //   {
  //     key: "sort",
  //     value: "createdAt",
  //   },
  // ]

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
          <TrendingUp sx={{ mr: 1, color: "primary.main", fontSize: 28 }} />
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 700,
              position: "relative",
            }}
          >
            Shop By Categories
            <Divider
              sx={{
                width: "40%",
                mt: 1,
                mb: 0,
                borderColor: "primary.main",
                borderWidth: 2,
              }}
            />
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
                  sm: "repeat(2, 1fr)",
                },
                alignItems: "center",
                gap: { lg: 5, xs: 2, sm: 2 },
              }}
            >
              {category?.data?.slice(0, 6)?.map((categoryData: any) => (
                <Box key={categoryData._id}>
                  <Box
                    sx={{
                      position: "relative",
                      overflow: "hidden",
                      borderRadius: "10px",
                      cursor: "pointer",
                      "&:hover img": {
                        transform: "scale(1.1)",
                        transition: "transform 0.3s ease",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        height: { lg: "250px", xs: "100px", sm: "150px" },
                        borderRadius: "10px",
                      }}
                    >
                      <Image
                        src={categoryData.imageUrl}
                        alt={categoryData.categoryName}
                        width={400}
                        height={400}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "10px",
                          objectFit: "cover",
                          transition: "transform 0.3s ease",
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        position: "absolute",
                        top: "35%",
                        right: "10%", // Changed to align to right
                        backgroundColor: "rgba(0,0,0,0.6)",
                        padding: "6px 12px",
                        borderRadius: "30px",
                        backdropFilter: "blur(5px)",
                        textAlign: "right", // Align text to right
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: { lg: "25px", xs: "17px", sm: "20px" },
                          color: "white",
                          fontWeight: "bold",
                          textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                        }}
                      >
                        {categoryData.categoryName}
                      </Typography>
                    </Box>
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
