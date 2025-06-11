import { useQuery } from "@tanstack/react-query";
import { getPartidos } from "../services/api";

export function usePartidos() {
  return useQuery({ queryKey: ["partidos"], queryFn: getPartidos });
}
