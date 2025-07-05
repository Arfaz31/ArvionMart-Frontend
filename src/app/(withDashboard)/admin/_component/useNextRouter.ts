import { useState } from "react";
import { useRouter } from "next/navigation";

export const useNextRouter = () => {
  const router = useRouter();
  const [pathname, setPathname] = useState("/admin");

  return {
    pathname,
    navigate: (url: string | URL) => {
      let path = typeof url === "string" ? url : url.pathname;
      // Ensure paths start with /admin
      if (!path.startsWith("/admin")) {
        path = `/admin${path.startsWith("/") ? path : `/${path}`}`;
      }
      setPathname(path); // Update internal state
      router.push(path); // Actually navigate to the URL
    },
    searchParams: new URLSearchParams(),
  };
};
