import { ProgressSpinner } from "primereact/progressspinner";
import { ReactNode, useEffect, useState } from "react";
import GridLayout from "react-grid-layout";
import { useLocation } from "react-router-dom";
import CardWidget from "../../Components/CardWidget/CardWidget";
import Chart from "../../Components/Chart/Chart";
import NoData from "../../Components/NoData/NoData";
import Table from "../../Components/Table/Table";
import { getMenuScreenById } from "./menu-screen-mapping.service";
import "./MenuScreen.scss";

export default function PageView() {

    const location = useLocation();
    const [layout, setLayout] = useState<any[]>([]);
    const [layoutData, setLayoutData] = useState<Record<string, any>>({});
    const [apiLoader, setApiLoader] = useState(true);
    const [selectedMenu, setMenu] = useState<any | null>(null);


    useEffect(() => {
        setMenu(location.state)
    }, [location])

    useEffect(() => {
        getMenuLayout()
    }, [selectedMenu])

    const getMenuLayout = () => {
        if (!selectedMenu) {
            return
        }
        setApiLoader(true)
        getMenuScreenById(selectedMenu._id).then(res => {
            const data = res.data.data
            setLayout(data.layout)
            setLayoutData(data.data)
            setApiLoader(false);
        }).catch(() => {
            setLayout([])
            setLayoutData({})
            setApiLoader(false);
        })
    }

    const getNodeData = (data: any, id: string) => {
        const component = data?.selected?.data ?? {}
        if (component.type === "graph") {
            return <Chart type={component.graph} id={id} />
        } else if (component.type === "table") {
            return <Table id={id} />
        } else if (component.type === "card") {
            return <CardWidget type={component.card} title={component.title} id={id} />
        }
    }

    function getElements(): ReactNode[] {
        return layout.map((e: any) => (
            <div className="block" key={e.i}>
                {
                    layoutData[e.i]?.selected ?
                        <>
                            {getNodeData(layoutData[e.i], e.i)}
                        </>
                        :
                        <>
                            <h2>N/A</h2>
                        </>
                }
            </div>
        ))
    }

    return (
        <>
            <div className="page-header">
                <div className="title">
                    {selectedMenu?.name}
                </div>
                <div className="options">
                </div>
            </div>
            <div className="page-body">
                {
                    apiLoader ? <div className="h-full w-full flex align-items-center justify-content-center">
                        <ProgressSpinner />
                    </div>
                        :
                        <>
                            {
                                (layout.length) ?
                                    <GridLayout className="layout" cols={12} rowHeight={50} width={screen.width - 80} layout={layout} isDraggable={false} isBounded={true} isDroppable={false} isResizable={false}>
                                        {...getElements()}
                                    </GridLayout> :
                                    <div className="col-12">
                                        <NoData title="No Data" text="Data Not Available" />
                                    </div>
                            }
                        </>
                }
            </div>
            {/*  */}
        </>
    )
}
