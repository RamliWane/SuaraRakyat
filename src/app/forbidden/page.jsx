import Link from "next/link";

export default function Forbidden() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
            <div className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl rounded-3xl p-10 flex flex-col items-center text-center max-w-md w-full gap-6">

                {/* ICON */}
                <div className="w-20 h-20 rounded-3xl bg-red-100 flex items-center justify-center shadow-inner">
                    <i className="ti ti-lock-x text-4xl text-red-500" />
                </div>

                {/* TEXT */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">
                        403 - Akses Denied
                    </h1>

                </div>

                {/* ACTION */}
                <div className="flex gap-3 mt-2 w-full">
                    <Link
                        href="/client/homepage"
                        className="flex-1 flex items-center justify-center gap-2 text-sm font-medium text-white bg-[#A2CB8B] hover:bg-[#A2CB8B]/70 active:scale-95 rounded-xl px-5 py-2.5 transition-all shadow-md"
                    >
                        <i className="ti ti-home text-base" />
                        Homepage
                    </Link>

                    <Link
                        href="/"
                        className="flex-1 flex items-center justify-center gap-2 text-sm font-medium text-gray-600 border border-gray-200 bg-gray-50 hover:bg-gray-100 active:scale-95 rounded-xl px-5 py-2.5 transition-all"
                    >
                        <i className="ti ti-logout text-base" />
                        Logout
                    </Link>
                </div>

                {/* SMALL NOTE */}
                <p className="text-[11px] text-gray-400 mt-2">
                    Error Code: 403 Forbidden
                </p>
            </div>
        </div>
    );
}