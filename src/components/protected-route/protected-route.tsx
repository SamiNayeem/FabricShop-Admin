// src/components/ProtectedRoute.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../app/context/auth-context';

const ProtectedRoute = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const router = useRouter();
    const { authState } = useAuth();

    useEffect(() => {
      if (!authState.isAuthenticated) {
        router.replace('/Login'); // Redirect to login page if not authenticated
      }
    }, [authState.isAuthenticated]);

    if (!authState.isAuthenticated) {
      return null; // Optionally render a loading spinner or something here
    }

    return <WrappedComponent {...props} />;
  };
};

export default ProtectedRoute;
