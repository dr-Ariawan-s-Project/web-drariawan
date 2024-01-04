import { Link, useNavigate } from 'react-router-dom';

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
import { Button } from './ui/button';

const Navbar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleLogout() {
    toast({
      description: 'Logout Successfully',
    });
  }

  return (
    <header
      className="bg-white/90 w-full top-0 z-50 sticky"
      aria-label="navbar"
    >
      <nav className="flex [&>*]:font-semibold mx-auto w-full p-6 [&>*]:text-gray-900 [&>*]:leading-6 items-center justify-end lg:px-8">
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
            <DropdownMenuItem
              onClick={() => navigate('/scheduling/schedule_list')}
            >
              Jadwal Saya
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleLogout()}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  );
};

export default Navbar;
