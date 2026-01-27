import { useAuth } from "@/context/useAuth";
import { getUserProfile } from "@/services/useProfile";
import { useQuery } from "@tanstack/react-query";

export const useUserProfile = () => {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    staleTime: 5 * 60 * 1000, //5 min.
    enabled: isAuthenticated,
  });
};
