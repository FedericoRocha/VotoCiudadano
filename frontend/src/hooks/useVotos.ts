import { useQuery } from "@tanstack/react-query";
import { getVotos } from "../services/api";

export function useVotos(params: { provincia?: string; localidad?: string; partidoId?: number }) {
  return useQuery({ queryKey: ["votos", params], queryFn: () => getVotos(params) });
}
