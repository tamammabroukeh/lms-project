// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function ReusablePagination({
//   pagesArray,
//   setPage,
//   page,
//   searchParams,
//   setSearchParams,
// }: IReusablePagination) {
//   const navigate = useNavigate();
//   const numberOfPages: number = page;
//   const handlePageChange = (newPage: number) => {
//     setPage(newPage);
//     setSearchParams({ page: newPage.toString() });
//     navigate(`?page=${newPage}`, { replace: true });
//     window.scrollTo({ top: 0 });
//   };

//   useEffect(() => {
//     if (page > 1) {
//       const params = new URLSearchParams(searchParams);
//       setPage(Number(params.get("page")));
//     }
//   }, [searchParams, setPage]);

//   // Calculate the pages to show around the current page
//   // Start at two pages before, or 1 if out of range
//   const startPage = Math.max(numberOfPages - 2, 1);
//   // End at two pages after, or the last page
//   const endPage = Math.min(numberOfPages + 2, pagesArray.length);

//   const visiblePages = pagesArray.slice(startPage - 1, endPage);
//   // console.log(page);
//   return (
//     <Pagination className="cursor-pointer">
//       <PaginationContent>
//         <PaginationItem>
//           <PaginationPrevious
//             onClick={() => handlePageChange(Math.max(page - 1, 1))}
//           />
//         </PaginationItem>
//         {startPage > 1 && (
//           <>
//             <PaginationItem>
//               <PaginationLink onClick={() => handlePageChange(1)}>
//                 1
//               </PaginationLink>
//             </PaginationItem>
//             {startPage > 2 && <PaginationEllipsis />}
//           </>
//         )}
//         {visiblePages.map((pageNumber) => (
//           <PaginationItem key={pageNumber}>
//             <PaginationLink onClick={() => handlePageChange(pageNumber)}>
//               {pageNumber}
//             </PaginationLink>
//           </PaginationItem>
//         ))}
//         {endPage < pagesArray.length && (
//           <>
//             {endPage < pagesArray.length - 1 && <PaginationEllipsis />}
//             <PaginationItem>
//               <PaginationLink
//                 onClick={() => handlePageChange(pagesArray.length)}
//               >
//                 {pagesArray.length}
//               </PaginationLink>
//             </PaginationItem>
//           </>
//         )}
//         <PaginationItem>
//           <PaginationNext
//             onClick={() =>
//               handlePageChange(Math.max(page + 1, pagesArray.length))
//             }
//           />
//         </PaginationItem>
//       </PaginationContent>
//     </Pagination>
//   );
// }

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


interface IPagination {
  currentPage: number;
  totalPages: number;
  setPage: (page: number) => void;
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
}

export default function ReusablePagination({
  currentPage,
  totalPages,
  setPage,
  searchParams,
  setSearchParams,
}: IPagination) {
  const navigate = useNavigate();
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    setSearchParams(new URLSearchParams({ page: newPage.toString() }));
    navigate(`?page=${newPage}`, { replace: true });
    // window.scrollTo({ top: 0 });
  };

  useEffect(() => {
    const pageParam = searchParams.get("page");
    if (pageParam) {
      const pageNum = Number(pageParam);
      if (!isNaN(pageNum)) {
        setPage(Math.min(Math.max(pageNum, 1), totalPages));
      }
    }
  }, [searchParams, setPage, totalPages]);

  // Generate visible page numbers
  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 5; // Show max 5 page numbers
    
    let start = Math.max(currentPage - 2, 1);
    let end = Math.min(start + maxVisible - 1, totalPages);
    
    // Adjust if we're at the end
    if (end === totalPages) {
      start = Math.max(totalPages - maxVisible + 1, 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  if (totalPages <= 1) return null;

  return (
    <Pagination className="cursor-pointer">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange(currentPage - 1)}
            hidden={currentPage === totalPages}
            // disabled={currentPage === 1}
          />
        </PaginationItem>

        {/* First page */}
        {!visiblePages.includes(1) && (
          <>
            <PaginationItem>
              <PaginationLink
                isActive={currentPage === 1}
                onClick={() => handlePageChange(1)}
              >
                1
              </PaginationLink>
            </PaginationItem>
            {currentPage > 3 && <PaginationEllipsis />}
          </>
        )}

        {/* Visible pages */}
        {visiblePages.map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              isActive={pageNumber === currentPage}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Last page */}
        {!visiblePages.includes(totalPages) && (
          <>
            {currentPage < totalPages - 2 && <PaginationEllipsis />}
            <PaginationItem>
              <PaginationLink
                isActive={currentPage === totalPages}
                onClick={() => handlePageChange(totalPages)}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationNext
            
            onClick={() => handlePageChange(currentPage + 1)}
            // disabled={currentPage === totalPages}
            hidden={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}