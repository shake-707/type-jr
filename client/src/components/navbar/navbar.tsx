import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/16/solid';
import { href } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { useContext, useEffect, useState } from 'react';

type Link = {
  name: string;
  href: string;
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const [isloggedIn, setisLoggedIn] = useState<Link>({
    name: 'login',
    href: '/login',
  });

  const navigation = [
    {
      name: 'home',
      href: '/',
      current: false,
    },
    {
      name: 'account',
      href: '/account',
      current: false,
    },
    {
      name: isloggedIn.name,
      href: isloggedIn.href,
      current: false,
    },
  ];

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setisLoggedIn({
        name: 'logout',
        href: '/',
      });
    }
  }, []);
  try {
    if (!authContext) {
      throw new Error('couldnt get auth context');
    }
  } catch (err) {
    throw err;
  }

  const { logout } = authContext;

  return (
    <Disclosure as="nav" className="bg-dark-gray">
      <div className="mx-auto max-w-7x1 px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start w-full">
            <div className="hidden sm:ml-6 sm:block w-full">
              <div className="flex space-x-4 w-full">
                {navigation.map((item) => {
                  const navItem = { ...item };
                  if (
                    isloggedIn.name === 'login' &&
                    navItem.name === 'account'
                  ) {
                    return;
                  }

                  return (
                    <a
                      href={navItem.href}
                      key={navItem.name}
                      aria-current={navItem.current ? 'page' : undefined}
                      onClick={
                        navItem.name === 'logout'
                          ? (e) => {
                              logout();
                            }
                          : undefined
                      }
                      className={
                        navItem.name === 'logout' || navItem.name === 'login'
                          ? 'text-sage-gray hover:bg-dark-gray hover:text-bright-gray ml-auto'
                          : 'text-sage-gray hover:bg-dark-gray hover:text-bright-gray'
                      }
                    >
                      {navItem.name}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Disclosure>
  );
};

export default Navbar;
