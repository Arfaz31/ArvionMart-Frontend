import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import FolderIcon from "@mui/icons-material/Folder";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CategoryIcon from "@mui/icons-material/Category";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import PeopleIcon from "@mui/icons-material/People";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import ReviewsIcon from "@mui/icons-material/Reviews";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import { type Navigation } from "@toolpad/core/AppProvider";

export const NAVIGATION: Navigation = [
  {
    segment: "admin",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "orders",
    title: "Orders",
    icon: <ShoppingCartIcon />,
  },
  {
    segment: "products",
    title: "Products",
    icon: <FolderIcon />,
    children: [
      {
        segment: "product-lists",
        title: "Product Lists",
        icon: <ListAltIcon />,
      },
      {
        segment: "create-product",
        title: "Create Product",
        icon: <AddCircleIcon />,
      },
      {
        segment: "create-variant",
        title: "Create Variant",
        icon: <AddCircleIcon />,
      },
      {
        segment: "create-category",
        title: "Create Category",
        icon: <CategoryIcon />,
      },
      {
        segment: "create-subcategory",
        title: "Create Sub-Category",
        icon: <SubdirectoryArrowRightIcon />,
      },
      {
        segment: "create-brand",
        title: "Create Brand",
        icon: <BrandingWatermarkIcon />,
      },
    ],
  },
  {
    segment: "customers",
    title: "Customers",
    icon: <PeopleIcon />,
  },
  {
    segment: "analytics",
    title: "Analytics",
    icon: <AnalyticsIcon />,
  },
  {
    segment: "reports",
    title: "Reports",
    icon: <AssessmentIcon />,
  },
  {
    segment: "reviews",
    title: "Reviews",
    icon: <ReviewsIcon />,
  },
  {
    segment: "shipping",
    title: "Shipping",
    icon: <LocalShippingIcon />,
  },
  {
    segment: "returns",
    title: "Returns",
    icon: <AssignmentReturnIcon />,
  },
  {
    segment: "settings",
    title: "Settings",
    icon: <SettingsIcon />,
  },
  {
    segment: "inbox",
    title: "Inbox",
    icon: <InboxIcon />,
  },
  {
    segment: "mail",
    title: "Mail",
    icon: <MailIcon />,
  },
];
