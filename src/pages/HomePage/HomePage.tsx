import React from "react";
import useGet from "../../hooks/useGet";
import styles from "./HomePage.module.css";

function HomePage() {
  const [greeting, setGreeting] = React.useState("");
  const { data, isLoading } = useGet<string>("http://localhost:8080/api/git");

  React.useEffect(() => {
    data && setGreeting(data);
  }, [data]);

  return (
    <div>
      <h1>HomePage</h1>
      <h3>{greeting}</h3>
    </div>
  );
}

export default HomePage;
