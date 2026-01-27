import { useQuery, useQueryClient } from '@tanstack/react-query';

const SIDEBAR_QUERY_KEY = ['sidebar', 'collapsed'] as const;

interface SidebarState {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

/**
 * Custom hook na správu stavu sidebaru pomocou React Query
 * Stav sa persistuje v localStorage a synchronizuje sa naprieč celou aplikáciou
 */
export function useSidebarState(): SidebarState {
  const queryClient = useQueryClient();

  // Načítanie stavu sidebaru z React Query cache
  const { data: isCollapsed = false } = useQuery({
    queryKey: SIDEBAR_QUERY_KEY,
    queryFn: () => {
      // Pri prvom načítaní skontroluj localStorage
      const saved = localStorage.getItem('sidebarCollapsed');
      return saved ? JSON.parse(saved) : false;
    },
    staleTime: Infinity, // Dáta nikdy nevypršia
    gcTime: Infinity, // Dáta nikdy nebudú vymazané z cache
  });

  // Toggle funkcia - prepne stav sidebaru
  const toggleSidebar = () => {
    queryClient.setQueryData(SIDEBAR_QUERY_KEY, (old: boolean = false) => {
      const newValue = !old;
      localStorage.setItem('sidebarCollapsed', JSON.stringify(newValue));
      return newValue;
    });
  };

  // Setter funkcia - nastaví konkrétny stav
  const setSidebarCollapsed = (collapsed: boolean) => {
    queryClient.setQueryData(SIDEBAR_QUERY_KEY, collapsed);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(collapsed));
  };

  return {
    isCollapsed,
    toggleSidebar,
    setSidebarCollapsed,
  };
}
