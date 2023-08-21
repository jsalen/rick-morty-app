'use client';
import Link from 'next/link';
import { IconDeviceTv, IconLogin, IconUsersGroup } from '@tabler/icons-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { useMatchMedia } from '@/hooks/useMatchMedia';
import { breakpoints } from '@/lib/utils';
import { buttonVariants } from '../ui/button';

export const Navbar = (): JSX.Element => {
  const isDesktop = useMatchMedia(breakpoints.desktop);

  return (
    <NavigationMenu>
      {isDesktop ? (
        <div className="flex">
          <Link
            href="/login"
            className={`${buttonVariants({ variant: 'link' })} gap-2`}
          >
            Login <IconLogin width="18" height="18" />
          </Link>
          <Link
            href="/characters"
            className={`${buttonVariants({ variant: 'link' })} gap-2`}
          >
            Characters <IconUsersGroup width="18" height="18" />
          </Link>
          <Link
            href="/episodes"
            className={`${buttonVariants({ variant: 'link' })} gap-2`}
          >
            Episodes <IconDeviceTv width="18" height="18" />
          </Link>
        </div>
      ) : (
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-base">
              Menu
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <Link href="/login" passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Login <IconLogin width="18" height="18" />
                </NavigationMenuLink>
              </Link>
              <Link href="/characters" passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Characters <IconUsersGroup width="18" height="18" />
                </NavigationMenuLink>
              </Link>
              <Link href="/episodes" passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Episodes <IconDeviceTv width="18" height="18" />
                </NavigationMenuLink>
              </Link>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      )}
    </NavigationMenu>
  );
};
