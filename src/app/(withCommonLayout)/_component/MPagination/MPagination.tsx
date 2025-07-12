"use client";

import { Box, Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type TPaginationProps = {
  meta: {
    page: number;
    limit: number;
    totalPage: number;
  };
};

const MPagination = ({ meta }: TPaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("page", value.toString());
    const newQueryString = currentParams.toString();
    router.push(`${pathname}?${newQueryString}`);
  };

  return (
    <Stack justifyContent="center">
      <Box>
        <Pagination
          count={meta?.totalPage}
          page={meta.page}
          onChange={handlePageChange}
        />
      </Box>
    </Stack>
  );
};

export default MPagination;
