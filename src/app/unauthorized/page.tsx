import ErrorMessage from '@/components/ErrorMessage';

export default function UnauthorizedPage() {
  return (
    <ErrorMessage
      title="Authentication Required"
      message="You need to be logged in as an administrator to access this page. Please log in with your admin credentials."
      actionText="Go to Login"
      actionHref="/admin/login"
      statusCode={401}
    />
  );
}
