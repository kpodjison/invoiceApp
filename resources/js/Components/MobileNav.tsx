import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/Components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { Link, router } from "@inertiajs/react";
import axios from "axios";

const MobileNav = () => {
      const currentPath = window.location.href;

      const isActive = (url: string): boolean => {
          return currentPath.includes(url);
    };
          const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
              axios
                  .post("/logout")
                  .then((res) => {
                      router.visit("/login/admin");
                  })
                  .catch((error) => {
                      // console.log('Error',error)
                  });
          };
    return (
        <section>
            <Sheet>
                <SheetTrigger>
                    <img
                        src="/storage/icons/hamburger.svg"
                        width={30}
                        height={30}
                        alt="menu"
                        className="curson-pointer"
                    />
                </SheetTrigger>
                <SheetContent side="left" className="border-none bg-white">
                    <Link
                        href="/admin"
                        className="mb-12 flex cursor-pointer items-center gap-2"
                    >
                        <img
                            src="/storage/ivapp-logo.png"
                            width={50}
                            height={50}
                            className="rounded"
                        />
                        <h1
                            className="2xl:text-[1.5rem] text-black font-bold 
                            "
                        >
                            SPG CLEANINGS
                        </h1>
                    </Link>
                    <div className="mobilenav-sheet">
                        <SheetClose asChild>
                            <nav className="flex flex-col gap-4">
                                {sidebarLinks.map((item) => {
                                    return (
                                        <SheetClose asChild key={item.route}>
                                            <Link
                                                href={item.route}
                                                key={item.label}
                                                className={cn(
                                                    "mobilenav-sheet_close w-full",
                                                    {
                                                        "vista-bg-gradient":
                                                            isActive(
                                                                item.route
                                                            ),
                                                    }
                                                )}
                                            >
                                                <img
                                                    src={item.imgUrl}
                                                    alt={item.label}
                                                    className={cn({
                                                        "brightness-[3] invert-0":
                                                            isActive(
                                                                item.route
                                                            ),
                                                    })}
                                                    width={20}
                                                    height={20}
                                                />
                                                <p
                                                    className={cn(
                                                        "text-[16px] font-semibold",
                                                        {
                                                            "!text-white":
                                                                isActive(
                                                                    item.route
                                                                ),
                                                        }
                                                    )}
                                                >
                                                    {item.label}
                                                </p>
                                            </Link>
                                        </SheetClose>
                                    );
                                })}
                                <div>
                                    <button
                                        className="bg-red-500 p-2 h-14 rounded text-center font-semibold sidebar-link w-full mt-10"
                                        onClick={handleLogout}
                                    >
                                        <div className="relative size-6">
                                            <img
                                                src="/storage/icons/logout.svg"
                                                alt="expenditure"
                                            />
                                        </div>
                                        <span className="sidebar-label !font-semibold !text-white">
                                            Logout
                                        </span>
                                    </button>
                                </div>
                            </nav>
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    );
};

export default MobileNav;
