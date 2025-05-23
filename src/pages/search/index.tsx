import { useRouter } from "next/router";

export default function Search() {
  const router = useRouter();

  console.log(router);

  const { q: queryValue } = router.query;
  return (
    <>
      <h1>Search! </h1>
      <h2>query : {queryValue}</h2>
    </>
  );
}
