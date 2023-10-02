'use client';

import { cn } from '@/lib/utils';
import { HomeIcon, Search, User } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export const Sidebar = () => {
  const pathName = usePathname();
  const router = useRouter();
  const routes = [
    {
      icon: HomeIcon,
      href: '/home',
      label: 'Home',
      pro: false,
    },

    {
      icon: Search,
      href: '/explore',
      label: 'Explore',
      pro: true,
    },

    {
      icon: User,
      href: '/profile',
      label: 'User',
      pro: false,
    },
  ];

  const onNavigate = (url: string, pro: boolean) => {
    //todo: check if pro

    return router.push(url);
  };

  return (
    <div className="space-y-4 flex flex-col h-full text-white bg-black-100 border-r-2 border-black-200">
      <div className="p-3 flex flex-1 justify-center">
        <div className="space-y-2">
          {routes.map((routes) => (
            <div
              onClick={() => onNavigate(routes.href, routes.pro)}
              key={routes.href}
              className={cn(
                'text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition',
                pathName === routes.href && 'bg-primary/10 text-primary'
              )}
            >
              <div className="flex flex-col gap-y-2 items-center flex-1 font-lexend mt-5">
                <routes.icon className="h-5 w-5" />
                {routes.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
