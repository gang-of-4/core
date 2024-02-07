import { AuthGuard } from '../guards/auth-guard';

export const withAuthGuard = (Component, {role}) => {
  function WrappedComponent(props) {
    return (
      <AuthGuard role={role}>
        <Component {...props} />
      </AuthGuard>
    );
  }

  WrappedComponent.displayName = `withAuthGuard(${Component.displayName || Component.name || 'Component'})`;

  return WrappedComponent;
};
