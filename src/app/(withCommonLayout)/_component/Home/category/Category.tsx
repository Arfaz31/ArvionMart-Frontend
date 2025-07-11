"use client";

import { useGetCategoriesQuery } from "@/redux/api/categoryApi";
import { Box, Container, Typography } from "@mui/material";
import LoadingForCategory from "./LoadingForCategory";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ICategory {
  _id: string;
  categoryName: string;
  imageUrl: string;
}

const Category = () => {
  const { data: category, isLoading, error } = useGetCategoriesQuery("");
  const router = useRouter();

  if (process.env.NODE_ENV === "development") {
    console.log("Fetched Categories:", category);
  }

  return (
    <Box
      sx={{
        marginTop: { lg: "10px", xs: "15px" },
        paddingBottom: { lg: "50px", xs: "50px" },
      }}
    >
      <Container>
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "10px",
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              sx={{
                fontWeight: 700,
                position: "relative",
                fontSize: { xs: "h6", sm: "h5", md: "h4" },
              }}
            >
              Shop By Categories
            </Typography>
          </Box>

          {isLoading ? (
            <LoadingForCategory />
          ) : error || !category?.data?.length ? (
            <Box
              textAlign="center"
              py={4}
              color="text.secondary"
              sx={{
                backgroundColor: "#f5f5f5",
                borderRadius: "12px",
              }}
            >
              No categories available
            </Box>
          ) : (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  lg: "repeat(4, 1fr)",
                  xs: "repeat(2, 1fr)",
                },
                gap: { lg: 4, xs: 2 },
              }}
            >
              {category.data
                .slice(0, 6)
                .map((categoryData: ICategory, index: number) => (
                  <Box
                    key={categoryData._id || index}
                    sx={{
                      position: "relative",
                      // height: "200px", // Removed fixed height
                      aspectRatio: "4 / 3", // Fixed aspect ratio
                      overflow: "hidden",
                      borderRadius: "8px",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      router.push(`/${categoryData.categoryName.toLowerCase()}`)
                    }
                  >
                    <Image
                      src={categoryData.imageUrl || "/placeholder.jpg"}
                      alt={categoryData.categoryName || "Category"}
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
                        {categoryData.categoryName || "Category"}
                      </Typography>
                    </Box>
                  </Box>
                ))}
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Category;
