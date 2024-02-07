import { Button } from "@radix-ui/themes";
import Pagination from "./components/Pagination";
import { DoubleArrowLeftIcon } from "@radix-ui/react-icons";

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <div>
      <Pagination itemCount={100} pageSize={10} currentpage={ parseInt(searchParams.page) } />
    </div>
  );
}
