import SidebarAdmin from '../../components/admin/SideBarAdmin';
import NavbarHome from '../../components/client/NavbarHome';

export default async function DashboardPerpustakaan() {

  return (
    <div className="h-screen flex flex-col overflow-hidden text-black">
      <NavbarHome />
      <div className="flex flex-1 overflow-hidden">
        <SidebarAdmin />

        <main className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar p-4 sm:p-6 animate-slide-up animate-delay-200 space-y-6">
          
          <section className='flex flex-col justify-center items-start'>
            <h1 className="text-black text-[23px] text-center" style={{ fontFamily: "'Happy Monkey', cursive" }}>
              Halo, Admin!
            </h1>
            <h1 className="text-black text-[14px] text-center" style={{ fontFamily: "'Happy Monkey', cursive" }}>
              Manage Semua Buku Di Sini!
            </h1>
          </section>
        </main>
      </div>
    </div>
  );
}