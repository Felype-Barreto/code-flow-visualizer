import Layout from '@/components/layout';
import Roadmap from '@/components/roadmap';
import { AdUnit, AD_SLOTS } from '@/components/ad-unit';

export default function TracksPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Title is rendered inside the Roadmap component to allow the
              golden header and richer instructional copy to appear in-place. */}

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <Roadmap />
            </div>
            <div className="lg:col-span-1 hidden lg:block">
              {/* Sidebar ad for desktop */}
              <div className="sticky top-20">
                <AdUnit slot={AD_SLOTS.ROADMAP_PAGE} format="vertical" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
