import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { selectAuthToken } from '../redux/auth/authSelectors';

function PrivateRoute({ children }) {
  const user = useSelector(selectAuthToken);

  if (user) {
    return children;
  }

  return <Navigate to="/signin" replace />;
}

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
