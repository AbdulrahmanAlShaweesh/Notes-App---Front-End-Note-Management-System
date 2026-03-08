import {
  Navbar as NavbarComponent,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
  Switch,
  NavbarMenuItem,
  NavbarMenu,
} from '@heroui/react';
import { RiStickyNoteAddFill } from 'react-icons/ri';
import { Link, NavLink } from 'react-router-dom';
import {
  FaBars,
  FaExternalLinkSquareAlt,
  FaMoon,
  FaNotesMedical,
  FaRegUserCircle,
  FaSun,
  FaTimes,
} from 'react-icons/fa';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { GoDotFill } from 'react-icons/go';

function Navbar() {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme !== null ? JSON.parse(savedTheme) : false;
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logoutHandler, userToken } = useContext(AuthContext);

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(isDark));
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const menuItems = [
    {
      name: 'My Notes',
      path: '/',
      icon: <FaNotesMedical />,
    },
    {
      name: 'All Notes',
      path: '/allNotes',
      icon: <FaExternalLinkSquareAlt />,
    },
  ];

  return (
    <NavbarComponent
      maxWidth="xl"
      isBordered
      shouldHideOnScroll
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden text-2xl p-2 rounded-lg transition-colors"
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>
      <NavbarContent justify="start">
        <NavbarBrand className="flex items-center gap-2">
          <div className="p-2 bg-[#E5E7EB] dark:bg-[#1E2939] rounded-lg">
            <RiStickyNoteAddFill />
          </div>
          <p className="font-bold text-inherit">Note Route</p>
        </NavbarBrand>
      </NavbarContent>

      {userToken ? (
        <NavbarContent as="div" justify="end">
          <NavbarContent className="hidden sm:flex gap-5" justify="end">
            <NavbarItem>
              <NavLink
                to="/"
                className="nav-link hidden md:flex items-center gap-2 active:scale-105 px-4 py-2 rounded-lg transition-colors"
              >
                My Notes
              </NavLink>
            </NavbarItem>
            <NavbarItem>
              <NavLink
                to="/allNotes"
                className="nav-link hidden md:flex items-center gap-2 active:scale-105 px-4 py-2 rounded-lg transition-colors"
              >
                AllNotes
              </NavLink>
            </NavbarItem>
          </NavbarContent>

          <Switch
            color="primary"
            endContent={<FaMoon />}
            size="sm"
            startContent={<FaSun />}
            isSelected={isDark}
            onValueChange={() => setIsDark(prev => !prev)}
            className="w-full hidden md:block"
          />
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold text-center">
                  <GoDotFill color="green" className="animate-ping" />
                  Welcome User
                </p>
              </DropdownItem>
              <DropdownItem key="myNotes">
                <Link to="/" className="w-full block">
                  My Notes
                </Link>
              </DropdownItem>
              <DropdownItem key="allNotes">
                <Link to="/allNotes" className="w-full block">
                  All Notes
                </Link>
              </DropdownItem>

              <DropdownItem key="logout" color="danger" onClick={logoutHandler}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      ) : (
        <NavbarContent justify="end">
          <NavbarContent className="hidden sm:flex gap-5" justify="center">
            <NavbarItem>
              <NavLink
                to="/"
                className="nav-link hidden md:flex items-center gap-2 active:scale-105 px-4 py-2 rounded-lg transition-colors"
              >
                My Notes
              </NavLink>
            </NavbarItem>
            <NavbarItem>
              <NavLink
                to="/allNotes"
                className="nav-link hidden md:flex items-center gap-2 active:scale-105 px-4 py-2 rounded-lg transition-colors"
              >
                AllNotes
              </NavLink>
            </NavbarItem>
          </NavbarContent>

          <Switch
            color="primary"
            endContent={<FaMoon />}
            size="sm"
            startContent={<FaSun />}
            isSelected={isDark}
            onValueChange={() => setIsDark(prev => !prev)}
          />
          <NavbarItem className="hidden lg:flex">
            <Link to="/login">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button color="primary" variant="flat">
              <Link to="/register">Sign Up</Link>
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}

      <NavbarMenu>
        {menuItems.map(item => (
          <NavbarMenuItem key={`${item.name}`}>
            <Link
              to={item.path}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors text-left bg-[#e5e7eb] dark:bg-[#1E2939] cursor-pointer active:scale-105"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.icon}
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem className="flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors text-left bg-[#e5e7eb] dark:bg-[#1E2939]">
          <p>Change Mode</p>
          <Switch
            color="primary"
            endContent={<FaMoon />}
            size="sm"
            startContent={<FaSun />}
            isSelected={isDark}
            onValueChange={() => setIsDark(prev => !prev)}
            className="w-full"
          />
        </NavbarMenuItem>
      </NavbarMenu>
    </NavbarComponent>
  );
}

export default Navbar;
