import { Link, useNavigate } from "react-router-dom";
import { MenuIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useSidebarStore } from "@/components/sidebar";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/utils/states";

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
      description: "Logout Successfully",
    });
    resetAuth();
    role === "patient" ? navigate("/login") : navigate("/dashboard/login");
  }

  return (
    <header
      className="sticky z-40 top-0 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      aria-label="navbar"
    >
      <div className="container flex h-14 items-center px-8">
        <div className="mr-4 flex">
          {showMenu ? (
            <MenuIcon onClick={() => changeSidebarOpen()} />
          ) : (
            <Link className="mr-6 flex items-center space-x-2" to="/">
              <img
                src="/images/logo-blue.svg"
                alt="Logo"
                className="h-12 w-12"
              />
            </Link>
          )}
        </div>
        <div className="flex gap-4 items-center justify-end h-full w-full">
          {!role || role === "patient" ? (
            <Button variant="link" asChild>
              <Link className="text-lg tracking-widest" to="/contact-us">
                Kontak Kami
              </Link>
            </Button>
          ) : null}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarFallback>KS</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44" align="end" forceMount>
              {token ? (
                <>
                  <DropdownMenuLabel>Halo, {name}!</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {role !== "patient" ? (
                    <DropdownMenuItem
                      onClick={() => navigate("/dashboard/settings")}
                    >
                      Setting
                    </DropdownMenuItem>
                  ) : (
                    <>
                      <DropdownMenuItem onClick={() => navigate("/profile")}>
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => navigate("/scheduling/my-list")}
                      >
                        Jadwal Saya
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuItem onClick={() => handleLogout()}>
                    Logout
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem onClick={() => navigate("/login")}>
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
