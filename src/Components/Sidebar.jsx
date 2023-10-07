import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import {
  ListItem,
  Card,
  List,
  ListItemPrefix
} from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, faChalkboardTeacher, faGraduationCap, faHouse, faToolbox } from "@fortawesome/free-solid-svg-icons";

// Define un array con los elementos del menú en formato JSON
const menuItems = [
  {
    id: 1,
    to: "/home",
    icon: (
      <FontAwesomeIcon icon={faHouse} size="xl" className="mr-2" />
    ),
    name: "Inicio",
  },
  {
    id: 2,
    to: "/alumnos-admin",
    icon: (
      <FontAwesomeIcon icon={faGraduationCap} size="xl" className="mr-2" />

    ),
    name: "Alumnos",
  },
  {
    id: 3,
    to: "",
    icon: (
      <FontAwesomeIcon icon={faChalkboardTeacher} size="xl" className="mr-2" />
    ),
    name: "Profesores",
  },
  {
    id: 4,
    to: "",
    icon: (
      <FontAwesomeIcon icon={faToolbox} size="xl" className="mr-2" />
    ),
    name: "Materiales",
  },
  {
    id: 5,
    to: "",
    icon: (
      <FontAwesomeIcon icon={faArrowRightFromBracket} size="xl" className="mr-2" />
    ),
    name: "Sign In",
  },
];

function MenuItem({ item }) {
  return (
    <Link to={item.to}>
      <ListItem>
        <ListItemPrefix>{item.icon}</ListItemPrefix>
        {item.name}
      </ListItem>
    </Link>
  );
}

function Sidebar() {
  const [expanded, setExpanded] = useState(true);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Navbar />
      <button
        onClick={toggleSidebar}
        data-drawer-target="cta-button-sidebar"
        data-drawer-toggle="cta-button-sidebar"
        aria-controls="cta-button-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 01s2 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="cta-button-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform  ${
          expanded ? "-translate-x-full" : "translate-x-0"
        } sm:translate-x-0 `}
        aria-label="Sidebar"
      >
        <Card className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <a
            href="https://flowbite.com/"
            className="flex items-center pl-2.5 mb-5"
          >
            <img className="h-6 mr-3 sm:h-7" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white"></span>
          </a>

          <div className="space-y-2 font-medium">
            <List>
              {menuItems.map((item) => (
                <MenuItem key={item.id} item={item} />
              ))}
            </List>
          </div>
          {/*

             
          <div
            id="dropdown-cta"
            className="p-4 mx-2 mb-6 rounded-lg fixed bottom-0  bg-blue-50 dark:bg-blue-900"
            role="alert"
          >
            <div className="flex items-center mb-3">
              <span className="bg-orange-100 text-orange-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">
                Beta
              </span>
              <button
                type="button"
                className="ml-auto -mx-1.5 -my-1.5 bg-blue-50 inline-flex justify-center items-center  text-blue-900 rounded-lg focus:ring-2 focus:ring-blue-400 p-1 hover:bg-blue-200 h-6 w-6 dark:bg-blue-900 dark:text-blue-400 dark:hover:bg-blue-800"
                data-dismiss-target="#dropdown-cta"
                aria-label="Close"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="w-2.5 h-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
            <p className="mb-3 text-sm text-blue-800 dark:text-blue-400">
              Preview the new Flowbite dashboard navigation! You can turn the
              new navigation off for a limited time in your profile.
            </p>
            <a
              className="text-sm text-blue-800 underline font-medium hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
              href="#"
            >
              Turn new navigation off
            </a>
          </div>
           */}
        </Card>
      </aside>
    </>
  );
}

export default Sidebar;
