import { GuestGuard } from '../guards/guest-guard';

export const withGuestGuard = function withGuestGuard(Component) {
  function WrappedComponent(props) {
    return (
      <GuestGuard>
        <Component {...props} />
      </GuestGuard>
    );
  }

  WrappedComponent.displayName = `withGuestGuard(${Component.displayName || Component.name || 'Component'})`;

  return WrappedComponent;
};
