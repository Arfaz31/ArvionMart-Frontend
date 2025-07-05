import { Button, IconButton, Box, Typography } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";

import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import ReuseableInput from "./ReuseableInput";

export const MetaTagsField = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "metaTags",
  });

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="subtitle1" gutterBottom>
        Meta Tags
      </Typography>

      {fields.map((field, index) => (
        <Box
          key={field.id}
          sx={{ display: "flex", alignItems: "center", mb: 1 }}
        >
          <ReuseableInput
            name={`metaTags.${index}`}
            label={`Meta Tag ${index + 1}`}
            fullWidth={true}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#00a698",
                },
              },
              "& .MuiFormLabel-root.Mui-focused": {
                color: "#00a698",
              },
            }}
          />
          <IconButton
            color="error"
            onClick={() => remove(index)}
            sx={{ ml: 1 }}
          >
            <CancelIcon />
          </IconButton>
        </Box>
      ))}

      <Button
        startIcon={<AddIcon />}
        onClick={() => append("")}
        variant="outlined"
        size="small"
        sx={{ mt: 1, bgcolor: "#00a698", color: "white" }}
      >
        Add Meta Tag
      </Button>
    </Box>
  );
};
