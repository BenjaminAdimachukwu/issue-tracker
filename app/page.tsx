import { Button } from "@radix-ui/themes";
import Pagination from "./components/Pagination";
import { DoubleArrowLeftIcon } from "@radix-ui/react-icons";

export default function Home() {
  return (
    <div>
      <Pagination itemCount={100} pageSize={10} currentpage={10} />
      
    </div>
  );
}
