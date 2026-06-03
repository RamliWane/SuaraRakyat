import NavbarHome from "../../components/client/NavbarHome";
import SideBar from "../../components/client/SideBar";
import { getAllLaporanSaya } from "../../../lib/api/laporan";
import { getUsersById } from "../../../lib/api/users";

export default async function Profile() {
    let user = null;
    let laporan = [];

    try {
        user = await getUsersById();
        laporan = await getAllLaporanSaya();
    } catch (err) {
        console.error(err.message);
    }

    const selesai  = laporan.filter(d => d.status === "selesai").length;
    const pending  = laporan.filter(d => d.status === "pending").length;
    const diproses = laporan.filter(d => d.status === "diproses").length;

    const avatarColors = ["bg-violet-100 text-violet-700", "bg-teal-100 text-teal-700", "bg-amber-100 text-amber-700", "bg-rose-100 text-rose-700", "bg-sky-100 text-sky-700"];
    const avatarColor = user ? avatarColors[user.username.charCodeAt(0) % avatarColors.length] : "bg-gray-100 text-gray-500";

    return (
        <div className="h-screen flex flex-col overflow-hidden text-black bg-gray-50">
            {/* <NavbarHome /> */}
            <div className="flex flex-1 overflow-hidden">
                <SideBar className="flex-0" />

                <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar">
                    <div className="max-w-4xl mx-auto p-6 flex flex-col gap-5">

                        {/* Header */}
                        <div>
                            <h1 className="text-[20px] font-bold text-gray-900">Profile</h1>
                            <p className="text-sm text-gray-400 mt-0.5">Informasi akun dan aktivitas lo</p>
                        </div>

                        {/* Profile card */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center gap-5">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold shrink-0 ${avatarColor}`}>
                                {user?.username?.charAt(0).toUpperCase() ?? "?"}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <h2 className="text-[18px] font-bold text-gray-900">{user?.username ?? "-"}</h2>
                                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${user?.role === "admin" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-gray-100 text-gray-500 border border-gray-200"}`}>
                                        {user?.role ?? "user"}
                                    </span>
                                </div>
                                <p className="text-[13px] text-gray-400 flex items-center gap-1">
                                    <i className="ti ti-mail text-[12px]" />
                                    {user?.email ?? "-"}
                                </p>
                                <p className="text-[12px] text-gray-400 flex items-center gap-1 mt-0.5">
                                    <i className="ti ti-calendar text-[12px]" />
                                    Bergabung {user?.create_at ? new Date(user.create_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "-"}
                                </p>
                            </div>
                            <button className="flex items-center gap-1.5 text-[12px] font-medium text-gray-600 border border-gray-200 bg-gray-50 hover:bg-gray-100 rounded-xl px-4 py-2 transition-colors cursor-pointer shrink-0">
                                <i className="ti ti-edit text-sm" />
                                Edit Profile
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                            {[
                                { label: "Total Laporan", value: laporan.length, icon: "ti-file-description", cls: "text-gray-600 bg-gray-100" },
                                { label: "Pending", value: pending, icon: "ti-clock", cls: "text-amber-600 bg-amber-50" },
                                { label: "Diproses", value: diproses, icon: "ti-loader", cls: "text-blue-600 bg-blue-50" },
                                { label: "Selesai", value: selesai, icon: "ti-circle-check", cls: "text-emerald-600 bg-emerald-50" },
                            ].map((s) => (
                                <div key={s.label} className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-3">
                                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${s.cls}`}>
                                        <i className={`ti ${s.icon} text-base`} />
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-gray-400">{s.label}</p>
                                        <p className="text-[20px] font-bold text-gray-900 leading-tight">{s.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Info */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col gap-4">
                            <h3 className="text-[13px] font-semibold text-gray-900">Informasi Akun</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { label: "Username", value: user?.username, icon: "ti-user" },
                                    { label: "Email", value: user?.email, icon: "ti-mail" },
                                    { label: "Role", value: user?.role, icon: "ti-shield" },
                                    { label: "Bergabung", value: user?.create_at ? new Date(user.create_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "-", icon: "ti-calendar" },
                                ].map((item) => (
                                    <div key={item.label} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                                        <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0">
                                            <i className={`ti ${item.icon} text-sm text-gray-500`} />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[10px] text-gray-400 uppercase tracking-wider">{item.label}</p>
                                            <p className="text-[13px] font-medium text-gray-800 truncate">{item.value ?? "-"}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}