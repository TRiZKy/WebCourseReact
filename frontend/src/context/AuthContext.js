import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

const AuthContext = createContext();

/**
 * Custom hook to access the authentication context.
 *
 * @returns {Object} The current authentication context value.
 */
export const useAuth = () => {
  return useContext(AuthContext);
};

/**
 * Provides authentication-related functions and user data to its child components.
 * Manages the current user's authentication state and exposes methods for signup, login, and logout.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components that will have access to the authentication context.
 * @returns {JSX.Element} A React component that provides authentication context to its children.
 */
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  /**
   * Creates a new user with the provided email and password.
   *
   * @async
   * @param {string} email - The email address of the new user.
   * @param {string} password - The password for the new user.
   * @throws {Error} Throws an error with a user-friendly message if signup fails.
   * @returns {Promise<void>}
   */
  const signup = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw new Error(handleAuthError(error));
    }
  };

  /**
   * Signs in an existing user with the provided email and password.
   *
   * @async
   * @param {string} email - The email address of the user.
   * @param {string} password - The password of the user.
   * @throws {Error} Throws an error with a user-friendly message if login fails.
   * @returns {Promise<void>}
   */
  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw new Error(handleAuthError(error));
    }
  };

  /**
   * Signs out the currently authenticated user.
   *
   * @async
   * @throws {Error} Throws an error with a user-friendly message if logout fails.
   * @returns {Promise<void>}
   */
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw new Error(handleAuthError(error));
    }
  };

  /**
   * Handles errors from Firebase authentication operations, providing user-friendly error messages.
   *
   * @param {Object} error - The error object from Firebase authentication.
   * @returns {string} A user-friendly error message.
   */
  const handleAuthError = (error) => {
    let errorMessage;
    console.log(error.code);
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = 'The email address is already in use by another account.';
        break;
      case 'auth/invalid-email':
        errorMessage = 'The email address is not valid.';
        break;
      case 'auth/operation-not-allowed':
        errorMessage = 'Email/password accounts are not enabled.';
        break;
      case 'auth/invalid-credential':
        errorMessage = 'Email/password are wrong.';
        break;
      case 'auth/weak-password':
        errorMessage = 'The password is too weak.';
        break;
      case 'auth/too-many-requests':
        errorMessage = 'Too many requests. Please try again later.';
        break;
      case 'auth/user-disabled':
        errorMessage = 'The user account has been disabled by an administrator.';
        break;
      case 'auth/user-not-found':
        errorMessage = 'There is no user corresponding to this identifier.';
        break;
      case 'auth/wrong-password':
        errorMessage = 'The password is invalid.';
        break;
      default:
        errorMessage = 'An unknown error occurred. Please try again.';
    }
    return errorMessage;
  };

  const value = {
    currentUser,
    signup,
    login,
    logout,
  };

  return (
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
  );
};
