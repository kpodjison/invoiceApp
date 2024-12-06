import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { Link, router, usePage } from "@inertiajs/react";
import axios from "axios";

const SideBar = () => {
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
        <section className="sidebar z-20">
            <nav className="flex flex-col gap-4">
                <Link
                    href="/admin"
                    className="mb-1 flex cursor-pointer items-center gap-1"
                >
                    <img
                        src="/storage/ivapp-logo.png"
                        width={50}
                        height={50}
                        className="rounded"
                    />
                    <h1 className="text-[1rem] 2xl:text-[1.3rem] text-black font-bold me-8 ">
                        INVOICE&nbsp;APP
                    </h1>
                </Link>
                {sidebarLinks.map((item) => {
                    return (
                        <Link
                            href={item.route}
                            key={item.label}
                            className={cn("sidebar-link", {
                                "vista-bg-gradient": isActive(item.route),
                            })}
                        >
                            <div className="relative size-6">
                                <img
                                    src={item.imgUrl}
                                    alt={item.label}
                                    className={cn({
                                        "brightness-[3] invert-0": isActive(
                                            item.route
                                        ),
                                    })}
                                />
                            </div>
                            <p
                                className={cn("sidebar-label !font-semibold", {
                                    "!text-white": isActive(item.route),
                                })}
                            >
                                {item.label}
                            </p>
                        </Link>
                    );
                })}
            </nav>
            <button
                className="bg-red-500 p-2 rounded text-center font-semibold sidebar-link"
                onClick={handleLogout}
            >
                <div className="relative size-6">
                    <img src="/storage/icons/logout.svg" alt="expenditure" />
                </div>
                <span className="sidebar-label !font-semibold !text-white">
                    Logout
                </span>
            </button>
        </section>
    );
};

export default SideBar;
