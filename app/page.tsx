import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default async function HomePage() {
  // Supabaseからブログ記事を取得
  const { data: posts } = await supabase
    .from('posts')
    .select('id, title, slug, content, created_at')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  // 自作アプリのポートフォリオデータ（仮データ。後でSupabaseから移してもOK）
  const products = [
    {
      title: "3D 10-Puzzle Game",
      description: "Unity 6とProBuilderを使用して構築された、逆ポーランド記法（RPN）ロジックを持つ3Dパズルゲーム。",
      tags: ["Unity 6", "C#", "ProBuilder"],
      link: "#"
    },
    {
      title: "Pharmacy Visit Manager",
      description: "在宅訪問薬局向けの、データ安全性を考慮したオフライン同期型の上流管理アプリケーション。",
      tags: ["TypeScript", "NestJS", "Go"],
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col selection:bg-zinc-800 selection:text-zinc-200">
      
      {/* 1. HEADER */}
      <header className="border-b border-zinc-800 sticky top-0 bg-zinc-950/80 backdrop-blur-md z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-mono font-bold text-lg tracking-wider">EmmetFactory</span>
          <nav className="flex items-center space-x-6 text-sm font-mono text-zinc-400">
            <a href="#products" className="hover:text-zinc-100 transition-colors">// products</a>
            <a href="#blog" className="hover:text-zinc-100 transition-colors">// blog</a>
            <a href="#" className="hover:text-zinc-100 transition-colors">// about</a>
          </nav>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-20 text-center space-y-6 relative">
        {/* テック感を出す背景の薄いドットやグリッドの代わりになるようなシャープなタイポ */}
        <div className="inline-flex items-center space-x-2 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full text-xs font-mono text-zinc-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Available for New Projects</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold font-sans tracking-tight leading-none">
          We build fast, minimalist,<br />
          <span className="bg-gradient-to-r from-zinc-100 via-zinc-400 to-zinc-600 bg-clip-text text-transparent">
            and powerful web experiences.
          </span>
        </h1>
        <p className="max-w-xl mx-auto text-zinc-400 text-sm sm:text-base font-sans leading-relaxed">
          EmmetFactoryは、Next.js、Supabase、Go、Unityなどのモダンスタックを駆使し、実用性と美しさを兼ね備えたアプリケーションを開発しています。
        </p>
        <div className="flex justify-center space-x-4 pt-4">
          <Button variant="default" className="bg-zinc-50 text-zinc-950 hover:bg-zinc-200 font-mono rounded-md px-6">
            <a href="#products">View Products</a>
          </Button>
          <Button variant="outline" className="border-zinc-800 hover:bg-zinc-900 text-zinc-300 font-mono rounded-md px-6">
            <a href="#blog">Read Blog</a>
          </Button>
        </div>
      </section>

      {/* 3. PRODUCTS SECTION */}
      <section id="products" className="max-w-5xl mx-auto px-6 py-16 w-full border-t border-zinc-900 space-y-8">
        <h2 className="text-xl font-mono text-zinc-500 tracking-widest">// FEATURED PRODUCTS</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {products.map((product, idx) => (
            <Card key={idx} className="bg-zinc-900 border-zinc-800 text-zinc-50 rounded-lg hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between">
              <CardHeader className="space-y-2">
                <div className="flex gap-1.5 flex-wrap">
                  {product.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary" className="bg-zinc-800 text-zinc-300 font-mono text-[10px] rounded-sm hover:bg-zinc-800">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <CardTitle className="text-xl font-bold tracking-tight pt-2">{product.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-400 text-sm leading-relaxed">{product.description}</p>
              </CardContent>
              <CardFooter className="border-t border-zinc-800/50 pt-4 font-mono text-xs text-zinc-500">
                <a href={product.link} className="hover:text-zinc-200 flex items-center gap-1">
                  Source Code &rarr;
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* 4. BLOG SECTION */}
      <section id="blog" className="max-w-5xl mx-auto px-6 py-16 w-full border-t border-zinc-900 space-y-8 flex-grow">
        <h2 className="text-xl font-mono text-zinc-500 tracking-widest">// TECHNICAL INSIGHTS</h2>
        <div className="space-y-4">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <div 
                key={post.id} 
                className="group p-6 rounded-lg border border-zinc-900 bg-zinc-900/40 hover:bg-zinc-900 hover:border-zinc-800 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <span className="text-xs font-mono text-zinc-500">
                    {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                  <h3 className="text-lg font-bold group-hover:text-zinc-200 transition-colors">{post.title}</h3>
                  <p className="text-zinc-400 text-sm max-w-2xl line-clamp-2">{post.content}</p>
                </div>
                <div className="font-mono text-xs text-zinc-600 group-hover:text-zinc-400 transition-colors whitespace-nowrap">
                  slug: {post.slug} &rarr;
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-zinc-500 font-mono">No posts found.</p>
          )}
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="border-t border-zinc-900 py-8 font-mono text-xs text-zinc-600 text-center">
        &copy; {new Date().getFullYear()} EmmetFactory. Built with Next.js, shadcn/ui, and Supabase.
      </footer>
    </div>
  )
}