import Stepper, { Step } from "./StepperPanduan";

export default function StepperMain() {
    return (
        <Stepper
            initialStep={1}
            onStepChange={(step) => {
                console.log(step);
            }}
            onFinalStepCompleted={() =>
                console.log("All steps completed!")
            }
            backButtonText="Kembali"
            nextButtonText="Lanjut"
        >
            {/* STEP 1 */}
            <Step>
                <div className="space-y-3">
                    <span className="text-sm font-medium text-[#DC9B9B]">
                        Langkah 1
                    </span>

                    <h2 className="text-2xl font-bold text-white">
                        Pilih Kategori Laporan
                    </h2>

                    <p className="text-sm leading-relaxed text-gray-300">
                        Pilih kategori yang sesuai dengan
                        permasalahan yang ingin dilaporkan seperti
                        jalan rusak, sampah, banjir, atau lampu
                        jalan mati.
                    </p>
                </div>
            </Step>

            {/* STEP 2 */}
            <Step>
                <div className="space-y-3">
                    <span className="text-sm font-medium text-[#DC9B9B]">
                        Langkah 2
                    </span>

                    <h2 className="text-2xl font-bold text-white">
                        Isi Detail Laporan
                    </h2>

                    <p className="text-sm leading-relaxed text-gray-300">
                        Tambahkan deskripsi, lokasi kejadian, dan
                        upload foto pendukung agar laporan lebih
                        mudah diproses oleh admin dan petugas.
                    </p>
                </div>
            </Step>

            {/* STEP 3 */}
            <Step>
                <div className="space-y-3">
                    <span className="text-sm font-medium text-[#DC9B9B]">
                        Langkah 3
                    </span>

                    <h2 className="text-2xl font-bold text-white">
                        Kirim Laporan
                    </h2>

                    <p className="text-sm leading-relaxed text-gray-300">
                        Pastikan semua data sudah benar lalu kirim
                        laporan Anda untuk diverifikasi oleh pihak
                        terkait.
                    </p>
                </div>
            </Step>

            {/* STEP 4 */}
            <Step>
                <div className="flex flex-col items-center justify-center mt-2 text-center">
                    <h2 className="text-2xl font-bold text-white">
                        Laporan Berhasil Dibuat
                    </h2>

                    <p className="mt-2 max-w-md text-sm leading-relaxed text-gray-400">
                        Laporan Anda berhasil dikirim dan sedang
                        menunggu proses verifikasi dari admin.
                    </p>
                </div>
            </Step>
        </Stepper>
    )
}