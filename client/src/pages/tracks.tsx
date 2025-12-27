import Layout from '@/components/layout';
import Roadmap from '@/components/roadmap';

export default function TracksPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Title is rendered inside the Roadmap component to allow the
              golden header and richer instructional copy to appear in-place. */}

          <div className="mt-8">
            <Roadmap />
          </div>
        </div>
      </div>
    </Layout>
  );
}
