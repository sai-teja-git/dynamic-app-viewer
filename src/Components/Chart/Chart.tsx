import ReactEcharts from "echarts-for-react";
import { Button } from "primereact/button";
import { Skeleton } from "primereact/skeleton";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { chartService } from "./chart.service";
import moment from "moment-timezone"

interface IChartProps {
    type: string,
    id: string
}

export default function Chart({ type, id }: IChartProps) {

    const [loadChart, setLoadChart] = useState(true);
    const [chartOptions, setChartOptions] = useState<any>(null);
    const [lastUpdated, setLastUpdated] = useState("");

    useEffect(() => {
        getChartData()
    }, []);

    const showInfo = () => {
        toast.info(`Chart Last Updated On : ${lastUpdated}`, {
            duration: 2000,
            id
        });
    }

    const createChartObj = (category: string[], seriesData: any[]) => {
        return {
            xAxis: {
                type: 'category',
                data: category
            },
            yAxis: {
                type: 'value'
            },
            tooltip: {
                formatter: (params: any) => {
                    const data = params.data
                    return `
                <h3>${params.name}</h3>
                <div>Duration : ${data.displayValue}</div>
                `
                },
            },
            series: [
                {
                    data: seriesData,
                    type: type
                }
            ]
        }
    }

    const getChartData = async () => {
        setLoadChart(true)
        await chartService.monthChartData().then((res: any) => {
            const data = res.data?.data ?? [];
            const category = [];
            const seriesData = [];
            for (let item of data) {
                category.push(item.category);
                seriesData.push({
                    value: item.value,
                    displayValue: `${item.value} M`
                })
            }
            setChartOptions(createChartObj(category, seriesData))
            setLoadChart(false)
        })
        setLastUpdated(moment().format("DD-MM-YYYY HH:mm:ss"))
    }

    return (
        <>
            <div style={{ height: "calc(100% - 50px)", width: "100%" }}>
                <div className="mb-3 text-right">
                    <Button label="Info" severity="info" onClick={showInfo} className="mr-2" size="small" />
                    <Button label="Refresh" icon="pi pi-refresh" style={{ marginLeft: '0.5em' }} size="small" onClick={() => getChartData()}
                        disabled={loadChart} />
                </div>
                {
                    (loadChart || !chartOptions) ? <Skeleton width="100%" height="inherit"></Skeleton> :
                        <ReactEcharts option={chartOptions} style={{ height: "100%" }} />

                }
            </div>
        </>
    )
}
