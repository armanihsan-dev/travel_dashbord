import React from 'react'
import {Outlet, redirect} from "react-router-dom";
import {SidebarComponent} from "@syncfusion/ej2-react-navigations";
import {MobileSideBar, NavItems} from "../../../components";
import {clientLoader} from "~/loaders/clinetLoader";


const AdminLayout = () => {
    return (
        <div className='admin-layout'>
            <MobileSideBar/>
            <aside className='w-full max-w-[270px] hidden lg:block'>
                <SidebarComponent width='270' enableGestures={false}>
                        <NavItems/>
                </SidebarComponent>
            </aside>
            <aside className="children">
                <Outlet />
            </aside>
        </div>
    )
}
export {clientLoader}
export default AdminLayout
