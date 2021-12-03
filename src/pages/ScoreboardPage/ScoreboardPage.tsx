import ScoreTable from "../../components/ScoreTable";

export interface IScoreboardPage {}

export const ScoreboardPage = (props: IScoreboardPage) => {
    return (
        <div className="lg:mx-16 mx-6 mt-6">
            <div className="flex justify-center">
                <p className="text-2xl">Scores of the month</p>
            </div>
            <ScoreTable />
        </div>
    );
};
