"use client"
import { useState, useEffect } from "react";

export default function SubmissionPending() {

  const [data, setData] = useState([]);

  const fetchPending = async () => {
    try {
      const res = await fetch("http://localhost:5000/peminjaman/pending");
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const approve = async (id) => {
    try {
     await fetch(`http://localhost:5000/peminjaman/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: "accept"
      })
    });

      fetchPending();
    } catch (err) {
      console.log(err);
    }
  };
  
  const reject = async (id) => {
    try {
     await fetch(`http://localhost:5000/peminjaman/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: "reject"
      })
    });

      fetchPending();
    } catch (err) {
      console.log(err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
 <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="grid grid-cols-[0.5fr_2fr_2fr_2fr_2fr_2fr] px-6 py-3 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
        <span>No</span>
        <span>Username</span>
        <span>Laporan</span>
        <span>Pengajuan</span>
        <span>Alamat</span>
        <span>Action</span>
      </div>

      {data.length === 0 ? (
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
          {data.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[0.5fr_2fr_2fr_2fr_2fr_2fr] px-6 py-4 hover:bg-gray-50 transition-colors duration-150 items-center"
            >
              <span className="text-sm text-gray-500">{index + 1}</span>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600 shrink-0">
                   {item.username.charAt(0).toUpperCase()}
                </div>
                <span className="font-semibold text-gray-800 text-sm">{item.username}</span>
              </div>

              <span className="text-sm text-gray-600">{item.judul_buku}</span>

              <span className="text-sm text-gray-600">Durasi : {item.durasi_pinjam} Hari</span>

              <span className="text-sm text-gray-600">{formatDate(item.tgl_jatuh_tempo)}</span>

              <span className="text-sm text-gray-600 flex gap-2">
                <button onClick={() => approve(item.id)} className="bg-green-600 text-white px-2 py-1 rounded-lg hover:bg-green-700">Acc</button>
                <button onClick={() => reject(item.id)} className="bg-red-600 text-white px-2 py-1 rounded-lg hover:bg-red-700">Reject</button>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}