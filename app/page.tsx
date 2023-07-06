import Link from "next/link";
import { server } from "./config/server";

export default function Home() {
  return (
    <main>
      <h1>Statgo Hiring Excercises</h1>
      <p>Please choose one of the following excercises:</p>
      <p>Bonus points - do them all</p>
      <ul>
        <li>
          <Link href="/calculator">Fix the Calculator</Link>
        </li>
      </ul>
    </main>
  );
}

