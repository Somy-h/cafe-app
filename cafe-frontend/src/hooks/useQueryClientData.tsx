import { useQuery, useQueryClient } from 'react-query';

export const useSetQueryClientData = (key: string) => {
  const queryClient = useQueryClient();
  
  return (stateValue) => queryClient.setQueryData(key, stateValue);
};

export const useQueryClientData = (key: string, initialData: any) => 
  useQuery(key, {
    initialData,
    staleTime: Infinity,
  }).data;
