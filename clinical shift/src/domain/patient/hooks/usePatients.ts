import { useQuery } from "@tanstack/react-query";
import { getPatients } from "../services/   patient.service";

export function usePatients (){
    const{data = [], isLoading, error} = useQuery({
        queryKey: ["patients"],
        queryFn: getPatients
    })

    return {
        patients: data,
        loading: isLoading,
        error,
    }
}

/**
 * 👉 چرا service و hook را جدا کردی؟

بگو:

I separated data fetching logic into a service layer to keep it independent from React.
The hook handles React Query concerns like caching and state management.
This improves reusability, testability, and makes it easier to swap the data source later.
 */