'use client';

import { useEffect, useState, useCallback } from 'react';
import SidebarAdmin from '../../components/admin/SideBarAdmin';
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell
} from 'recharts';

const POLL_INTERVAL = 30_000;

const STATUS_MAP = {
  pending:  { label: 'Pending',  cls: 'bg-[#FAEEDA] text-[#633806]' },
  diproses: { label: 'Diproses', cls: 'bg-[#E6F1FB] text-[#0C447C]' },
  selesai:  { label: 'Selesai',  cls: 'bg-[#EAF3DE] text-[#27500A]' },
  ditolak:  { label: 'Ditolak',  cls: 'bg-[#FCEBEB] text-[#A32D2D]' },
};

const CATEGORY_ICON = {
  Infrastruktur: { icon: 'ti-road',   bg: 'bg-amber-50 text-amber-600' },
  Lingkungan:    { icon: 'ti-leaf',   bg: 'bg-green-50 text-green-600' },
  Keamanan:      { icon: 'ti-shield', bg: 'bg-red-50 text-red-500' },
  Pendidikan:    { icon: 'ti-book',   bg: 'bg-blue-50 text-blue-600' },
};

const CATEGORY_COLORS = ['#DC9B9B', '#378ADD', '#6DC700', '#9E8D6E', '#a0aec0'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl px-3 py-2 shadow-sm text-xs">
        <p className="text-gray-500 mb-1">{label}</p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.color }} className="font-medium">
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'baru saja';
  if (m < 60) return `${m} menit lalu`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} jam lalu`;
  return `${Math.floor(h / 24)} hari lalu`;
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 animate-pulse">
      <div className="h-3 w-20 bg-gray-100 rounded mb-4" />
      <div className="h-8 w-14 bg-gray-100 rounded mb-3" />
      <div className="h-3 w-16 bg-gray-100 rounded-full" />
    </div>
  );
}

function SkeletonRow() {
  return (
    <div className="flex items-center gap-3 animate-pulse py-2">
      <div className="w-9 h-9 rounded-xl bg-gray-100 flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-3 w-40 bg-gray-100 rounded" />
        <div className="h-2.5 w-24 bg-gray-100 rounded" />
      </div>
      <div className="h-5 w-16 bg-gray-100 rounded-full" />
    </div>
  );
}

export default function DashboardClient({ initialData }) {
  const [data, setData]               = useState(initialData);
  const [lastUpdated, setLastUpdated] = useState(initialData ? new Date() : null);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const token = document.cookie
        .split('; ')
        .find((r) => r.startsWith('session_token='))
        ?.split('=')[1];

      if (!token) throw new Error('Token tidak ditemukan, silakan login ulang');

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) throw new Error('Sesi habis, silakan login ulang');
      if (!res.ok) throw new Error('Gagal memuat statistik admin');

      const json = await res.json();
      setData(json.data);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const id = setInterval(fetchStats, POLL_INTERVAL);
    return () => clearInterval(id);
  }, [fetchStats]);

  const stats    = data?.stats;
  const kategori = data?.kategori ?? [];
  const laporan  = data?.laporan_terbaru ?? [];

  // Data untuk BarChart kategori
  const kategoriChartData = kategori.map((k) => ({
    name: k.category_name,
    Laporan: k.count,
  }));

  // Data untuk donut-style summary (AreaChart status)
  const statusChartData = stats
    ? [
        { name: 'Pending',  value: stats.menunggu },
        { name: 'Diproses', value: stats.diproses },
        { name: 'Selesai',  value: stats.selesai },
      ]
    : [];

  const statCards = stats
    ? [
        {
          label:      'Total laporan',
          value:      stats.total.toLocaleString('id-ID'),
          badge:      `+${stats.hari_ini} hari ini`,
          badgeColor: 'bg-[#EAF3DE] text-[#27500A]',
          valueColor: 'text-gray-800',
          icon:       'ti-clipboard-list',
          iconBg:     'bg-gray-100 text-gray-500',
        },
        {
          label:      'Menunggu',
          value:      stats.menunggu.toString(),
          badge:      'Perlu ditinjau',
          badgeColor: 'bg-[#FAEEDA] text-[#633806]',
          valueColor: 'text-amber-500',
          icon:       'ti-clock-hour-4',
          iconBg:     'bg-amber-50 text-amber-500',
        },
        {
          label:      'Diproses',
          value:      stats.diproses.toString(),
          badge:      'Sedang berjalan',
          badgeColor: 'bg-[#E6F1FB] text-[#0C447C]',
          valueColor: 'text-blue-500',
          icon:       'ti-loader',
          iconBg:     'bg-blue-50 text-blue-500',
        },
        {
          label:      'Selesai',
          value:      stats.selesai.toString(),
          badge:      stats.total > 0
            ? `${((stats.selesai / stats.total) * 100).toFixed(1)}Selesai`
            : '0% resolusi',
          badgeColor: 'bg-[#EAF3DE] text-[#27500A]',
          valueColor: 'text-green-600',
          icon:       'ti-circle-check',
          iconBg:     'bg-green-50 text-green-500',
        },
      ]
    : [];

  return (
    <div className="h-screen flex flex-col overflow-hidden text-black">
      <div className="flex flex-1 overflow-hidden">
        <SidebarAdmin />

        <main className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar p-4 sm:p-6 space-y-5 bg-gray-50">

          {/* Header */}
          <section className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-lg font-semibold text-gray-800">Dashboard Admin</h1>
              <p className="text-xs text-gray-400 mt-0.5">
                {new Date().toLocaleDateString('id-ID', {
                  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
                })}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {lastUpdated && (
                <span className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  {lastUpdated.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                </span>
              )}
              <button
                onClick={fetchStats}
                disabled={loading}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs text-gray-500 transition-colors disabled:opacity-40"
              >
                <i className={`ti ti-refresh text-sm ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </section>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-500 text-xs px-4 py-3 rounded-xl flex items-center gap-2">
              <i className="ti ti-alert-circle flex-shrink-0" />
              <span>{error}</span>
              <button onClick={fetchStats} className="underline ml-1">Coba lagi</button>
            </div>
          )}

          {/* Stat Cards */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {!data
              ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
              : statCards.map((s) => (
                  <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <p className="text-xs text-gray-400">{s.label}</p>
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${s.iconBg}`}>
                        <i className={`ti ${s.icon} text-sm`} />
                      </div>
                    </div>
                    <p className={`text-2xl font-semibold mb-2.5 ${s.valueColor}`}>{s.value}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.badgeColor}`}>
                      {s.badge}
                    </span>
                  </div>
                ))}
          </section>

          {/* Charts Row */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* Bar Chart Kategori */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-semibold text-gray-700">Laporan per kategori</p>
                  <p className="text-xs text-gray-400 mt-0.5">Distribusi semua laporan</p>
                </div>
              </div>
              {!data ? (
                <div className="h-40 bg-gray-50 rounded-xl animate-pulse" />
              ) : (
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={kategoriChartData} barSize={32}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 11, fill: '#9ca3af' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: '#9ca3af' }}
                      axisLine={false}
                      tickLine={false}
                      width={24}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f9fafb' }} />
                    <Bar dataKey="Laporan" radius={[6, 6, 0, 0]}>
                      {kategoriChartData.map((_, i) => (
                        <Cell key={i} fill={CATEGORY_COLORS[i % CATEGORY_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* Status Summary Chart */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-semibold text-gray-700">Ringkasan status</p>
                  <p className="text-xs text-gray-400 mt-0.5">Pending · Diproses · Selesai</p>
                </div>
              </div>
              {!data ? (
                <div className="h-40 bg-gray-50 rounded-xl animate-pulse" />
              ) : (
                <>
                  <ResponsiveContainer width="100%" height={140}>
                    <BarChart data={statusChartData} barSize={40} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" horizontal={false} />
                      <XAxis
                        type="number"
                        tick={{ fontSize: 11, fill: '#9ca3af' }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        type="category"
                        dataKey="name"
                        tick={{ fontSize: 11, fill: '#9ca3af' }}
                        axisLine={false}
                        tickLine={false}
                        width={56}
                      />
                      <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f9fafb' }} />
                      <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                        <Cell fill="#FBBF24" />
                        <Cell fill="#60A5FA" />
                        <Cell fill="#34D399" />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-50">
                    {[
                      { label: 'Pending',  color: 'bg-amber-400',  value: stats?.menunggu },
                      { label: 'Diproses', color: 'bg-blue-400',   value: stats?.diproses },
                      { label: 'Selesai',  color: 'bg-emerald-400',value: stats?.selesai },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-1.5 text-xs text-gray-500">
                        <span className={`w-2 h-2 rounded-full ${item.color}`} />
                        {item.label}
                        <span className="font-medium text-gray-700">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

          </section>

          {/* Laporan Terbaru */}
          <section className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-semibold text-gray-700">Laporan terbaru</p>
                <p className="text-xs text-gray-400 mt-0.5">5 laporan masuk terakhir</p>
              </div>
              <span className="flex items-center gap-1.5 text-xs text-gray-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Live
              </span>
            </div>

            {!data ? (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} />)}
              </div>
            ) : laporan.length === 0 ? (
              <div className="py-10 text-center">
                <i className="ti ti-inbox text-2xl text-gray-300" />
                <p className="text-xs text-gray-400 mt-2">Belum ada laporan</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {laporan.map((l) => {
                  const cat    = CATEGORY_ICON[l.category_name] ?? { icon: 'ti-file-description', bg: 'bg-gray-100 text-gray-500' };
                  const status = STATUS_MAP[l.status] ?? { label: l.status, cls: 'bg-gray-100 text-gray-500' };
                  return (
                    <div key={l.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${cat.bg}`}>
                        <i className={`ti ${cat.icon} text-sm`} aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-700 truncate">{l.judul}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{l.username} · {timeAgo(l.created_at)}</p>
                      </div>
                      <span className={`text-xs px-2.5 py-0.5 rounded-full flex-shrink-0 font-medium ${status.cls}`}>
                        {status.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

        </main>
      </div>
    </div>
  );
}