import { Params, useMatches, useLoaderData } from "react-router-dom";
import { ReactNode, useEffect } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sidebar } from "@/components/sidebar";
import Navbar from "@/components/navbar";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  variant?: "default" | "admin";
  centerY?: boolean;
  centerX?: boolean;
  className?: string;
}

interface IMatches {
  id: string;
  pathname: string;
  params: Params<string>;
  data: unknown;
  handle: unknown;
}

type HandleType = {
  crumb: string;
};

export const Layout = (props: Readonly<Props>) => {
  const {
    children,
    variant = "default",
    centerY = false,
    centerX = false,
    className,
  } = props;
  let matches: IMatches[] = useMatches();
  const data = useLoaderData() as string;

  useEffect(() => {
    document.title = data || "Klinik Sehat";
  }, [data]);

  let crumbs = matches
    .filter((match) =>
      Boolean(match.handle && (match.handle as HandleType).crumb)
    )
    .map((match) => {
      const crumb = (match.handle as HandleType).crumb;
      return crumb;
    });

  return (
    <div
      className={cn(
        "bg-white h-dvh w-full [&>*]:text-health-blue-dark flex bg-[url(/images/pattern.svg)]",
        variant === "default" && "overflow-auto"
      )}
    >
      <div className="container h-full flex">
        {variant === "admin" ? <Sidebar /> : null}
        <div className="w-full h-full overflow-auto flex flex-col">
          <Navbar showMenu={variant === "admin"} />
          {variant === "admin" ? (
            <div className="w-full flex-1 p-5">
              <Card>
                <CardHeader>
                  <CardTitle>{crumbs[0]}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">{children}</CardContent>
              </Card>
            </div>
          ) : (
            <div
              className={cn(
                "w-full flex-1 flex flex-col relative",
                centerY && "justify-center",
                centerX && "items-center p-5",
                className
              )}
            >
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
