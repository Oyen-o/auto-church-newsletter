import { useNavigate, useLocation } from 'react-router-dom';

// Custom hook for easier navigation
export const useAppNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateTo = {
    home: () => navigate('/'),
    newsletter: (id?: string) => navigate(`/newsletter${id ? `/${id}` : ''}`),
    slideDemo: () => navigate('/slide-demo'),
  };

  const isCurrentPage = (path: string) => location.pathname === path;

  const goBack = () => navigate(-1);
  const goForward = () => navigate(1);

  return {
    navigate,
    navigateTo,
    isCurrentPage,
    goBack,
    goForward,
    currentPath: location.pathname,
    location
  };
};

export default useAppNavigation;