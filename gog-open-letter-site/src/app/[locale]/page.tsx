import { useTranslations } from 'next-intl';
import { getLetterContent, getProposals, getLastUpdated } from '@/lib/content';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ProposalCard from '@/components/ProposalCard';

export default async function HomePage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  const t = useTranslations();
  const letterContent = await getLetterContent(locale);
  const proposals = getProposals();
  const lastUpdated = getLastUpdated();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {t('site.title')}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {t('site.lastUpdated')}: {lastUpdated.toLocaleDateString(locale)}
              </p>
            </div>
            <LanguageSwitcher />
          </div>
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              {t('site.disclaimer')}
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Letter Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            {t('letter.title')}
          </h2>
          <div className="bg-white rounded-lg shadow-sm p-8 prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: letterContent.contentHtml }} />
          </div>
          
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">
              {t('letter.cta')}
            </h3>
            <p className="text-green-800 text-sm">
              {t('letter.ctaText')}
            </p>
          </div>
        </section>

        {/* Proposals Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            {t('proposals.title')}
          </h2>
          
          {proposals.length > 0 ? (
            <div className="space-y-6">
              {proposals
                .filter((proposal: any) => proposal.status === 'active')
                .sort((a: any, b: any) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
                .map((proposal: any) => (
                  <ProposalCard key={proposal.id} proposal={proposal} />
                ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <p className="text-gray-600">{t('proposals.noProposals')}</p>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-600">
                {t('footer.disclaimer')}
              </p>
            </div>
            <div className="flex gap-4">
              <a
                href="mailto:contact@example.com"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                {t('footer.contact')}
              </a>
              <a
                href="https://github.com/your-repo"
                className="text-sm text-blue-600 hover:text-blue-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('footer.github')}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}