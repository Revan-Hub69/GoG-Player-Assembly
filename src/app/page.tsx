import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            GoG Player Assembly
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hub digitale per coalizzare i rappresentanti dei server di Guns of
            Glory
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Gestione Proposte</CardTitle>
              <CardDescription>
                Crea e gestisci proposte per miglioramenti del gioco
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Sistema strutturato per presentare e votare proposte della
                comunità
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sistema di Voto</CardTitle>
              <CardDescription>
                Vota democraticamente sulle proposte della comunità
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Processo di voto trasparente con quorum del 60%
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">CSPI Tracking</CardTitle>
              <CardDescription>
                Community Spending Propensity Index
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Indicatore del sentiment della comunità basato su pattern
                storici
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-16">
          <Button size="lg" className="mr-4">
            Accedi come Rappresentante
          </Button>
          <Button variant="outline" size="lg">
            Scopri di più
          </Button>
        </div>
      </div>
    </div>
  )
}
