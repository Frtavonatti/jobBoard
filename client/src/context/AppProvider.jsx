import { AuthProvider } from './AuthContext';
import { NotificationProvider } from './NotificationContext';
import { JobProvider } from './JobContext';

function AppProviders({ children }) {
  return (
    <AuthProvider>
      <NotificationProvider>
        <JobProvider>
          {children}
        </JobProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default AppProviders;