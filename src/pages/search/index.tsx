import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import { GetServerSidePropsContext, GetStaticPropsContext, InferGetServerSidePropsType, InferGetStaticPropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import { BookData } from "@/types";
import Head from "next/head";


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
    <>
    <Head>
      <title>한입북스 - 검색결과</title>
      <meta property="og:image" content="/thumbnail.png"/>
      <meta property="og:title" content="한입북스" />
      <meta property="og:description" content="한입 북스에 등록된 도서들을 만나보세요" />
    </Head>
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
    </>
  );
}

Search.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
