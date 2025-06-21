import { Flex } from "@/components/Reusable-Components";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <Flex classes="fixed inset-0 w-screen h-screen">
      <div className="lg:gap-4 lg:flex">
        <Flex classes="flex-col">
          <h1 className="font-bold text-blue-400 text-9xl">404</h1>
          <p className="mb-2 text-2xl font-bold text-center  md:text-3xl">
            <span className="text-red-500">Oops!</span>{" "}
            <span>Page not found</span>
          </p>
          <p className="mb-8 text-center md:text-lg">
            The page you’re looking for doesn’t exist.
          </p>
          <Link
            to={"/"}
            className="inline-block bg-blue-400 p-2 !text-white rounded-md"
            reloadDocument
          >
            Go Home
          </Link>
        </Flex>
      </div>
    </Flex>
  );
};

export default NotFoundPage;
