import BookItem from "@/components/book-item";
import SearchableLayout from "@/components/searchable-layout";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-randombooks";
import { InferGetServerSidePropsType } from "next";
import { ReactNode } from "react";
import style from "./index.module.css";
import Head from "next/head";
//오직 서버측에서만 실행됨ß


export const getStaticProps = async () => {
  //컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터를 불러오는 함수
  //병렬처리 
  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(), fetchRandomBooks()
  ]);

  const data = "hello";

  return {
    props: {
      allBooks,
      recoBooks,
    },
  };
};
//InferGetServerSidePropsType 추론해줘서 타입을 만들어주는 ?
//페이지 컴포넌트보다 먼저 실행됨. 위의 getServerSideProps가
export default function Home({
  allBooks, recoBooks
}: InferGetServerSidePropsType<typeof getStaticProps>) {
  return (
    <>
    <Head>
      <title>한입북스</title>
      <meta property="og:image" content="/thumbnail.png"/>
      <meta property="og:title" content="한입북스" />
      <meta property="og:description" content="한입 북스에 등록된 도서들을 만나보세요" />
      
    </Head>
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {recoBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>

      <section>
        <h3>등록된 모든 도서</h3>
        {allBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
