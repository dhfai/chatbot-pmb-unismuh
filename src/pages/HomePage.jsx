import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronDown, ExternalLink, LogIn, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

const HomePage = () => {
  const { toast } = useToast();

  const handleNotImplemented = () => {
    toast({
      title: "🚧 Fitur Belum Tersedia",
      description: "Fitur ini belum diimplementasikan. Anda bisa memintanya di prompt berikutnya! 🚀",
      duration: 3000,
    });
  };


  const navItems = [
    { name: 'Program', dropdown: true },
    { name: 'Sekilas Unismuh', dropdown: true },
    { name: 'Informasi', dropdown: true },
    { name: 'Unduh', dropdown: true },
    { name: 'Kontak', dropdown: false },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-unismuh-light-gray">
      {/* Header */}
      <header className="bg-unismuh-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img  
                className="h-12 w-auto" 
                alt="Logo Unismuh Makassar" src="https://images.unsplash.com/photo-1618502249646-6015789449ee" />
              <span className="font-bold text-sm sm:text-base text-unismuh-blue uppercase tracking-tight leading-tight">
                Penerimaan<br />Mahasiswa Baru
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2 xl:space-x-4">
              {navItems.map((item) => (
                <Button 
                  variant="ghost" 
                  key={item.name} 
                  className="text-unismuh-dark-text hover:text-unismuh-blue hover:bg-unismuh-blue/10 px-3 py-2 text-sm"
                  onClick={handleNotImplemented}
                >
                  {item.name}
                  {item.dropdown && <ChevronDown className="ml-1 h-4 w-4" />}
                </Button>
              ))}
              <Button 
                className="bg-unismuh-blue hover:bg-unismuh-blue-dark text-white text-sm px-4 py-2"
                onClick={handleNotImplemented}
              >
                Informasi RPL
              </Button>
              <Button 
                variant="outline" 
                className="border-unismuh-yellow text-unismuh-yellow hover:bg-unismuh-yellow hover:text-unismuh-blue text-sm px-4 py-2"
                onClick={handleNotImplemented}
              >
                Indonesian <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </nav>
            
            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Button variant="ghost" size="icon" onClick={handleNotImplemented} className="text-unismuh-blue">
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="relative bg-unismuh-blue text-white py-16 md:py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
             <img  
                className="w-full h-full object-cover" 
                alt="Gedung Kampus Unismuh abstrak" src="https://images.unsplash.com/photo-1611908065988-29843712d5d9" />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="text-center lg:text-left"
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase leading-tight">
                  Penerimaan Mahasiswa Baru
                  <span className="block text-unismuh-yellow mt-1 sm:mt-2">Tahun Ajaran 2025 / 2026</span>
                </h1>
                <div className="mt-8 space-y-6">
                  {[
                    { title: 'Jalur Seleksi Nilai Rapor', period: 'Dimulai Tanggal 28 November 2024 - 15 Agustus 2025' },
                    { title: 'Jalur Computer Based Test (CBT)', period: 'Dimulai Tanggal 28 November 2024 – 15 Agustus 2025 Khusus Program Studi S-1 Pendidikan Dokter melalui Jalur seleksi Nilai Rapor, Psikotes dan TNBK' },
                  ].map((jalur, index) => (
                    <motion.div 
                      key={jalur.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.2, ease: "easeOut" }}
                      className="bg-unismuh-blue-dark/30 backdrop-blur-sm p-4 rounded-lg border border-unismuh-yellow/30 shadow-lg"
                    >
                      <h2 className="text-xl font-semibold text-unismuh-yellow">{jalur.title}</h2>
                      <p className="text-sm text-white/80 mt-1">{jalur.period}</p>
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9, ease: "easeOut" }} 
                  className="mt-10"
                >
                  <Button 
                    size="lg" 
                    className="bg-unismuh-yellow hover:bg-yellow-400 text-unismuh-blue font-bold text-lg py-3 px-8 rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300"
                    onClick={handleNotImplemented}
                  >
                    Daftar Sekarang <LogIn className="ml-2 h-5 w-5"/>
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                className="hidden lg:block relative"
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-unismuh-yellow/20 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-lg transform rotate-12"></div>
                 <img  
                    className="rounded-xl shadow-2xl w-full h-auto object-cover max-h-[500px]" 
                    alt="Mahasiswi Unismuh Makassar tersenyum ceria" src="https://images.unsplash.com/photo-1625450767292-fddc761119f4" />
              </motion.div>
            </div>
          </div>
        </section>
        
        <section className="py-12 md:py-16 bg-unismuh-light-gray">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-2xl md:text-3xl font-bold text-unismuh-blue mb-8"
            >
              Jalur Pendaftaran & Beasiswa Mahasiswa Baru TA 2025/2026
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[
                { title: 'Jalur Prestasi Akademik', desc: 'Penerimaan berdasarkan nilai rapor dan prestasi lainnya.', icon: '🏆' },
                { title: 'Jalur Tes Potensi Skolastik', desc: 'Seleksi melalui ujian tulis berbasis komputer (UTBK).', icon: '✍️' },
                { title: 'Beasiswa KIP Kuliah', desc: 'Bantuan biaya pendidikan untuk mahasiswa berprestasi dari keluarga kurang mampu.', icon: '🌟' },
              ].map((item, index) => (
                 <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-unismuh-blue/20"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-unismuh-blue mb-2">{item.title}</h3>
                  <p className="text-unismuh-dark-text/80 text-sm mb-4">{item.desc}</p>
                  <Button 
                    variant="outline" 
                    className="text-unismuh-blue border-unismuh-blue hover:bg-unismuh-blue hover:text-white text-sm"
                    onClick={handleNotImplemented}
                  >
                    Selengkapnya <ExternalLink className="ml-1.5 h-4 w-4"/>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-unismuh-blue-dark text-white/80 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Penerimaan Mahasiswa Baru Universitas Muhammadiyah Makassar. Semua hak cipta dilindungi.</p>
          <p className="mt-1">Dikembangkan dengan ❤️ untuk calon mahasiswa Unismuh.</p>
        </div>
      </footer>
    </div>
  );
};

// Dummy useToast hook for HomePage, as it's used in App.jsx
// In a real scenario, this would come from a shared context or library
const useToast = () => {
  return {
    toast: (options) => {
      console.log("Toast:", options.title, options.description);
       if (window.toast) { // Check if global toast is available (e.g., from use-toast.js)
        window.toast(options);
      } else {
        alert(`${options.title}\n${options.description}`);
      }
    }
  };
};


export default HomePage;