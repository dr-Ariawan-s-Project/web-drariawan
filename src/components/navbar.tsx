import { Link, useNavigate } from 'react-router-dom';
import { MenuIcon, LogOutIcon } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSidebarStore } from '@/components/sidebar';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import useAuthStore from '@/utils/states/auth';

interface Props {
  showMenu?: boolean;
}

const Navbar = (props: Props) => {
  const { showMenu } = props;
  const changeSidebarOpen = useSidebarStore((state) => state.changeSidebarOpen);
  const { token, name, role, resetAuth } = useAuthStore((state) => state);
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleLogout() {
    toast({
      description: 'Logout Successfully',
    });
    resetAuth();
  }

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      aria-label="navbar"
    >
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          {showMenu && <MenuIcon onClick={() => changeSidebarOpen()} />}
          <Link className="mr-6 flex items-center space-x-2" to="/">
            <img src="/logo-blue.svg" alt="Logo" className="h-12 w-12" />
          </Link>
        </div>
        <div className="flex gap-4 items-center justify-end h-full w-full">
          <Button variant="link" asChild>
            <Link className="text-lg tracking-widest" to="/">
              Kontak Kami
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarFallback>KS</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44" align="end" forceMount>
              {token ? (
                <>
                  {role !== 'patient' ? (
                    <DropdownMenuItem
                      onClick={() => navigate('/admin/setting')}
                    >
                      Setting
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem
                      onClick={() => navigate('/scheduling/schedule_list')}
                    >
                      Jadwal Saya
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => handleLogout()}>
                    Logout
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem onClick={() => navigate('/login')}>
                  Login Sebagai Pasien
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
