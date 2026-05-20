import SidebarAdmin from '../../components/admin/SideBarAdmin';
import NavbarHome from '../../components/client/NavbarHome';
import ReportPending from "../../components/admin/ReportPending";

export default async function KatalogClone() {
    return (
        <div className="h-screen flex flex-col overflow-hidden text-black">
            <NavbarHome />
            <div className="flex flex-1 overflow-hidden">
                <SidebarAdmin />
                <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar p-6 gap-4">
                    <div>
                        <h1 className="text-xl font-medium">Submission Pending</h1>
                        <p className="text-[14px]" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                        </p>
                    </div>
                    <hr className="border-t border-black" />
                    <ReportPending />
                </div>
            </div>
        </div>
    )
}