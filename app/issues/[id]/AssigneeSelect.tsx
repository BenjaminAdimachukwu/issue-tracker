"use client";
import { Skeleton } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Fragment } from "react";
import toast, { Toaster } from 'react-hot-toast';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  // const [users, setUsers] = useState<User[]>([]);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const { data } = await axios.get<User[]>("/api/users");
  //     console.log(data);
  //     setUsers(data);
  //   };
  //   fetchUsers();
  // }, [users]);
  const {
    data: users,
    error,
    isLoading,
  } = useUsers()
  if (isLoading) return <Skeleton />;
  if (error) return null;

  const assignIssue = (userId: string) => {
    axios.patch(`/api/issues/${issue.id}`, {
      assignedToUserId: userId || null,
      
    }).catch(()=> {
      toast.error('user could not be assigned')
    })
    
  }
  return (
    <Fragment>
    <Select.Root
      defaultValue={issue.assignedToUserId || null!}
      onValueChange={assignIssue}
    >
      <Select.Trigger placeholder="assign.." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value={null!}>Unassigned</Select.Item>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
    <Toaster/>
   </Fragment>
  );
};

const useUsers = ()=>
useQuery<User[]>({
  queryKey: ["users"],
  queryFn: () => axios.get("/api/users").then((res) => res.data),
  staleTime: 60 * 1000, // 60 sec
  retry: 3,
});
export default AssigneeSelect;

function usestate(p0: never[]): [any, any] {
  throw new Error("Function not implemented.");
}
