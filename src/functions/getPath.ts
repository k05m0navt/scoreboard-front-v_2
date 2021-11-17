import { paths } from "./../constants/paths";

export interface IGetPathProps {
    key: string;
}

export const getPath = (props: IGetPathProps): string => {
    const path: string = paths[props.key];

    return path;
};
