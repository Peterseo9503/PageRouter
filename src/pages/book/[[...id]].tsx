import { useRouter } from "next/router";

export default function Book() {
  const router = useRouter();

  const { id: value } = router.query;
  console.log(router);
  return (
    <>
      <h1>Book! {value}</h1>
    </>
  );
}
