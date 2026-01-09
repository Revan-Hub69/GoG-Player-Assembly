import Image from 'next/image'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps) {
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
              Process
            </a>
            <a 
              href="#requests" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Requests
            </a>
            <a 
              href="#representatives" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Representatives
            </a>
            <Button variant="outline" size="sm">
              Submit Request
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}