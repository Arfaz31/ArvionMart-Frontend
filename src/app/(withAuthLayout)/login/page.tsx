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
import Loading from "@/Component/Loading/Loading";
import logo from "@/assests/logo/logo-arvion2.gif";
import Image from "next/image";

const defaultValues = {
  email: "hasan1@gamil.com",
  password: "123456",
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

      if (res?.data?.accessToken) {
        const user = verifyToken(res?.data?.accessToken);
        dispatch(
          setUser({
            user,
            token: res?.data?.accessToken,
          })
        );
        await setTokenInCookies(
          res?.data?.accessToken,
          res?.data?.refreshToken
        );
        router.push("/");
        toast.success(res?.message);
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data || "Something went wrong!");
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
              mb: 3,
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
              Login
            </Typography>
          </Stack>

          <Box>
            <ReuseableForm
              onSubmit={handleRegister}
              resolver={zodResolver(loginSchema)}
              defaultValues={defaultValues}
            >
              <Grid container spacing={2} my={2}>
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
                disabled={loginLoading}
              >
                {loginLoading ? <Loading /> : "Login"}
              </Button>
              <Typography component="p" fontWeight={300}>
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  style={{ color: "#1565c0", textDecoration: "none" }}
                >
                  Register
                </Link>
              </Typography>
            </ReuseableForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
