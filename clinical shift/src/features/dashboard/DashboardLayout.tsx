import { Outlet } from "react-router-dom";
import Header from "../../shared/components/layout/Header";
import Sidebar from "../../shared/components/layout/Sidebar";

export function DashboardLayout (){
    return(
        <div className="flex h-screen flex-col bg-slate-100">
            <Header />

            <div className="flex flex-1 overflow-hidden">
               <Sidebar />
               <main className="flex-1 overflow-y-auto p-6">
                <Outlet />

               </main>
            </div>
        </div>
    )
}

//Outlet is a placeholder component provided by 
// React Router that renders matched child routes 
// inside a parent layout.