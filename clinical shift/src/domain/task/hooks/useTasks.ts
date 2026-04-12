import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../services/task.service";


export function useTasks(){
  const{data: tasks = [], isLoading, error} = useQuery(
    {
      queryKey: ["tasks"],
      queryFn:getTasks
    }

  );

  return {
    tasks,
    loading: isLoading,
    error,
  }
}
// reactQuery comes from React , it get data and contorl loading, error and cache
//queryKey:['tasks"], react Query with this key notise these datas are for tasks 
//  queryFn means: for geting data do this function getTasks
//why this usetasks is important zirz ma dige to page niyaz nadarm ke az useQuery and getTasks estefadeh konim