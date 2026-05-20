"use client"

import { useRouter } from "next/navigation";



export default function SubmissionPending() {

  const router = useRouter();

  const dataDummy = [
    {
    id: 1,
    gambarUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj7_AdcIkRmwNNu0F5qk6xf1wLZ8mU3yi-2g&s",
    username: "Ramli",
    laporan: "Laporan",
    categories: "Infrastruktur",
    urgentas: "Urgent",
    alamat: "Jalan Rusak di Jl. Sudirman",
  },

]

  return (
 <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="grid grid-cols-[0.5fr_2fr_2fr_2fr_2fr_2fr_1fr] px-6 py-3 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
        <span>No</span>
        <span>Gambar</span>
        <span>Username</span>
        <span>Alamat</span>
        <span>Kategori</span>
        <span>Urgentas</span>
        <span>Action</span>
      </div>

      {dataDummy.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Tidak Ada Laporan!!</h3>
          <p className="text-gray-500 text-center max-w-md">
            Saat ini tidak ada Laporan yang tersedia.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {dataDummy.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[0.5fr_2fr_2fr_2fr_2fr_2fr_1fr] px-6 py-4 hover:bg-gray-50 transition-colors duration-150 items-center"
            >
                <span className="text-sm text-gray-500">{index + 1}</span>

                <img className="w-12 h-15" src={item.gambarUrl} alt="" />

                <span className=" text-gray-600 text-sm">{item.username}</span>

                <span className="text-sm text-gray-600">{item.alamat}</span>

                <span className="text-sm text-gray-600">{item.categories}</span>

                <span className="text-sm text-gray-600">{item.urgentas}</span>


                <span className="text-sm text-gray-600 flex gap-2">
                  <button onClick={() => router.push("/admin/detailreportpending")} className="bg-green-600 text-white px-2 py-1 rounded-lg hover:bg-green-700">Manage</button>
                </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}