import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const statuses = [
  {
    value: "Completed", // "Completed
    label: "Completed",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "Not started", // "Not started"
    label: "Not started",
    icon: CircleIcon,
  },
  {
    value: "In progress", // "In progress"
    label: "In Progress",
    icon: StopwatchIcon,
  },
];
export const statuses2 = [
  {
    value: "false", // "Completed
    label: "Pending",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "true", // "Not started"
    label: "Validated",
    icon: CircleIcon,
  },
  
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
];
