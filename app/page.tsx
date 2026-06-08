import { supabase } from '@/lib/supabase'

export default async function HomePage() {
  // 1. Supabaseの'posts'テーブルから、公開されている記事を全件取得
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, title, slug, content, created_at')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('データ取得エラー:', error.message)
    return <main className="p-8">データの読み込みに失敗しました。</main>
  }

  return (
    <main className="p-8 max-w-2xl mx-auto space-y-8 dark:bg-zinc-950 dark:text-zinc-50 min-h-screen">
      {/* ヒーローセクション（仮） */}
      <div className="space-y-2 border-b border-zinc-200 dark:border-zinc-800 pb-8">
        <h1 className="text-4xl font-mono font-bold tracking-tight">EmmetFactory</h1>
        <p className="text-zinc-500 dark:text-zinc-400 font-sans">
          Next.js + shadcn/ui + Supabase で構築するポートフォリオ＆ブログ
        </p>
      </div>

      {/* ブログ記事一覧セクション */}
      <div className="space-y-4">
        <h2 className="text-xl font-mono text-zinc-400">// Recent Blog Posts</h2>
        
        {posts && posts.length > 0 ? (
          <div className="grid gap-4">
            {posts.map((post) => (
              <article 
                key={post.id} 
                className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2"
              >
                <div className="flex justify-between items-center text-sm text-zinc-400 font-mono">
                  <span>{new Date(post.created_at).toLocaleDateString()}</span>
                  <span>slug: {post.slug}</span>
                </div>
                <h3 className="text-xl font-bold font-sans">{post.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
                  {post.content}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-sm text-zinc-500">記事が見つかりませんでした。</p>
        )}
      </div>
    </main>
  )
}