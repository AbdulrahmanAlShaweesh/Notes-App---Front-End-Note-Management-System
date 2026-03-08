import { HeroUIProvider } from '@heroui/react';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import Layout from './pages/Layout/Layout';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Contact from './pages/Contact/Contact';
import Error404 from './pages/Error404/Error404';
import AuthContextProvider from './context/AuthContext';
import AllNotes from './pages/AlNotes/AllNotes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NotesProvider } from './context/NotesContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthContextProvider>
        <NotesProvider>
          <Layout />
        </NotesProvider>
      </AuthContextProvider>
    ),
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/allNotes',
        element: <AllNotes />,
      },
      {
        path: '*',
        element: <Error404 />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <HeroUIProvider>
          <RouterProvider router={router} />
        </HeroUIProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
