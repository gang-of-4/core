import { AuthGuard } from "../guards/auth-guard";

export const withAuthGuard =
  (Component, { role }) =>
  (props) => (
    <AuthGuard role={role}>
      <Component {...props} />
    </AuthGuard>
  );
