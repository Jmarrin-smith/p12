import Link from "next/link";
import styles from "./nav.module.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function Nav() {
  return (
    <ClerkProvider>
      <nav className={styles.container}>
        <div className={styles.navitemscontainer}>
          <div className={styles.placeholder}></div>
          <div className={styles.home}>
            <Link href="/">
              <h1>Bracketiser</h1>
            </Link>
          </div>
          <div className={styles.links}>
            <Link href="/list">
              <h3>list</h3>
            </Link>
            <Link href="/search">
              <h3>search</h3>
            </Link>
            <Link href="/addlist">
              <h3>add list</h3>
            </Link>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </nav>
    </ClerkProvider>
  );
}
