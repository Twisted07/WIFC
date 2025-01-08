import { createUser } from "@/_lib/data-service";
import { useMutation } from "@tanstack/react-query";

export function createNewUser (data : IUser) {
  const {data: response, error} = useMutation({
    mutationFn: () => createUser(data),
    mutationKey: ['user'],
  })

  
}