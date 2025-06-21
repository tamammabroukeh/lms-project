import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Custom hook for managing URL search parameters
 * @returns {{
 *   searchParams: URLSearchParams,
 *   getParam: (key: string) => string | null,
 *   setParam: (key: string, value: string) => void,
 *   deleteParam: (key: string) => void,
 *   getAllParams: () => Record<string, string>,
 *   clearAllParams: () => void
 * }}
 */
export const useSearchParams = (): {
  searchParams: URLSearchParams;
  getParam: (key: string) => string | null;
  setParam: (key: string, value: string) => void;
  deleteParam: (key: string) => void;
  getAllParams: () => Record<string, string>;
  clearAllParams: () => void;
} => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get current search params from URL
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  /**
   * Get a specific parameter value
   * @param {string} key - The parameter key
   * @returns {string | null} - The parameter value or null if not found
   */
  const getParam = useCallback(
    (key: string) => searchParams.get(key),
    [searchParams]
  );

  /**
   * Set or update a parameter
   * @param {string} key - The parameter key
   * @param {string} value - The parameter value
   */
  const setParam = useCallback(
    (key: string, value: string) => {
      searchParams.set(key, value);
      navigate(`${location.pathname}?${searchParams.toString()}`, {
        replace: true,
      });
    },
    [searchParams, navigate, location.pathname]
  );

  /**
   * Delete a parameter
   * @param {string} key - The parameter key to remove
   */
  const deleteParam = useCallback(
    (key: string) => {
      searchParams.delete(key);
      navigate(`${location.pathname}?${searchParams.toString()}`, {
        replace: true,
      });
    },
    [searchParams, navigate, location.pathname]
  );

  /**
   * Get all parameters as an object
   * @returns {Record<string, string>} - Object with all parameters
   */
  const getAllParams = useCallback(
    () => Object.fromEntries(searchParams.entries()),
    [searchParams]
  );

  /**
   * Clear all parameters from URL
   */
  const clearAllParams = useCallback(() => {
    navigate(location.pathname, { replace: true });
  }, [navigate, location.pathname]);

  return {
    searchParams,
    getParam,
    setParam,
    deleteParam,
    getAllParams,
    clearAllParams,
  };
};