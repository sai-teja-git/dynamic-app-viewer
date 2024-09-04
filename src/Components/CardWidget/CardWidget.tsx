import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Skeleton } from 'primereact/skeleton';
import { useEffect, useState } from 'react';
import { cardService } from './card.service';
import "./CardWidget.scss";

interface ICardProps {
    type: string,
    title: string,
    id: string
}

export default function CardWidget({ type, title, id }: ICardProps) {

    const [loadKpiCard, setLoadKpiCard] = useState(false);
    const [kpiValue, setKpiValue] = useState<null | number>(null);

    useEffect(() => {
        type === "KPI" && getKpiValue();
    }, [])

    const getKpiValue = async () => {
        setLoadKpiCard(true);
        await cardService.getKpiValue().then((res) => {
            setKpiValue(res.data?.data ?? null)
        }).catch(() => {
            setKpiValue(null)
        })
        setLoadKpiCard(false);
    }

    return (
        <div className="card" id={id}>
            {
                type === "DATA" ?
                    <Card title={title}>
                        <p className="m-0">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae
                            numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
                        </p>
                    </Card>
                    :
                    <div className="kpi-block">
                        <div className="kpi-header">
                            <div className="title">
                                {title}
                            </div>
                            <div className="kpi-refresh">
                                <Button icon="pi pi-refresh" rounded outlined aria-label="Filter" size='small' tooltip='Refresh' onClick={getKpiValue} />
                            </div>
                        </div>
                        <div className="value">
                            {loadKpiCard ? <Skeleton height="1.5rem" width='30%'></Skeleton> :
                                <>
                                    {kpiValue !== null ? (kpiValue.toFixed(2) + "%") : "----"}
                                </>
                            }

                        </div>
                    </div>
            }
        </div>
    )
}
