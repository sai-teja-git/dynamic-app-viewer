import { Card } from "primereact/card";

export default function StaticMenu() {
    const header = (
        <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
    );

    return (
        <div className="card flex justify-content-center w-full" >
            <Card title="Static Menu" subTitle="Card subtitle" header={header}>
                <p className="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae
                    numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
                </p>
            </Card>
        </div>
    )
}
