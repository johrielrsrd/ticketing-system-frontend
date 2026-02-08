import { useEffect, useState } from "react";
import { fetchSolveRate } from "@/features/analytics/services/analyticsApi";
import { type SolveRateData, type UseSolveRateProps } from "../types/types";

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
}
