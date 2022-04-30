import style from '@/styles/Layout.module.css'
import { Modal, Pagination, Table} from "@/components"
export function Layout({children}) {
    return (
        <div className={style.container}>
            <main className={style.main}>{children}</main>
            <Table/>
            <Pagination/>
            <Modal/>
        </div>
    )
}