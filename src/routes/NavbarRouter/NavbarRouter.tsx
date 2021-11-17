import { Routes, Route, Navigate } from "react-router-dom";
import NotFoundPage from "../../pages/NotFoundPage";
import ScoreboardPage from "../../pages/ScoreboardPage";
import { getPath } from "../../functions/getPath";
import Navbar from "../../components/Navbar";

export interface INavbarRouter {}

export const NavbarRouter = (props: INavbarRouter) => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route
                    path={getPath({ key: "root" })}
                    element={<Navigate to={getPath({ key: "scoreboard" })} />}
                />
                <Route
                    path={getPath({ key: "notfound" })}
                    element={<NotFoundPage />}
                />
                <Route
                    path={getPath({ key: "scoreboard" })}
                    element={<ScoreboardPage />}
                />
            </Routes>
        </>
    );
};
