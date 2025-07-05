/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ReuseableForm from "@/Component/Forms/ReuseableForm";
import ReuseableInput from "@/Component/Forms/ReuseableInput";
import { registerSchema } from "@/schema/auth.schemas";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation, useRegisterMutation } from "@/redux/api/authApi";
import { FieldValues } from "react-hook-form";

import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import Loading from "@/Component/Loading/Loading";
import { toast } from "sonner";
import { setUser } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";

export const defaultValues = {
  password: "",
  fullName: "",
  email: "",
  contactNumber: "",
  emergencyContact: "",
  address: "",
};

const RegisterPage = () => {
  const [registerUser, { isLoading }] = useRegisterMutation();
  const [loginUser] = useLoginMutation();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleRegister = async (values: FieldValues) => {
    const registerInfo = {
      password: values.password,
      customers: {
        fullName: values.fullName,
        email: values.email,
        contactNumber: values.contactNumber,
        emergencyContact: values.emergencyContact,
        address: values.address,
      },
    };
    // console.log(registerInfo);

    try {
      await registerUser(registerInfo).unwrap();
      toast.success("Registration successful!");

      // Login after registration
      const result = await loginUser({
        password: values.password,
        email: values.email,
      }).unwrap();

      setUser({ accessToken: result.accessToken });
      router.push("/");
    } catch (err: any) {
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
            }}
          >
            <Typography variant="h6" fontWeight={600}>
              Register
            </Typography>
          </Stack>
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
                <Grid size={{ xs: 12, md: 6 }}>
                  <ReuseableInput
                    label="Emergency Contact"
                    type="tel"
                    fullWidth={true}
                    name="emergencyContact"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <ReuseableInput
                    label="Address"
                    fullWidth={true}
                    name="address"
                  />
                </Grid>
              </Grid>
              <Button
                sx={{
                  margin: "10px 0px",
                }}
                fullWidth={true}
                type="submit"
              >
                {isLoading ? <Loading /> : "Register"}
              </Button>
              <Typography component="p" fontWeight={300}>
                Do you already have an account? <Link href="/login">Login</Link>
              </Typography>
            </ReuseableForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterPage;
