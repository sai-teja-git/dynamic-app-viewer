import { DataTable, DataTableValue } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { useEffect, useState } from 'react';
import { Skeleton } from 'primereact/skeleton';
import { tableService } from './table.service';
import moment from "moment-timezone"
import { toast } from 'sonner';

interface ITableProps {
    id: string
}

interface Product {
    id: string;
    code: string;
    name: string;
    description: string;
    image: string;
    price: number;
    category: string;
    quantity: number;
    inventoryStatus: string;
    rating: number;
}

/**
 * Common Table Component
 */
export default function Table({ id }: ITableProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loadTable, setLoadTable] = useState(true);
    const [lastUpdated, setLastUpdated] = useState("");

    useEffect(() => {
        getTableData()
    }, []);

    const getTableData = async () => {
        setLoadTable(true)
        await tableService.tableData().then((res: any) => {
            setProducts(res.data?.data ?? []);
            setLoadTable(false)
        }).catch(() => {
            setProducts([])
        });
        setLastUpdated(moment().format("DD-MM-YYYY HH:mm:ss"))
    }

    const formatCurrency = (value: number) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'INR' });
    };

    const priceBodyTemplate = (product: Product) => {
        return formatCurrency(product.price);
    };

    const ratingBodyTemplate = (product: Product) => {
        return <Rating value={product.rating} readOnly cancel={false} />;
    };

    const statusBodyTemplate = (product: Product) => {
        return <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>;
    };

    const getSeverity = (product: Product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    const showInfo = () => {
        toast.info(`Table Last Updated On : ${lastUpdated}`, {
            duration: 2000,
            id
        });
    }

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Products</span>
            <div className='flex align-items-center'>
                <Button label="Info" severity="info" onClick={showInfo} className="mr-2" size="small" />
                <Button icon="pi pi-refresh" rounded raised onClick={getTableData} />
            </div>
        </div>
    );
    const footer = `In total there are ${products ? products.length : 0} products.`;

    const tableLoaderTemplate = () => {
        const items: DataTableValue[] = Array.from({ length: 10 }, (_v, i) => ({ i }));
        return <>
            <DataTable value={items}>
                <Column field="name" header="Name" body={<Skeleton />}></Column>
                <Column field="price" header="Price" body={<Skeleton />} ></Column>
                <Column field="category" header="Category" body={<Skeleton />}></Column>
                <Column field="rating" header="Reviews" body={<Skeleton />} ></Column>
                <Column header="Status" body={<Skeleton />} ></Column>
            </DataTable>
        </>
    }

    return (
        <>
            <div className="card h-full w-full overflow-auto">
                {
                    loadTable ? tableLoaderTemplate() :
                        <DataTable value={products} header={header} footer={footer} tableStyle={{ minWidth: '60rem' }}>
                            <Column field="name" header="Name"></Column>
                            <Column field="price" header="Price" body={priceBodyTemplate}></Column>
                            <Column field="category" header="Category"></Column>
                            <Column field="rating" header="Reviews" body={ratingBodyTemplate}></Column>
                            <Column header="Status" body={statusBodyTemplate}></Column>
                        </DataTable>
                }

            </div>
        </>
    )
}
