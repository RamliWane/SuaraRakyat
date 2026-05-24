'use client'

import { api } from '../../../../lib/api';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function Register() {

    const router = useRouter();
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (form.password !== form.confirmPassword) {
            setError('Password tidak cocok');
            return;
        }

        setLoading(true);
        try {
            await api.post('/auth/register', {
                username: form.username,
                email: form.email,
                password: form.password
            });
            router.push('/client/auth/login')
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-emerald-50 relative overflow-hidden">

            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute -top-32 -left-24 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(5,150,105,0.12)_0%,transparent_70%)]" />
                <div className="absolute -bottom-24 -right-20 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.10)_0%,transparent_70%)]" />
            </div>

            <div className="hidden md:flex w-1/2 relative z-10 items-center justify-center p-10">
                <div className="relative w-full max-w-sm">

                    <div className="absolute -top-4 -left-4 bg-emerald-600 text-white px-3 py-2 rounded-xl shadow-lg text-xs font-semibold">
                        Bergabung<br />Sekarang
                    </div>

                    <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-lg aspect-[3/4]">
                        <img
                            src="/assets/guberkaltim.jpeg"
                            className="w-120 h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent" />
                    </div>
                </div>
            </div>

            <div className="relative bg-white z-10 rounded-4xl w-full md:w-1/2 flex flex-col justify-center px-8 py-12 md:px-16">

                <div className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-200 rounded-full px-3 py-1.5 mb-10 w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    <span className="text-[11px] text-emerald-600 uppercase tracking-widest font-medium">
                        Buat Akun Baru
                    </span>
                </div>

                <h1 className="font-medium text-gray-900 text-4xl md:text-5xl mb-3">
                    Daftar &<br />
                    <span className="text-emerald-600">Mulai Sekarang</span>
                </h1>

                <p className="text-gray-500 text-sm font-medium mb-10">
                    Jadilah bagian dari perubahan.<br />
                    Suara Anda membantu masyarakat.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    <div className="grid grid-cols-2 gap-3">
                        <input
                            type="text"
                            name="username"
                            onChange={handleChange}
                            placeholder="Nama Lengkap"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 text-sm outline-none focus:border-emerald-400 focus:bg-white"
                        />

                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 text-sm outline-none focus:border-emerald-400 focus:bg-white"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            onChange={handleChange}
                            placeholder="Password"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 text-sm outline-none focus:border-emerald-400 focus:bg-white"
                        />

                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            onChange={handleChange}
                            placeholder="Konfirmasi Password"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 text-sm outline-none focus:border-emerald-400 focus:bg-white"
                        />
                    </div>

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
                        {loading ? 'Loading...' : 'Daftar'}
                    </button>
                </form>

                <div className="flex justify-between items-center mt-5">
                    <span className="text-gray-500 text-xs">Sudah punya akun?</span>
                    <a href="/client/auth/login" className="text-emerald-600 text-xs font-medium hover:underline">
                        Masuk →
                    </a>
                </div>

                <div className="flex items-center gap-3 my-7">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-gray-400 text-xs">atau daftar dengan</span>
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
        </div>
    );
}