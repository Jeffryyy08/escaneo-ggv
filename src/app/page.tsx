import QRScanner from '@/components/QRScanner'
import Link from 'next/link'
import Image from 'next/image'
import { ScanLine, BarChart3, ShieldCheck, Smartphone } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FEFAE0] text-[#1B4332] font-sans selection:bg-[#BC6C25] selection:text-white">

      {/* Navbar Minimalista */}
      <nav className="w-full px-6 py-5 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Logo" width={80} height={80} className="rounded-full" />
          <span className="font-bold text-xl tracking-tight">Escaneo Inteligente <span className="text-[#BC6C25] font-normal">GGV</span></span>
        </div>
        <div className="hidden md:flex gap-4 text-sm font-medium text-[#2D6A4F]/70">
          <span>v1.0 Expotecnia</span>
        </div>
      </nav>

      {/* Contenido Principal */}
      <main className="max-w-7xl mx-auto px-6 py-10 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* 👈 COLUMNA IZQUIERDA: Información y Título */}
          <div className="space-y-6 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2D6A4F]/10 text-[#2D6A4F] rounded-full text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 bg-[#2D6A4F] rounded-full animate-pulse"></span>
              Sistema Activo
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-[#1B4332]">
              Trazabilidad <br />
              <span className="text-[#BC6C25]">Inteligente</span> y Rápida.
            </h1>

            <p className="text-lg text-[#2D6A4F]/80 max-w-md leading-relaxed">
              Gestiona el historial de tus animales desde el arete. Escanea un código QR y accede al pedigrí, salud y pesos al instante.
            </p>

            {/* Botones de Acción */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/animals/new"
                className="group px-6 py-3.5 bg-[#1B4332] text-white rounded-xl font-bold hover:bg-[#2D6A4F] transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                + Registrar Animal
              </Link>
              <Link
                href="/animals"
                className="px-6 py-3.5 bg-white border-2 border-[#1B4332]/20 text-[#1B4332] rounded-xl font-bold hover:border-[#1B4332] hover:bg-[#FEFAE0] transition-all flex items-center gap-2"
              >
                Ver Inventario
              </Link>
            </div>

            {/* Indicadores de confianza */}
            <div className="flex gap-6 pt-6 text-[#2D6A4F]/70 text-sm font-medium border-t border-[#1B4332]/10">
              <span className="flex items-center gap-2"><ShieldCheck size={16} /> Datos Seguros</span>
              <span className="flex items-center gap-2"><BarChart3 size={16} /> Control de Pesos</span>
            </div>
          </div>

          {/*  COLUMNA DERECHA: El Escáner */}
          <div className="relative order-1 lg:order-2">
            {/* Efecto de fondo (Glow) */}
            <div className="absolute inset-0 bg-[#BC6C25]/20 blur-[60px] rounded-full opacity-40 transform translate-x-4 translate-y-4"></div>

            {/* Tarjeta del Escáner */}
            <div className="relative bg-white p-2 rounded-3xl shadow-2xl border border-[#1B4332]/10 rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="bg-[#FEFAE0] p-6 md:p-8 rounded-2xl">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-xl flex items-center gap-2">
                    <ScanLine className="text-[#1B4332]" />
                    Escáner Rápido
                  </h3>
                  <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded">ONLINE</span>
                </div>

                {/* Componente Scanner */}
                <QRScanner />

                <p className="mt-6 text-center text-xs text-[#2D6A4F]/50 font-medium">
                  Escanea el arete para ver ficha técnica
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Sección de Características (Para dar cuerpo) */}
        <div className="mt-24 lg:mt-32">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-[#1B4332]">¿Por qué usar GGV?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <ScanLine size={24} />, title: "Escaneo Instantáneo", desc: "Lee aretes QR y recupera datos en milisegundos." },
              { icon: <BarChart3 size={24} />, title: "Historial Clínico", desc: "Control de medicamentos, vacunas y ciclo de preñeces." },
              { icon: <Smartphone size={24} />, title: "Diseño Responsivo", desc: "Accesible desde cualquier celular o computadora." }
            ].map((f, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-[#1B4332]/5 hover:shadow-md transition hover:-translate-y-1">
                <div className="w-12 h-12 bg-[#FEFAE0] rounded-lg flex items-center justify-center text-[#1B4332] mb-4 border border-[#1B4332]/10">
                  {f.icon}
                </div>
                <h4 className="font-bold text-lg mb-2">{f.title}</h4>
                <p className="text-sm text-[#2D6A4F]/70 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* Footer Simple */}
      <footer className="mt-20 py-8 text-center text-[#2D6A4F]/50 text-sm border-t border-[#1B4332]/10">
        <p>Proyecto para Expotecnia © {new Date().getFullYear()} - GGV Escaneo Inteligente</p>
      </footer>
    </div>
  )
}