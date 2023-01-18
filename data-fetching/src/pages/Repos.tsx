import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

export type Repository = {
  full_name: string;
  description: string;
};

export function Repos() {
  const { data, isFetching } = useQuery(
    "repos",
    async () => {
      const response = await axios.get(
        "https://api.github.com/users/torvalds/repos"
      );
      return response.data;
    },
    {
      staleTime: 1000 * 60, //1min
    }
  );

  return (
    <ul>
      {isFetching && <p>Loading...</p>}
      {data?.map((r: Repository) => {
        return (
          <li key={r.full_name}>
            <Link to={`repos/${r.full_name}`}>{r.full_name}</Link>
            <p>{r.description}</p>
          </li>
        );
      })}
    </ul>
  );
}
