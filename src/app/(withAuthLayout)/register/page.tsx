/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ReuseableForm from "@/Component/Forms/ReuseableForm";
import ReuseableInput from "@/Component/Forms/ReuseableInput";
import { registerSchema } from "@/schema/auth.schemas";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useLoginMutation, useRegisterMutation } from "@/redux/api/authApi";
import { FieldValues } from "react-hook-form";

import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import Loading from "@/Component/Loading/Loading";
import { toast } from "sonner";
import { setUser } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";
import { setTokenInCookies } from "@/Services/authServices";
import logo from "@/assests/logo/logo-arvion2.gif";
import Image from "next/image";
import google from "@/assests/icon/google.png";
import { useAppDispatch } from "@/redux/hook";

export const defaultValues = {
  password: "",
  fullName: "",
  email: "",
  contactNumber: "",
  address: "",
};

const RegisterPage = () => {
  const [registerUser, { isLoading }] = useRegisterMutation();
  const [loginUser] = useLoginMutation();

  const router = useRouter();
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);
  // const [googleLoading, setGoogleLoading] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleGoogleLogin = async () => {
    try {
      // setGoogleLoading(true);
      await signIn("google", {
        callbackUrl: "http://localhost:3000",
      });
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast.error("Google sign-in failed. Please try again.");
    }
    //  finally {
    //   setGoogleLoading(false);
    // }
  };

  const handleRegister = async (values: FieldValues) => {
    const registerInfo = {
      password: values.password,
      customers: {
        fullName: values.fullName,
        email: values.email,
        contactNumber: values.contactNumber,
        address: values.address,
      },
    };

    try {
      const res = await registerUser(registerInfo).unwrap();

      if (res?.data?.accessToken) {
        // Login after registration
        const result = await loginUser({
          password: values.password,
          email: values.email,
        }).unwrap();
        dispatch(
          setUser({
            user: result?.data?.user,
            token: res?.data?.accessToken,
          })
        );
        await setTokenInCookies(result.accessToken, result.refreshToken);
        router.push("/");
        toast.success("Registration successful!");
      }
    } catch (err: any) {
      console.log("err", err);

      const errorMessage = err?.data?.message || "Registration failed";
      toast.error(errorMessage);
      console.error("Registration error:", err);
    }
  };

  return (
    <Container>
      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            maxWidth: 600,
            width: "100%",
            boxShadow: 1,
            borderRadius: 1,
            p: 4,
            textAlign: "center",
          }}
        >
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
              mb: 2, // Reduced from mb: 3
            }}
          >
            <Link
              href="/"
              style={{
                width: 250,
                height: 100,
                position: "relative",
                marginBottom: 0.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src={logo}
                alt="Arvion Mart Logo"
                fill
                style={{
                  objectFit: "contain",
                }}
                priority
              />
            </Link>
            <Typography variant="h6" fontWeight={600}>
              Register
            </Typography>
          </Stack>

          {/* Google Authentication Button */}
          <Button
            variant="outlined"
            fullWidth
            onClick={handleGoogleLogin}
            // disabled={googleLoading}
            sx={{
              mb: 3,
              py: 1.5,
              borderColor: "#dadce0",
              color: "#3c4043",
              backgroundColor: "#fff",
              textTransform: "none",
              fontSize: "14px",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              "&:hover": {
                backgroundColor: "#f8f9fa",
                borderColor: "#dadce0",
                boxShadow:
                  "0 1px 2px 0 rgba(60,64,67,.30), 0 2px 6px 2px rgba(60,64,67,.15)",
              },
              "&:active": {
                backgroundColor: "#f1f3f4",
              },
              "&:disabled": {
                backgroundColor: "#f8f9fa",
                borderColor: "#dadce0",
                color: "#9aa0a6",
              },
            }}
          >
            {/* {googleLoading ? (
              <Loading />
            ) : (
              <>
                <Image
                  src={google}
                  alt="Google"
                  width={20}
                  height={20}
                  style={{
                    objectFit: "contain",
                  }}
                />
                Sign up with Google
              </>
            )} */}
            <Image
              src={google}
              alt="Google"
              width={20}
              height={20}
              style={{
                objectFit: "contain",
              }}
            />
            Sign up with Google
          </Button>

          {/* Divider */}
          <Box sx={{ my: 3 }}>
            <Divider>
              <Typography variant="body2" color="text.secondary" sx={{ px: 2 }}>
                or continue with email
              </Typography>
            </Divider>
          </Box>

          <Box>
            <ReuseableForm
              onSubmit={handleRegister}
              resolver={zodResolver(registerSchema)}
              defaultValues={defaultValues}
            >
              <Grid container spacing={2} my={4}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <ReuseableInput
                    label="Name"
                    fullWidth={true}
                    name="fullName"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <ReuseableInput
                    label="Email"
                    type="email"
                    fullWidth={true}
                    name="email"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <ReuseableInput
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    fullWidth={true}
                    name="password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <ReuseableInput
                    label="Contact Number"
                    type="tel"
                    fullWidth={true}
                    name="contactNumber"
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 12 }}>
                  <ReuseableInput
                    label="Address"
                    fullWidth={true}
                    name="address"
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                sx={{
                  margin: "10px 0px",
                  py: 1.5,
                  textTransform: "none",
                  fontSize: "16px",
                  fontWeight: 600,
                  background:
                    "linear-gradient(135deg, #1565c0 0%, #5648d6 100%)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #0d47a1 0%, #4527a0 100%)",
                    boxShadow: "0 4px 12px rgba(86, 72, 214, 0.3)",
                  },
                }}
                fullWidth={true}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? <Loading /> : "Register"}
              </Button>
              <Typography component="p" fontWeight={300}>
                Do you already have an account?{" "}
                <Link
                  href="/login"
                  style={{ color: "#1565c0", textDecoration: "none" }}
                >
                  Login
                </Link>
              </Typography>
            </ReuseableForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterPage;
