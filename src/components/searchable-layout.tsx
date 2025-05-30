import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import style from "@/components/searchable-layout.module.css";

export default function SearchableLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const q = router.query.q as string;

  useEffect(() => {
    setSearch(q || "");
  }, [q]);
  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };

  const onkeyDonw = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };
  return (
    <div>
      <div className={style.searchbar_container}>
        <input
          value={search}
          placeholder="Please input keyword"
          onChange={onChangeSearch}
          onKeyDown={onkeyDonw}
        ></input>
        <button onClick={onSubmit}>Search</button>
      </div>
      <div>{children}</div>
    </div>
  );
}
