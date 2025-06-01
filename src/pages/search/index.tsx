import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import { GetServerSidePropsContext, GetStaticPropsContext, InferGetServerSidePropsType, InferGetStaticPropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import { BookData } from "@/types";
// export const getStaticProps = async (context : GetStaticPropsContext) =>{

//   const q = context.query.q;
//   const books = await fetchBooks(q as string);

//   return {
//     props: {books},
//   }
// }

export default function Search() {
  const router = useRouter();
  const q = router.query.q;
  const [books, setBooks] = useState<BookData[]>([])

  const fetchSearchResult = async() =>{
    const data = await fetchBooks(q as string);
    setBooks(data);
  }

  useEffect( ()=>{
    if(q){
      //검색 결과를 불러오는 로직
      fetchSearchResult();
    }
  } ,[q])
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Search.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
