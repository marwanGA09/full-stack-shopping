import { useNavigate, useRouteError } from 'react-router-dom';
import styles from './ErrorPage.module.css'; // Import CSS module

const ErrorPage = ({ error }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.error}>
      <h1>Oops! Something went wrong.</h1>
      {error && (
        <p>{error.message || 'An error occurred while fetching data.'}</p>
      )}
      <div>
        <button onClick={() => window.location.reload()}>Reload</button>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    </div>
  );
};

export default ErrorPage;
