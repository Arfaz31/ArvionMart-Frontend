/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ReuseableForm from "@/Component/Forms/ReuseableForm";
import ReuseableInput from "@/Component/Forms/ReuseableInput";
import { loginSchema } from "@/schema/auth.schemas";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";

import { useLoginMutation } from "@/redux/api/authApi";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { setUser } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import { setTokenInCookies } from "@/Services/authServices";
import { verifyToken } from "@/utils/verifyToken";
import { useAppDispatch } from "@/redux/hook";

const defaultValues = {
  email: "mdhasan.ru.ro@gmail.com",
  password: "admin123",
};

const LoginPage = () => {
  const [loginUser, { isLoading: loginLoading }] = useLoginMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleRegister = async (values: FieldValues) => {
    try {
      const res = await loginUser(values).unwrap();
      console.log(res);
      if (res?.statusCode) {
        toast.success(res?.message);

        if (res?.data?.accessToken) {
          const user = verifyToken(res?.data?.accessToken);
          dispatch(setUser(user));
          await setTokenInCookies(res?.data?.accessToken);
          router.push("/admin");
        }
      }
    } catch (err: any) {
      console.error(err.message);
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
              Login
            </Typography>
          </Stack>
          <Box>
            <ReuseableForm
              onSubmit={handleRegister}
              resolver={zodResolver(loginSchema)}
              defaultValues={defaultValues}
            >
              <Grid container spacing={2} my={4}>
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
              </Grid>
              <Button
                sx={{
                  margin: "10px 0px",
                }}
                fullWidth={true}
                type="submit"
              >
                {loginLoading ? <h1>Loading</h1> : "Login"}
              </Button>
              <Typography component="p" fontWeight={300}>
                Don&apos;t have an account?{" "}
                <Link href="/register">Register</Link>
              </Typography>
            </ReuseableForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
