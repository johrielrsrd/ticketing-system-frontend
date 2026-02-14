import { useEffect, useState } from "react";
import { fetchSolveRate } from "@/features/analytics/services/analyticsApi";

export type UseSolveRateProps = {
  enabled?: boolean;
};

export type SolveRateData = {
  solveRatePercentage: number;
  solvedCount: number;
  totalCount: number;
};

export const useSolveRate = ({ enabled = true }: UseSolveRateProps = {}) => {
  const [solveRate, setSolveRate] = useState<SolveRateData | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadSolveRate = async () => {
      if (!enabled) {
        setSolveRate(null);
        return;
      }

      try {
        const response = await fetchSolveRate();

        if (!response.ok) {
          throw new Error("Failed to fetch solve rate data");
        }

        const data = await response.json();
        if (!cancelled) setSolveRate(data);
      } catch (err) {
        console.error("Error fetching solve rate:", err);
        if (!cancelled) setSolveRate(null);
      }
    };

    loadSolveRate();

    return () => {
      cancelled = true;
    };
  }, [enabled]);

  return { solveRate };
};
