import { Button } from "@radix-ui/themes";
import Pagination from "./components/Pagination";
import { DoubleArrowLeftIcon } from "@radix-ui/react-icons";
import LatestIssues from "./LatestIssues";

export default function Home() {
  return (
    <div>
      <LatestIssues/>
    </div>
  );
}
