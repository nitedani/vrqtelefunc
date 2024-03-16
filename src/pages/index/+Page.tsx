import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { withFallback } from "vike-react-query";
import {
  onGetProfile,
  onGetProtectedResource,
  onLogin,
  onLogout,
} from "./Page.telefunc";

export const Page = withFallback(
  () => {
    const queryClient = useQueryClient();
    const { data } = useSuspenseQuery({
      queryKey: ["profile"],
      queryFn: onGetProfile,
    });

    return (
      <div>
        {data ? `Hi, ${data.id}` : "Not logged in"}
        {data ? <ProtectedResource /> : null}
        <button
          onClick={async () => {
            await onLogin();
            queryClient.invalidateQueries();
          }}
        >
          Login
        </button>
        <button
          onClick={async () => {
            await onLogout();
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

const ProtectedResource = withFallback(
  () => {
    const { data } = useSuspenseQuery({
      queryKey: ["protected-resource"],
      queryFn: onGetProtectedResource,
    });
    return <h1>{data.name}</h1>;
  },
  {
    Error: ({ error: { message } }) => <h1>Error: {message}</h1>,
  }
);
