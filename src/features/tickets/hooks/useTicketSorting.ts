import { useMemo, useState } from "react";
import type { Ticket } from "../store/ticketSlice";

export type SortDirection = "asc" | "desc";

export type SortableColumn = keyof Pick<
  Ticket,
  | "priority"
  | "ticketId"
  | "status"
  | "subject"
  | "assignee"
  | "requester"
  | "organization"
  | "createdDate"
  | "solvedDate"
  | "category"
  | "remarks"
  | "eta"
  | "jiraTicketId"
  | "jiraStatus"
>;

const priorityOrder: Record<string, number> = {
  urgent: 4,
  high: 3,
  normal: 2,
  medium: 2,
  low: 1,
};

const compareStrings = (left: string, right: string) =>
  left.localeCompare(right, undefined, { numeric: true, sensitivity: "base" });

const compareDates = (left: string | null, right: string | null) => {
  const leftTime = left ? Date.parse(left) : Number.NEGATIVE_INFINITY;
  const rightTime = right ? Date.parse(right) : Number.NEGATIVE_INFINITY;

  return leftTime - rightTime;
};

const compareTicketValues = (
  left: Ticket,
  right: Ticket,
  column: SortableColumn,
) => {
  switch (column) {
    case "ticketId":
      return left.ticketId - right.ticketId;
    case "priority": {
      const leftPriority = priorityOrder[left.priority.toLowerCase()] ?? 0;
      const rightPriority = priorityOrder[right.priority.toLowerCase()] ?? 0;

      if (leftPriority !== rightPriority) {
        return leftPriority - rightPriority;
      }

      return compareStrings(left.priority, right.priority);
    }
    case "createdDate":
    case "solvedDate":
    case "eta":
      return compareDates(left[column], right[column]);
    default:
      return compareStrings(String(left[column] ?? ""), String(right[column] ?? ""));
  }
};

interface UseTicketSortingOptions {
  initialColumn?: SortableColumn;
  initialDirection?: SortDirection;
}

/// Custom hook to manage ticket sorting logic
export const useTicketSorting = (
  tickets: Ticket[],
  options: UseTicketSortingOptions = {},
) => {
  const {
    initialColumn = "createdDate",
    initialDirection = "desc",
  } = options;
  const [sortColumn, setSortColumn] = useState<SortableColumn>(initialColumn);
  const [sortDirection, setSortDirection] =
    useState<SortDirection>(initialDirection);

  const handleSort = (column: SortableColumn) => {
    if (sortColumn === column) {
      setSortDirection((currentDirection) =>
        currentDirection === "asc" ? "desc" : "asc",
      );
      return;
    }

    setSortColumn(column);
    setSortDirection("asc");
  };

  const getSortIndicator = (column: SortableColumn) => {
    if (sortColumn !== column) {
      return "";
    }

    return sortDirection === "asc" ? "↑" : "↓";
  };

  const sortedTickets = useMemo(
    () =>
      [...tickets]
        .map((ticket, index) => ({ ticket, index }))
        .sort((left, right) => {
          const comparison = compareTicketValues(
            left.ticket,
            right.ticket,
            sortColumn,
          );

          if (comparison !== 0) {
            return sortDirection === "asc" ? comparison : -comparison;
          }

          return left.index - right.index;
        })
        .map(({ ticket }) => ticket),
    [tickets, sortColumn, sortDirection],
  );

  return {
    getSortIndicator,
    handleSort,
    sortColumn,
    sortDirection,
    sortedTickets,
  };
};
