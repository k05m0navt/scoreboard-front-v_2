import { NavLink } from "react-router-dom";
import { getPath } from "../../functions/getPath";

export interface INavbar {}

export const Navbar = (props: INavbar) => {
    const menuLinks: { key: number; route: string; text: string }[] = [
        {
            key: 0,
            route: getPath({ key: "scoreboard" }),
            text: "Scoreboard",
        },
    ];

    return (
        <header className="lg:px-16 px-6 lg:py-4 py-5 bg-white flex flex-wrap items-center justify-between w-screen z-10 shadow-lg sticky top-0">
            <NavLink
                to={getPath({ key: "scoreboard" })}
                className="text-gray-800 hover:text-gray-800"
            >
                <p className="m-0 text-xl">PokerInno</p>
            </NavLink>

            <div
                className="hidden lg:flex lg:items-center lg:w-auto w-full"
                id="menu"
            >
                <nav>
                    <ul className="lg:flex items-center justify-between text-base text-gray-700 pt-4 lg:pt-0 space-x-5 m-0">
                        {menuLinks.map((ml) => {
                            return (
                                <NavLink
                                    key={ml.key}
                                    to={ml.route}
                                    className="text-gray-900 hover:text-gray-400"
                                >
                                    <li>{ml.text}</li>
                                </NavLink>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </header>
    );
};
