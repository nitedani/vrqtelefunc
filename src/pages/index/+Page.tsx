import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { withFallback } from "vike-react-query";
import { getProfile, login, logout } from "./Page.telefunc";

export const Page = withFallback(
  () => {
    const queryClient = useQueryClient();
    const { data } = useSuspenseQuery({
      queryKey: ["profile"],
      queryFn: getProfile,
    });

    return (
      <div>
        {data ? `Hi, ${data.id}` : "Not logged in"}
        <button
          onClick={async () => {
            await login();
            queryClient.invalidateQueries();
          }}
        >
          Login
        </button>
        <button
          onClick={async () => {
            await logout();
            queryClient.invalidateQueries();
          }}
        >
          Logout
        </button>
      </div>
    );
  },
  {
    Error: () => <h1>Error</h1>,
  }
);
