/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { SxProps } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Controller, useFormContext } from "react-hook-form";
import { Box, IconButton } from "@mui/material";
import Image from "next/image";
import CancelIcon from "@mui/icons-material/Cancel";

type TProps = {
  name: string;
  label?: string;
  sx?: SxProps;
  multiple?: boolean;
};

export default function ReuseableFileUploader({
  name,
  label,
  sx,
  multiple = false,
}: TProps) {
  const { control, setValue } = useFormContext();
  const [preview, setPreview] = React.useState<string | string[] | null>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: any
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (multiple) {
      const fileArray = Array.from(files);
      onChange(fileArray);

      // Create previews for multiple files
      const previews = fileArray.map((file) => URL.createObjectURL(file));
      setPreview(previews);
    } else {
      const file = files[0];
      onChange(file);

      // Create preview for single file
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = (index?: number) => {
    if (preview) {
      if (Array.isArray(preview)) {
        if (typeof index === "number") {
          // Remove specific image from multiple previews
          const newPreviews = [...preview];
          URL.revokeObjectURL(newPreviews[index]);
          newPreviews.splice(index, 1);
          setPreview(newPreviews.length > 0 ? newPreviews : null);

          // Update form value
          const currentValue = control._formValues[name] || [];
          const newValue = [...currentValue];
          newValue.splice(index, 1);
          setValue(name, newValue);
        }
      } else {
        // Remove single image
        URL.revokeObjectURL(preview);
        setPreview(null);
        setValue(name, null);
      }
    }
  };

  React.useEffect(() => {
    return () => {
      // Clean up object URLs
      if (preview) {
        if (Array.isArray(preview)) {
          preview.forEach((url) => URL.revokeObjectURL(url));
        } else {
          URL.revokeObjectURL(preview);
        }
      }
    };
  }, [preview]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...field } }) => (
        <Box>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            sx={{ ...sx, mb: 2 }}
          >
            {label || "Upload file"}
            <input
              {...field}
              type="file"
              value={value?.fileName}
              onChange={(e) =>
                handleFileChange(
                  e as React.ChangeEvent<HTMLInputElement>,
                  onChange
                )
              }
              style={{ display: "none" }}
              multiple
            />
          </Button>

          {/* Image preview */}
          {preview && (
            <Box sx={{ mt: 2 }}>
              {Array.isArray(preview) ? (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                  {preview.map((url, index) => (
                    <Box
                      key={index}
                      sx={{
                        position: "relative",
                        display: "inline-block",
                        width: "80px",
                        height: "80px",
                      }}
                    >
                      <Image
                        src={url}
                        alt={`Preview ${index + 1}`}
                        style={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "10px",
                          objectFit: "cover",
                        }}
                        width={80}
                        height={80}
                      />

                      <IconButton
                        sx={{
                          position: "absolute",
                          top: -8,
                          right: -8,
                          backgroundColor: "#fff",
                          padding: "2px",
                          width: "20px",
                          height: "20px",
                          minWidth: "20px",
                          boxShadow: "0px 0px 2px rgba(0,0,0,0.3)",
                          "&:hover": { backgroundColor: "#f5f5f5" },
                        }}
                        onClick={() => handleRemoveImage(index)}
                        size="small"
                      >
                        <CancelIcon color="error" sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Box
                  sx={{
                    position: "relative",
                    display: "inline-block",
                    width: "80px",
                    height: "80px",
                  }}
                >
                  <Image
                    src={preview}
                    alt="Preview"
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "10px",
                      objectFit: "cover",
                    }}
                    width={80}
                    height={80}
                  />
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: -8,
                      right: -8,
                      backgroundColor: "#fff",
                      padding: "2px",
                      width: "20px",
                      height: "20px",
                      minWidth: "20px",
                      boxShadow: "0px 0px 2px rgba(0,0,0,0.3)",
                      "&:hover": { backgroundColor: "#f5f5f5" },
                    }}
                    onClick={() => handleRemoveImage()}
                    size="small"
                  >
                    <CancelIcon color="error" sx={{ fontSize: 16 }} />
                  </IconButton>
                </Box>
              )}
            </Box>
          )}
        </Box>
      )}
    />
  );
}
