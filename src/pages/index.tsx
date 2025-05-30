import { ReactNode, useEffect } from "react";
import style from "./index.module.css";
import SearchableLayout from "@/components/searchable-layout";
import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import { InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-books";

//오직 서버측에서만 실행됨
export const getServerSideProps = async () => {
  //컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터를 불러오는 함수
  const allBooks = await fetchBooks();
  console.log("서버사이드프롭스에요");

  const data = "hello";

  return {
    props: {
      allBooks,
    },
  };
};
//InferGetServerSidePropsType 추론해줘서 타입을 만들어주는 ?
//페이지 컴포넌트보다 먼저 실행됨. 위의 getServerSideProps가
export default function Home({
  allBooks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  //컴포넌트가 마운트 된 이후.
  console.log(allBooks);
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
