import { Link } from "@tanstack/react-router";

export function Home() {
  return (
    <div>
      <h1>Home Component</h1>
      <Link to="/omr">omr</Link>
    </div>
  );
}
