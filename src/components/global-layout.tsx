import type { ReactNode } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import style from "./global-layout.module.css";

export default function GlobalLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <div className={style.container}>
      <header className={style.header}>
        <Link href="/">📚ONE BITE BOOK</Link>
      </header>
      <main>{children}</main>
      <footer className={style.footer}>제작 @peterSeo9503</footer>
    </div>
  );
}
