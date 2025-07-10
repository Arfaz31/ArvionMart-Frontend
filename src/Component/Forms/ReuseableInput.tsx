import { SxProps, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  name: string;
  label?: string;
  type?: string;
  size?: "small" | "medium";
  fullWidth?: boolean;
  sx?: SxProps;
  placeholder?: string;
  required?: boolean;
  endAdornment?: React.ReactNode; // Add this to the main type
  rows?: number;
  multiline?: boolean;
};

const ReuseableInput = ({
  name,
  label,
  type = "text",
  size = "small",
  fullWidth,
  sx,
  required,
  endAdornment, // Add this to destructured props
  rows,
  multiline,
}: TInputProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field} //register, onChange, onBlur etc
          sx={{ ...sx }}
          label={label}
          type={type}
          variant="outlined"
          size={size}
          fullWidth={fullWidth}
          placeholder={label}
          required={required}
          error={!!error?.message}
          rows={rows}
          multiline={multiline}
          helperText={error?.message}
          slotProps={{
            input: {
              endAdornment: endAdornment,
            },
          }}
        />
      )}
    />
  );
};

export default ReuseableInput;
