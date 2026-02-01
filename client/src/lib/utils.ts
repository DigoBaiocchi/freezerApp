import { ApiCalls, DatabaseTables } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDatabaseData(tableName: DatabaseTables) {
  return useQuery({
    queryKey: [tableName],
      queryFn: () => {
          const apiCall = new ApiCalls(tableName);

          return  apiCall.getCall().then(res => res.data);
      }
  });
} 