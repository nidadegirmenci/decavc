"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">DV</span>
              </div>
              <span className="font-bold text-xl">Deca Venture</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Ankara merkezli yenilikçi startup yatırım platformu. Girişimciler ve yatırımcıları buluşturarak
              Türkiye'nin teknoloji ekosistemini geliştiriyoruz.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <MapPin className="w-4 h-4" />
                <span>Çankaya, Ankara, Türkiye</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Phone className="w-4 h-4" />
                <span>+90 (312) 456 78 90</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Mail className="w-4 h-4" />
                <span>info@decaventure.com</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Şirket</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Kariyer
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Basın
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors text-sm">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Investor Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Yatırımcılar</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/how-it-works" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Nasıl Çalışır
                </Link>
              </li>
              <li>
                <Link href="/investment-guide" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Yatırım Rehberi
                </Link>
              </li>
              <li>
                <Link href="/risk-disclosure" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Risk Bildirimi
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Sık Sorulan Sorular
                </Link>
              </li>
              <li>
                <Link href="/fees" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Ücretler
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Bülten</h3>
            <p className="text-gray-300 text-sm mb-4">
              Startup dünyasından son haberler ve yatırım fırsatları için bültenimize abone olun.
            </p>
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="E-posta adresiniz"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
              <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90">Abone Ol</Button>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm text-gray-400">
              <Link href="/terms" className="hover:text-white transition-colors">
                Kullanım Şartları
              </Link>
              <Link href="/privacy" className="hover:text-white transition-colors">
                Gizlilik Politikası
              </Link>
              <Link href="/cookies" className="hover:text-white transition-colors">
                Çerez Politikası
              </Link>
              <Link href="/kvkk" className="hover:text-white transition-colors">
                KVKK
              </Link>
            </div>
          </div>
        </div>

        {/* Legal Notice */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-sm mb-2 text-yellow-400">⚠️ Önemli Risk Bildirimi</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Startup yatırımları yüksek risk içerir ve sermayenizin tamamını kaybetme riski bulunmaktadır. Yatırım
              yapmadan önce şirketin finansal durumunu, iş planını ve risk faktörlerini dikkatli bir şekilde
              değerlendirin. Deca Venture yatırım tavsiyesi vermez, sadece platform hizmeti sunar. Yatırım kararlarınızı
              verirken profesyonel danışmanlık almanızı öneririz.
            </p>
          </div>
          <p className="text-xs text-gray-400 text-center">
            © 2024 Deca Venture. Tüm hakları saklıdır. Ankara merkezli teknoloji yatırım platformu.
          </p>
        </div>
      </div>
    </footer>
  )
}
