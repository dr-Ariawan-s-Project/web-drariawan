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
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { useSidebarStore } from '@/components/sidebar';
import useAuthStore from '@/utils/states/auth';

const Navbar = () => {
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
      className="bg-white/90 w-full top-0 z-50 sticky"
      aria-label="navbar"
    >
      <nav className="flex [&>*]:font-semibold mx-auto w-full p-6 [&>*]:text-gray-900 [&>*]:leading-6 items-center justify-between lg:px-8">
        {role !== 'patient' && <MenuIcon onClick={() => changeSidebarOpen()} />}
        <div>
          <Button variant="link" asChild>
            <Link className="text-lg tracking-widest" to="/">
              Kontak Kami
            </Link>
          </Button>
          <Button variant="link" asChild>
            <Link className="text-lg tracking-widest" to="/login">
              Login Sebagai Pasien
            </Link>
          </Button>
          {/* TODO: Make it conditional based on token */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarFallback>KS</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44" align="end" forceMount>
              {role !== 'patient' ? (
                <DropdownMenuItem onClick={() => navigate('/admin/setting')}>
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
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
