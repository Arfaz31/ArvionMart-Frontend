/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Card,
  CardContent,
  Rating,
  Avatar,
  Button,
  TextField,
  Stack,
  Alert,
  CircularProgress,
  Grid,
  IconButton,
} from "@mui/material";
import { Person, Edit, Delete } from "@mui/icons-material";
import {
  useGetReviewsByProductQuery,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} from "@/redux/api/reviewApi";
import { useAppSelector } from "@/redux/hook";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-tabpanel-${index}`}
      aria-labelledby={`product-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: { xs: 2, sm: 3 } }}>{children}</Box>}
    </div>
  );
}

interface IProps {
  product: any;
}

export default function ProductTabs({ product }: IProps) {
  const [value, setValue] = useState(0);
  const [editingReview, setEditingReview] = useState<string | null>(null);
  const [editReviewData, setEditReviewData] = useState({
    rating: 0,
    comment: "",
  });

  // Get current user from Redux store
  const user = useAppSelector((state: any) => state.auth.user);

  const productId = product?._id?.toString?.() || "";

  const {
    data: responseData,
    isLoading: reviewsLoading,
    error: reviewsError,
    refetch: refetchReviews,
  } = useGetReviewsByProductQuery(productId, {
    skip: !productId,
  });

  const reviews = responseData?.data || [];

  const [updateReview, { isLoading: updateLoading }] =
    useUpdateReviewMutation();
  const [deleteReview, { isLoading: deleteLoading }] =
    useDeleteReviewMutation();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleUpdateReview = async (reviewId: string) => {
    if (editReviewData.rating === 0 || !editReviewData.comment.trim()) {
      alert("Please provide rating and comment");
      return;
    }

    try {
      await updateReview({
        reviewId,
        payload: {
          rating: editReviewData.rating,
          comment: editReviewData.comment,
        },
      }).unwrap();

      setEditingReview(null);
      setEditReviewData({ rating: 0, comment: "" });
      refetchReviews();
    } catch (error) {
      console.error("Error updating review:", error);
      alert("Error updating review. Please try again.");
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await deleteReview(reviewId).unwrap();
        refetchReviews();
      } catch (error) {
        console.error("Error deleting review:", error);
        alert("Error deleting review. Please try again.");
      }
    }
  };

  const startEditReview = (review: any) => {
    setEditingReview(review._id);
    setEditReviewData({
      rating: review.rating,
      comment: review.comment,
    });
  };

  const cancelEdit = () => {
    setEditingReview(null);
    setEditReviewData({ rating: 0, comment: "" });
  };

  // Calculate average rating
  const calculateAverageRating = () => {
    if (!reviews || reviews.length === 0) return 0;
    return (
      reviews.reduce((sum: number, review: any) => sum + review.rating, 0) /
      reviews.length
    );
  };

  const averageRating = calculateAverageRating();

  return (
    <Box sx={{ width: "100%", mt: 4 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Description" />
          <Tab label="Specifications" />
          <Tab label={`Reviews (${reviews?.length || 0})`} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        {/* Product Description */}
        <Typography variant="body1" sx={{ lineHeight: 1.6, mb: 2 }}>
          {product.description}
        </Typography>

        {/* Product Features (bullet list) */}
        {product?.variant?.[0]?.features?.length > 0 && (
          <Box component="ul" sx={{ pl: 2 }}>
            {product.variant[0].features.map(
              (feature: string, index: number) => (
                <li key={index}>
                  <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                    {feature}
                  </Typography>
                </li>
              )
            )}
          </Box>
        )}
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="h6" gutterBottom>
              Product Details
            </Typography>
            <Stack spacing={1}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">
                  SKU:
                </Typography>
                <Typography variant="body2">{product.sku}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">
                  Stock:
                </Typography>
                <Typography variant="body2">{product.stock}</Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <Box>
          {/* Rating Summary */}
          {reviews.length > 0 && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <Typography variant="h4">
                    {averageRating.toFixed(1)}
                  </Typography>
                  <Box>
                    <Rating
                      value={averageRating}
                      precision={0.1}
                      readOnly
                      size="large"
                    />
                    <Typography variant="body2" color="text.secondary">
                      Based on {reviews.length} reviews
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          )}

          {/* Reviews List */}
          {reviewsLoading ? (
            <Box display="flex" justifyContent="center" p={3}>
              <CircularProgress />
            </Box>
          ) : reviewsError ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              Error loading reviews. Please try again.
            </Alert>
          ) : reviews.length === 0 ? (
            <Box textAlign="center" py={4}>
              <Typography variant="body1" color="text.secondary">
                No reviews yet for this product.
              </Typography>
            </Box>
          ) : (
            <Stack spacing={2}>
              {reviews.map((review: any) => (
                <Card key={review._id} variant="outlined">
                  <CardContent>
                    {editingReview === review._id ? (
                      // Edit Mode
                      <Stack spacing={2}>
                        <Rating
                          value={editReviewData.rating}
                          onChange={(event, newValue) => {
                            setEditReviewData((prev) => ({
                              ...prev,
                              rating: newValue || 0,
                            }));
                          }}
                        />
                        <TextField
                          multiline
                          rows={3}
                          fullWidth
                          value={editReviewData.comment}
                          onChange={(e) =>
                            setEditReviewData((prev) => ({
                              ...prev,
                              comment: e.target.value,
                            }))
                          }
                        />
                        <Box display="flex" gap={1}>
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => handleUpdateReview(review._id)}
                            disabled={updateLoading}
                          >
                            {updateLoading ? "Updating..." : "Update"}
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={cancelEdit}
                          >
                            Cancel
                          </Button>
                        </Box>
                      </Stack>
                    ) : (
                      // View Mode
                      <>
                        <Box
                          display="flex"
                          alignItems="flex-start"
                          justifyContent="space-between"
                          mb={2}
                        >
                          <Box display="flex" alignItems="center" gap={2}>
                            <Avatar sx={{ width: 40, height: 40 }}>
                              <Person />
                            </Avatar>
                            <Box>
                              <Typography variant="subtitle2">
                                {review.customerId?.name || "Anonymous"}
                              </Typography>
                              <Box display="flex" alignItems="center" gap={1}>
                                <Rating
                                  value={review.rating}
                                  readOnly
                                  size="small"
                                />
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  {new Date(
                                    review.reviewDate
                                  ).toLocaleDateString()}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>

                          {user?._id === review.customerId?._id && (
                            <Box display="flex" gap={1}>
                              <IconButton
                                size="small"
                                onClick={() => startEditReview(review)}
                              >
                                <Edit fontSize="small" />
                              </IconButton>
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleDeleteReview(review._id)}
                                disabled={deleteLoading}
                              >
                                <Delete fontSize="small" />
                              </IconButton>
                            </Box>
                          )}
                        </Box>

                        <Typography variant="body2">
                          {review.comment}
                        </Typography>
                      </>
                    )}
                  </CardContent>
                </Card>
              ))}
            </Stack>
          )}
        </Box>
      </TabPanel>
    </Box>
  );
}
