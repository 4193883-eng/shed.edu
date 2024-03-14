import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function PrivateRoute({ children }) {
  const user = useSelector(true);

  if (user) {
    return children;
  }

  return <Navigate to="/login" replace />;
}

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
