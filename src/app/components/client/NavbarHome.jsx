import Image from "next/image";
export default function NavbarHome() {
    return (
        <div className="w-full h-16 bg-white flex items-center justify-between px-6 py-2 border-b border-gray-300 ">
            <div className="flex items-center gap-8">
                <h1 className="font-bold text-[20px] text-blue-600">ReadMy Library</h1>
            </div>

            <div className="flex text-[13px] font-bold gap-2">
                <h1 className="text-[11px] font-bold cursor-pointer pt-4">
                    OBSESSED
                </h1>
                <div className="bg-gray-200 rounded-full border border-gray-300 w-8 h-8 mt-2 flex items-center justify-center cursor-pointer">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="w-6 h-6 cursor-pointer hover:text-blue-600"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 17a3 3 0 006 0"
                        />
                    </svg>
                </div>
                <Image
                    src="/reze.jpg"
                    width={48}
                    height={48}
                    className="rounded-full cursor-pointer"
                    alt="profile"
                />
                <div className="flex flex-col pt-1">
                    <h1>
                        Ramli
                    </h1>
                    <h1>
                        Admin
                    </h1>
                </div>
            </div>

        </div>
    );
}