import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { LanguageToggle } from '@/components/ui/language-toggle'
import type { Language, Translations } from '@/lib/translations'

interface HeaderProps {
  className?: string
  language: Language
  translations: Translations
  onLanguageChange: (language: Language) => void
}

export function Header({ className, language, translations, onLanguageChange }: HeaderProps) {
  return (
    <header className={`bg-white border-b border-gray-200 ${className || ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Image 
              src="/logo.svg" 
              alt="GoG Player Assembly" 
              width={120} 
              height={40}
              priority
            />
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#process" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              {translations.header.process}
            </a>
            <a 
              href="#ai-process" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              {translations.header.aiProcess}
            </a>
            <a 
              href="#kingdoms" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              {translations.header.kingdoms}
            </a>
            <a 
              href="#requests" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              {translations.header.requests}
            </a>
            <LanguageToggle 
              currentLanguage={language}
              onLanguageChange={onLanguageChange}
            />
            <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">
              {translations.header.submitRequest}
            </Button>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageToggle 
              currentLanguage={language}
              onLanguageChange={onLanguageChange}
            />
          </div>
        </div>
      </div>
    </header>
  )
}