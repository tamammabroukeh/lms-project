import { SetStateAction } from "react";
import { SetURLSearchParams } from "react-router-dom";

export interface IIReusablePagination{
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  page: number;
  setPage: (value: SetStateAction<number>) => void;
  pagesArray: number[];
}