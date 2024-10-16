import Header from "./components/Layout/Header";
import Sidebar from "./components/Layout/Sidebar";
import Footer from "./components/Layout/Footer";
import Members from "./pages/Members";
import Archive from "./pages/Archive";
import Books from "./pages/Books";
import Main from "./pages/Main";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import { useState, useEffect } from "react";
import Statistics from "./pages/Statistics";
import Loan from "./pages/Loan";
import LibraryCard from "./pages/LibraryCard";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import AboutUs from "./pages/AboutUs";
import api from "./api";

function App() {
  const [members, setMembers] = useState([]);
  const [archives, setArchives] = useState([]);
  const [books, setBooks] = useState([]);
  const [loans, setLoans] = useState([]);
  const [libraryCards, setLibraryCards] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [succeed, setSucceed] = useState(false);
  const [failed, setFailed] = useState(false);
  const [alerting, setAlerting] = useState(false);

  function AlertSucceed() {
    setSucceed(true);
    setTimeout(() => setSucceed(false), 500);
  }
  useEffect(()=>{
    AlertSucceed();
  },[alerting])

  function AlertFailed() {
    setFailed(true);
    setTimeout(() => setFailed(false), 500);
  }
  useEffect(() => {
    if (isLogged) {
      getMembers();
    }
  }, [isLogged]);

  useEffect(() => {
    if (isLogged) {
      getBooks();
    }
  }, [isLogged]);

  useEffect(() => {
    if (isLogged) {
      getArchives();
    }
  }, [isLogged]);

  useEffect(() => {
    if (isLogged) {
      getLoans();
    }
  }, [isLogged]);

  useEffect(() => {
    if (isLogged) {
      getLibraryCards();
    }
  }, [isLogged]);

  const getMembers = () => {
    api
      .get("/students/")
      .then((res) => res.data)
      .then((data) => {
        setMembers(data.Students);
      })
      .catch((err) => alert(err));
  };
  const getBooks = () => {
    api
      .get("/books/")
      .then((res) => res.data)
      .then((data) => {
        setBooks(data.Books);
        
      })
      .catch((err) => alert(err));
  };
 
  const getArchives = () => {
    api
      .get("/archive/")
      .then((res) => res.data)
      .then((data) => {
        setArchives(data.Archive);
      })
      .catch((err) => alert(err));
  };
  const getLoans = () => {
    api
      .get("/rentedbooks/")
      .then((res) => res.data)
      .then((data) => {
        setLoans(data.Rented);
      })
      .catch((err) => alert(err));
  };

  const getLibraryCards = () => {
    api
      .get("/librarycards/")
      .then((res) => res.data)
      .then((data) => {
        setLibraryCards(data.LibraryCards);
        console.log(data);
      })
      .catch((err) => alert(err));
  };
  const Layout = () => {
    return (
      <div className="h-screen">
        <div className="flex flex-row min-h-full w-screen overflow-auto ">
          <div className="border-x border-s-neutral-300">
            <Sidebar />
          </div>
          <div className="flex flex-col flex-grow">
            <div className="bg-neutral-50 h-16 ">
              <Header />
            </div>
            <div className=" flex-grow z-40 my-6">
              <Outlet />
            </div>
            <div className="">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    );
  };

  function Logout() {
    localStorage.clear();
    return <Navigate to="/login" />;
  }

  function RegisterAndLogout() {
    localStorage.clear();
    return <Register setIsLogged={setIsLogged} />;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute setIsLogged={setIsLogged}>
          <Layout />
        </ProtectedRoute>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: (
            <Main
              bookLength={books.length}
              memberLength={members.length}
              loanLength={loans.length}
              archiveLength={archives.length}
            />
          ),
        },
        {
          path: "books",
          element: (
            <Books
              setBooks={setBooks}
              books={books}
              AlertSucceed={AlertSucceed}
              AlertFailed={AlertFailed}
              succeed={succeed}
              failed={failed}
            />
          ),
        },
        {
          path: "archive",
          element: (
            <Archive
              archives={archives}
              setArchives={setArchives}
              AlertSucceed={AlertSucceed}
              AlertFailed={AlertFailed}
              succeed={succeed}
              failed={failed}
            />
          ),
        },
        {
          path: "statistics",
          element: (
            <Statistics
              loans={loans}
              archives={archives}
              members={members}
              books={books}
              cards={libraryCards}
            />
          ),
        },
        {
          path: "loan",
          element: (
            <Loan
              setLoans={setLoans}
              loans={loans}
              AlertSucceed={AlertSucceed}
              AlertFailed={AlertFailed}
              succeed={succeed}
              failed={failed}
              members={members}
              books={books}
              setBooks={setBooks}
              cards={libraryCards}
            />
          ),
        },
        {
          path: "librarycard",
          element: (
            <LibraryCard
              libraryCards={libraryCards}
              setLibraryCards={setLibraryCards}
              members={members}
              AlertSucceed={AlertSucceed}
              AlertFailed={AlertFailed}
              succeed={succeed}
              failed={failed}
            />
          ),
        },
        {
          path: "members",
          element: (
            <Members
              members={members}
              setMembers={setMembers}
              AlertSucceed={AlertSucceed}
              AlertFailed={AlertFailed}
              succeed={succeed}
              failed={failed}
              setAlerting={setAlerting}
            />
          ),
        },
        {
          path: "aboutus",
          element: <AboutUs />,
        },
      ],
    },
    {
      path: "login",
      element: <Login setIsLogged={setIsLogged} />,
    },
    {
      path: "register",
      element: <RegisterAndLogout />,
    },
    {
      path: "logout",
      element: <Logout />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
