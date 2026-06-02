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
            <Step>
                <div>
                    <span className="text-sm font-medium text-black">
                        Langkah 1
                    </span>

                    <h2 className="text-2xl font-bold text-black">
                        Pilih Kategori Laporan
                    </h2>

                    <p className="text-sm leading-relaxed text-black">
                        Pilih kategori yang sesuai dengan
                        permasalahan yang ingin dilaporkan seperti
                        jalan rusak, sampah, banjir, atau lampu
                        jalan mati.
                    </p>
                </div>
            </Step>

            <Step>
                <div className="space-y-3">
                    <span className="text-sm font-medium text-black">
                        Langkah 2
                    </span>

                    <h2 className="text-2xl font-bold text-black">
                        Isi Detail Laporan
                    </h2>

                    <p className="text-sm leading-relaxed text-black">
                        Tambahkan deskripsi, lokasi kejadian, dan
                        upload foto pendukung agar laporan lebih
                        mudah diproses oleh admin dan petugas.
                    </p>
                </div>
            </Step>

            <Step>
                <div className="space-y-3">
                    <span className="text-sm font-medium text-black">
                        Langkah 3
                    </span>

                    <h2 className="text-2xl font-bold text-black">
                        Kirim Laporan
                    </h2>

                    <p className="text-sm leading-relaxed text-black">
                        Pastikan semua data sudah benar lalu kirim
                        laporan Anda untuk diverifikasi oleh pihak
                        terkait.
                    </p>
                </div>
            </Step>

            <Step>
                <div className="flex flex-col items-center justify-center mt-2 text-center">
                    <h2 className="text-2xl font-bold text-black">
                        Laporan Berhasil Dibuat
                    </h2>

                    <p className="mt-2 max-w-md text-sm leading-relaxed text-black">
                        Laporan Anda berhasil dikirim dan sedang
                        menunggu proses verifikasi dari admin.
                    </p>
                </div>
            </Step>
        </Stepper>
    )
}