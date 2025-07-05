import { MenuItem, SxProps, TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface IIteam {
  label: string;
  value: string;
}

interface ITextField {
  name: string;
  size?: "small" | "medium";
  placeholder?: string;
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  sx?: SxProps;
  items: IIteam[];
}

const ReuseableSelectField = ({
  items,
  name,
  label,
  size = "small",
  required,
  fullWidth = true,
  sx,
}: ITextField) => {
  const { control, formState } = useFormContext();
  const isError = formState.errors[name] !== undefined;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          {...field}
          sx={{
            ...sx,
          }}
          size={size}
          select
          label={label}
          required={required}
          fullWidth={fullWidth}
          error={isError}
          helperText={
            isError ? (formState.errors[name]?.message as string) : ""
          }
        >
          {items.map((name) => (
            <MenuItem key={name.value} value={name.value}>
              {name.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};

export default ReuseableSelectField;
