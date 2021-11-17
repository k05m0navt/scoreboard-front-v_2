import { NavLink } from "react-router-dom";
import { getPath } from "../../functions/getPath";

export interface INavbar {}

export const Navbar = (props: INavbar) => {
    const menuLinks: { route: string; text: string }[] = [
        {
            route: getPath({ key: "scoreboard" }),
            text: "Scoreboard",
        },
    ];

    return (
        <header className="lg:px-28 lg:py-3 bg-white flex flex-wrap items-center justify-between w-screen z-10 shadow-lg">
            <NavLink
                to={getPath({ key: "root" })}
                className="text-gray-800 hover:text-gray-800"
            >
                <p className="m-0 text-xl">PokerInno</p>
            </NavLink>

            <nav>
                <ul className="lg:flex items-center justify-between text-base text-gray-700 pt-4 lg:pt-0 space-x-5 m-0">
                    {menuLinks.map((ml) => {
                        return (
                            <NavLink
                                to={ml.route}
                                className="text-gray-900 hover:text-gray-400"
                            >
                                <li>{ml.text}</li>
                            </NavLink>
                        );
                    })}
                </ul>
            </nav>
        </header>
    );
};
