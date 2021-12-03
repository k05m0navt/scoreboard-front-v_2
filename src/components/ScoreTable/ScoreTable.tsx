import { Input, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {
    ColumnFilterItem,
    FilterConfirmProps,
    SortOrder,
} from "antd/lib/table/interface";
import { useEffect, useState } from "react";
import useGoogleSheets from "use-google-sheets";

export interface IScoreTable {}

interface IPerson {
    Person: string;
    Total: number;
    Bonus: number;
}

interface ITableRow {
    key: number;
    name: string;
    score: number;
    bonus: number;
}

interface FilterDropdownProps {
    prefixCls: string;
    setSelectedKeys: (selectedKeys: React.Key[]) => void;
    selectedKeys: React.Key[];
    confirm: (param?: FilterConfirmProps) => void;
    clearFilters?: () => void;
    filters?: ColumnFilterItem[];
    visible: boolean;
}

export const ScoreTable = (props: IScoreTable) => {
    const { data, loading } = useGoogleSheets({
        apiKey: process.env.REACT_APP_GOOGLE_API_KEY || "",
        sheetId: process.env.REACT_APP_GOOGLE_SHEETS_ID || "",
    });

    const [d, setD] = useState<ITableRow[]>([]);

    useEffect(() => {
        if (!loading) {
            let tableData: ITableRow[] = [];
            (data[0].data as IPerson[]).map((person, index) =>
                tableData.push({
                    key: index + 1,
                    name: person["Person"],
                    score: person["Total"],
                    bonus: person["Bonus"],
                })
            );
            setD(tableData);
        }
    }, [data, loading]);

    const columns = [
        // {
        //     title: "Place",
        //     dataIndex: "key",
        //     key: "key",
        //     render: (text: string) => <p className="">{text}</p>,
        // },
        {
            title: "Name",
            dataIndex: "name",
            key: "key",
            width: "33vw",
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
            }: FilterDropdownProps) => (
                <Input
                    value={selectedKeys[0]}
                    onChange={(e) => {
                        setSelectedKeys(e.target.value ? [e.target.value] : []);
                        confirm({ closeDropdown: false });
                    }}
                    onPressEnter={() => {
                        confirm();
                    }}
                    onBlur={() => {
                        confirm();
                    }}
                    autoFocus
                    placeholder="Type name here..."
                />
            ),
            filterIcon: () => <SearchOutlined />,
            onFilter: (value: string | number | boolean, record: ITableRow) => {
                return record.name
                    .toLowerCase()
                    .includes(
                        typeof value == "string"
                            ? value.toLowerCase()
                            : value.toString()
                    );
            },
            render: (text: string) => (
                <p className="flex m-1 align-middle">{text}</p>
            ),
        },
        {
            title: "Total score",
            dataIndex: "score",
            key: "key",
            width: "33vw",
            defaultSortOrder: "descend" as SortOrder,
            sorter: (a: ITableRow, b: ITableRow) => a.score - b.score,
            render: (text: string) => (
                <p className="flex m-0 align-middle">{text}</p>
            ),
        },
        {
            title: "Bonus score",
            dataIndex: "bonus",
            key: "key",
            width: "33vw",
            render: (text: string) => (
                <p className="flex m-0 align-middle">{text}</p>
            ),
        },
        // {
        //     title: "Debts",
        //     dataIndex: "debts",
        //     key: "debts",
        //     render: (text: string) => (
        //         <p className="flex justify-center">{text}</p>
        //     ),
        // },
    ];

    return (
        <Table
            loading={loading}
            dataSource={d}
            columns={columns}
            bordered
            pagination={{ pageSize: 10, position: ["bottomRight"] }}
            rowKey={(record) => record.key}
        />
    );
};
