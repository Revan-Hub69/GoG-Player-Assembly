import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface CommunityRequest {
  id: string
  title: string
  description: string
  category: 'gameplay' | 'economy' | 'social' | 'technical'
  priority: 'critical' | 'high' | 'medium' | 'low'
  status: 'draft' | 'review' | 'submitted' | 'acknowledged'
  submittedBy: string
  submittedDate: string
  technicalDetails?: string
  expectedOutcome: string
}

interface RequestCardProps {
  request: CommunityRequest
  className?: string
}

export function RequestCard({ request, className }: RequestCardProps) {
  const getCategoryColor = (category: CommunityRequest['category']): string => {
    const colors: Record<CommunityRequest['category'], string> = {
      gameplay: 'bg-blue-100 text-blue-800 border-blue-200',
      economy: 'bg-green-100 text-green-800 border-green-200',
      social: 'bg-purple-100 text-purple-800 border-purple-200',
      technical: 'bg-gray-100 text-gray-800 border-gray-200'
    }
    return colors[category]
  }

  const getPriorityColor = (priority: CommunityRequest['priority']): string => {
    const colors: Record<CommunityRequest['priority'], string> = {
      critical: 'bg-red-100 text-red-800 border-red-200',
      high: 'bg-orange-100 text-orange-800 border-orange-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      low: 'bg-gray-100 text-gray-800 border-gray-200'
    }
    return colors[priority]
  }

  const getStatusColor = (status: CommunityRequest['status']): string => {
    const colors: Record<CommunityRequest['status'], string> = {
      draft: 'bg-gray-100 text-gray-800',
      review: 'bg-blue-100 text-blue-800',
      submitted: 'bg-green-100 text-green-800',
      acknowledged: 'bg-purple-100 text-purple-800'
    }
    return colors[status]
  }

  const getCategoryLabel = (category: CommunityRequest['category']): string => {
    const labels: Record<CommunityRequest['category'], string> = {
      gameplay: 'Gameplay',
      economy: 'Economia',
      social: 'Sociale',
      technical: 'Tecnico'
    }
    return labels[category]
  }

  const getPriorityLabel = (priority: CommunityRequest['priority']): string => {
    const labels: Record<CommunityRequest['priority'], string> = {
      critical: 'Critica',
      high: 'Alta',
      medium: 'Media',
      low: 'Bassa'
    }
    return labels[priority]
  }

  const getStatusLabel = (status: CommunityRequest['status']): string => {
    const labels: Record<CommunityRequest['status'], string> = {
      draft: 'Bozza',
      review: 'In Revisione',
      submitted: 'Inviata',
      acknowledged: 'Riconosciuta'
    }
    return labels[status]
  }

  return (
    <Card className={`border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.01] ${className || ''}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <Badge 
                variant="outline" 
                className={`${getCategoryColor(request.category)} hover:scale-105 transition-transform`}
              >
                {getCategoryLabel(request.category)}
              </Badge>
              <Badge 
                variant="outline" 
                className={`${getPriorityColor(request.priority)} hover:scale-105 transition-transform`}
              >
                Priorità {getPriorityLabel(request.priority)}
              </Badge>
              <Badge 
                className={`${getStatusColor(request.status)} hover:scale-105 transition-transform`}
              >
                {getStatusLabel(request.status)}
              </Badge>
            </div>
            <CardTitle className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
              {request.title}
            </CardTitle>
            <CardDescription className="text-gray-600 leading-relaxed">
              {request.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Dettagli Tecnici</h4>
            <p className="text-sm text-gray-600 mb-4">
              {request.technicalDetails}
            </p>
            <h4 className="font-semibold text-gray-900 mb-2">Risultato Atteso</h4>
            <p className="text-sm text-gray-600">
              {request.expectedOutcome}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Dettagli Richiesta</h4>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">Inviata da:</dt>
                <dd className="text-gray-900">{request.submittedBy}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Data:</dt>
                <dd className="text-gray-900">{request.submittedDate}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">ID Richiesta:</dt>
                <dd className="text-gray-900 font-mono">#{request.id.padStart(4, '0')}</dd>
              </div>
            </dl>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}