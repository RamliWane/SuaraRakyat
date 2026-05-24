'use client'

import { loginAction } from '../../../../lib/auth';
import React, { useState } from 'react';

export default function Login() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData) {
        setLoading(true);
        try {
            await loginAction(formData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen bg-emerald-50 overflow-hidden relative">
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute -top-32 -right-24 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(5,150,105,0.12)_0%,transparent_70%)]" />
                <div className="absolute -bottom-24 -left-20 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.10)_0%,transparent_70%)]" />
            </div>
            <div className="relative rounded-4xl bg-white z-10 w-full md:w-1/2 flex flex-col justify-center px-8 py-12 md:px-16">

                <div className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-200 rounded-full px-3 py-1.5 mb-10 w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    <span className="text-[11px] text-emerald-600 uppercase tracking-widest font-medium">
                        Platform Laporan Masyarakat
                    </span>
                </div>

                <h1 className="font-medium text-gray-900 text-4xl md:text-5xl mb-3">
                    Masuk ke 
                    <span className="text-emerald-600"> Akun Anda</span>
                </h1>

                <p className="text-gray-500 text-sm mb-10">
                    Laporkan masalah di sekitar Anda.<br />
                    Suara Anda penting untuk perubahan nyata.
                </p>

                <form action={handleSubmit} className="flex flex-col gap-3">

                    <input
                        type="email"
                        name="email"
                        placeholder="Alamat Email"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 text-sm outline-none focus:border-emerald-400 focus:bg-white transition-all"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Kata Sandi"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 text-sm outline-none focus:border-emerald-400 focus:bg-white transition-all"
                    />

                    {error && (
                        <p className="text-red-500 text-xs bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 w-full py-3 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 transition-all disabled:opacity-50"
                    >
                        {loading ? 'Memuat...' : 'Masuk'}
                    </button>
                </form>

                <div className="flex justify-between items-center mt-5">
                    <span className="text-gray-500 text-xs">Belum punya akun?</span>
                    <a href="/client/auth/register" className="text-emerald-600 text-xs font-medium hover:underline">
                        Daftar Sekarang →
                    </a>
                </div>

                <div className="flex items-center gap-3 my-7">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-gray-400 text-xs">atau masuk dengan</span>
                    <div className="flex-1 h-px bg-gray-200" />
                </div>

                <div className="flex gap-3">
                    <button className="flex-1 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 text-xs hover:bg-gray-100">
                        Google
                    </button>
                    <button className="flex-1 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 text-xs hover:bg-gray-100">
                        Apple
                    </button>
                </div>
            </div>

            <div className="hidden md:flex w-1/2 items-center justify-center p-10">
                <div className="relative">

                    <div className="absolute -top-4 -right-4 bg-emerald-600 text-white px-3 py-2 rounded-xl shadow-lg text-xs font-semibold">
                        Laporan<br />Terverifikasi
                    </div>

                    <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
                        <img
                            src="/assets/jokowidoa.jpeg"
                            className="w-120 h-auto object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}