import { useParams, useNavigate, Link } from "react-router-dom";
import { useQueryClient } from "react-query";
import { Repository, Repos } from "./Repos";

export default function Repo() {
  const params = useParams();
  const currentRepository = params["*"] as string;
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  function handleChangeRepoDescription() {
    const previousRepos = queryClient.getQueryData<Repository[]>("repos");
    if (previousRepos) {
      const nextRepos = previousRepos.map((repo) => {
        if (repo.full_name === currentRepository) {
          return {
            ...repo,
            description: "Repo's description was deleted. Refresh to recover",
          };
        } else {
          return repo;
        }
      });
      queryClient.setQueryData("repos", nextRepos);
    }
    navigate("/");
  }
  function goToGithub() {
    window.location.href = `https://github.com/${currentRepository}`;
  }

  return (
    <div>
      <h1>{currentRepository}</h1>

      <button onClick={handleChangeRepoDescription}>
        Delete description for this Repo
      </button>

      <button onClick={goToGithub}>Go to Github</button>
    </div>
  );
}
