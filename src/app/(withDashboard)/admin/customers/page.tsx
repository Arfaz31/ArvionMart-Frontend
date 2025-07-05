"use client";

import { Box, Container, Typography } from "@mui/material";
import CustomersTable from "../_component/CustomerTable/CustomersTable";

const CreateCustomers = () => {
  return (
    <Container>
      <Box>
        <Typography component="h1" variant="h5" fontWeight={700}>
          Customers List
        </Typography>
        <Box sx={{ mt: 4 }}>
          <CustomersTable />
        </Box>
      </Box>
    </Container>
  );
};

export default CreateCustomers;
