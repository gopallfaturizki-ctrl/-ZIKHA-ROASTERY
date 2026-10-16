'use client'

import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronRight,
  Clock3,
  Coffee,
  Facebook,
  Flame,
  Instagram,
  Leaf,
  Mail,
  MapPin,
  MessageCircle,
  Minus,
  Moon,
  PackageCheck,
  Phone,
  Plus,
  Search,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  Star,
  Sun,
  Truck,
  X,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { faqs, testimonials } from '@/utils/constants'
import type { AboutContent, Article, Product, Service, SiteConfig } from '@/lib/types'

type StorefrontProps = {
  config: SiteConfig
  about: AboutContent
  services: Service[]
  products: Product[]
  articles: Article[]
}

type CartItem = {
  productId: string
  quantity: number
}

const formatPrice = (value: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value)

const beanFilterOptions = ['all', 'Robusta', 'Arabica', 'Blend'] as const
const roastFilterOptions = ['all', 'Light', 'Medium', 'Dark'] as const

export function Storefront({ config, about, services, products, articles }: StorefrontProps) {
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [query, setQuery] = useState('')
  const [roastFilter, setRoastFilter] = useState<(typeof roastFilterOptions)[number]>('all')
  const [beanFilter, setBeanFilter] = useState<(typeof beanFilterOptions)[number]>('all')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])
  const [comparison, setComparison] = useState<Product[]>([])

  useEffect(() => {
    setMounted(true)
    const storedCart = localStorage.getItem('zikha-cart')
    const storedTheme = localStorage.getItem('zikha-theme')
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart))
      } catch {
        setCart([])
      }
    }
    if (storedTheme === 'dark') {
      setIsDark(true)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    localStorage.setItem('zikha-cart', JSON.stringify(cart))
  }, [cart, mounted])

  useEffect(() => {
    if (!mounted) return
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem('zikha-theme', isDark ? 'dark' : 'light')
  }, [isDark, mounted])

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => undefined)
    }
  }, [])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesQuery =
        query.trim() === '' ||
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.origin.toLowerCase().includes(query.toLowerCase()) ||
        product.tastingNotes.some((note) => note.toLowerCase().includes(query.toLowerCase()))
      const matchesRoast = roastFilter === 'all' || product.roastLevel === roastFilter
      const matchesBean = beanFilter === 'all' || product.beanType === beanFilter
      return matchesQuery && matchesRoast && matchesBean
    })
  }, [beanFilter, products, query, roastFilter])

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cart.reduce((sum, item) => {
    const product = products.find((entry) => entry.id === item.productId)
    return sum + (product ? product.price * item.quantity : 0)
  }, 0)

  const comparisonItems = comparison.length > 0 ? comparison : products.slice(0, 3)
  const whatsappCheckoutLink = `https://wa.me/${config.contact.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
    `Halo ZIKHA ROASTERY, saya ingin memesan kopi berikut:\n\n${cart
      .map((item) => {
        const product = products.find((entry) => entry.id === item.productId)
        return `${product?.name ?? 'Produk'} x${item.quantity} - ${product ? formatPrice(product.price * item.quantity) : '0'}`
      })
      .join('\n')}\n\nTotal: ${formatPrice(subtotal)}\n\nSilakan lanjutkan konfirmasi pesanan.`,
  )}`

  function addToCart(product: Product) {
    setCart((current) => {
      const existing = current.find((item) => item.productId === product.id)
      if (existing) {
        return current.map((item) =>
          item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      return [...current, { productId: product.id, quantity: 1 }]
    })
  }

  function updateCartQuantity(productId: string, delta: number) {
    setCart((current) =>
      current
        .map((item) =>
          item.productId === productId ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  function toggleComparison(product: Product) {
    setComparison((current) => {
      if (current.some((entry) => entry.id === product.id)) {
        return current.filter((entry) => entry.id !== product.id)
      }
      if (current.length >= 3) {
        return [...current.slice(1), product]
      }
      return [...current, product]
    })
  }

  const heroStats = [
    { label: 'Petani lokal', value: '30+' },
    { label: 'Batch per minggu', value: '12' },
    { label: 'Rating pelanggan', value: '4.9/5' },
  ]

  return (
    <main className="min-h-screen bg-paper text-ink transition-colors dark:bg-ink dark:text-paper">
      <header className="sticky top-0 z-40 border-b border-moss/10 bg-paper/80 backdrop-blur-md dark:border-white/10 dark:bg-ink/80">
        <div className="section-shell flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-moss text-lg font-bold text-paper">Z</div>
            <div>
              <p className="font-display text-xl font-semibold tracking-wide">ZIKHA</p>
              <p className="text-[10px] uppercase tracking-[0.24em] text-moss/80 dark:text-leaf">Roastery</p>
            </div>
          </div>

          <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
            <a href="#about" className="transition hover:text-moss dark:hover:text-leaf">Tentang</a>
            <a href="#services" className="transition hover:text-moss dark:hover:text-leaf">Layanan</a>
            <a href="#products" className="transition hover:text-moss dark:hover:text-leaf">Produk</a>
            <a href="#articles" className="transition hover:text-moss dark:hover:text-leaf">Artikel</a>
            <a href="#faq" className="transition hover:text-moss dark:hover:text-leaf">FAQ</a>
            <a href="#contact" className="transition hover:text-moss dark:hover:text-leaf">Kontak</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Toggle tema"
              onClick={() => setIsDark((value) => !value)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-moss/20 bg-white text-moss transition hover:scale-[1.02] dark:border-white/10 dark:bg-white/5 dark:text-leaf"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a
              href="#products"
              className="hidden rounded-full bg-moss px-4 py-2 text-sm font-medium text-paper transition hover:bg-moss/90 md:inline-flex"
            >
              Belanja sekarang
            </a>
          </div>
        </div>
      </header>

      <section id="home" className="relative overflow-hidden">
        <div className="section-shell grid gap-10 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="pill">
              <Sparkles size={12} />
              {config.tagline}
            </span>
            <h1 className="mt-6 max-w-xl font-display text-5xl leading-tight text-ink dark:text-paper md:text-6xl">
              Kopi yang punya cerita, <span className="text-moss dark:text-leaf">di setiap cangkir.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-ink/75 dark:text-paper/75">
              ZIKHA ROASTERY menghadirkan biji pilihan dari petani lokal dengan roasting yang konsisten dan rasa yang menenangkan.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#products"
                className="inline-flex items-center gap-2 rounded-full bg-moss px-6 py-3 text-sm font-semibold text-paper transition hover:bg-moss/90"
              >
                Jelajahi produk <ArrowRight size={16} />
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-moss/20 px-6 py-3 text-sm font-semibold text-ink transition hover:border-moss dark:border-white/10 dark:text-paper">
                Konsultasi roasting
              </a>
            </div>

            <div className="mt-10 grid max-w-lg grid-cols-3 gap-4">
              {heroStats.map((stat) => (
                <div key={stat.label} className="glass-card px-4 py-4 text-left">
                  <p className="text-2xl font-semibold text-moss dark:text-leaf">{stat.value}</p>
                  <p className="mt-1 text-xs text-ink/70 dark:text-paper/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_top_right,_rgba(168,180,154,0.5),_transparent_45%)] blur-3xl" />
            <div className="glass-card overflow-hidden p-3">
              <img
                src="https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=1200&q=85"
                alt="Kopi ZIKHA ROASTERY"
                className="h-[500px] w-full rounded-[1.5rem] object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="py-20">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="glass-card overflow-hidden p-3">
            <img
              src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1000&q=85"
              alt="Proses roasting kopi"
              className="h-[440px] w-full rounded-[1.5rem] object-cover"
            />
          </div>

          <div>
            <span className="pill">Tentang kami</span>
            <h2 className="mt-6 font-display text-4xl text-ink dark:text-paper">{about.title}</h2>
            <p className="mt-4 text-lg leading-8 text-ink/75 dark:text-paper/75">{about.story}</p>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <div className="glass-card p-5">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-moss/10 text-moss dark:bg-leaf/10 dark:text-leaf">
                  <Leaf size={20} />
                </div>
                <h3 className="text-lg font-semibold">Misi</h3>
                <p className="mt-2 text-sm leading-6 text-ink/70 dark:text-paper/70">{about.mission}</p>
              </div>
              <div className="glass-card p-5">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-moss/10 text-moss dark:bg-leaf/10 dark:text-leaf">
                  <BadgeCheck size={20} />
                </div>
                <h3 className="text-lg font-semibold">Visi</h3>
                <p className="mt-2 text-sm leading-6 text-ink/70 dark:text-paper/70">{about.vision}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="bg-[#f7f3ee] py-20 dark:bg-[#171b18]">
        <div className="section-shell">
          <div className="text-center">
            <span className="pill">Layanan</span>
            <h2 className="mt-6 font-display text-4xl text-ink dark:text-paper">Jasa roasting yang dibuat untuk kebutuhan Anda</h2>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {services.map((service) => (
              <motion.div key={service.id} whileHover={{ y: -4 }} className="glass-card p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-moss/10 text-moss dark:bg-leaf/10 dark:text-leaf">
                    {service.icon === 'sun' ? <Sparkles size={22} /> : service.icon === 'flame' ? <Flame size={22} /> : <Coffee size={22} />}
                  </div>
                  {service.popular && (
                    <span className="rounded-full bg-amber-500/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-700">
                      Popular
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-semibold">{service.name}</h3>
                <p className="mt-3 text-sm leading-6 text-ink/70 dark:text-paper/70">{service.description}</p>
                <p className="mt-5 text-2xl font-semibold text-moss dark:text-leaf">{formatPrice(service.price)} <span className="text-base text-ink/60 dark:text-paper/60">/{service.unit}</span></p>
                <ul className="mt-5 space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-ink/80 dark:text-paper/80">
                      <Check size={16} className="mt-0.5 text-moss dark:text-leaf" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="py-20">
        <div className="section-shell">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="pill">Produk</span>
              <h2 className="mt-6 font-display text-4xl text-ink dark:text-paper">Biji kopi pilihan untuk setia kebutuhan</h2>
            </div>
            <div className="flex w-full max-w-xl items-center gap-3 rounded-full border border-moss/15 bg-white px-4 py-3 shadow-sm dark:border-white/10 dark:bg-[#1d211d]">
              <Search size={18} className="text-moss dark:text-leaf" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full bg-transparent text-sm text-ink placeholder:text-ink/50 focus:outline-none dark:text-paper dark:placeholder:text-paper/50"
                placeholder="Cari produk, origin, atau tasting notes"
                aria-label="Cari produk"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-full border border-moss/15 bg-white p-1 dark:border-white/10 dark:bg-[#1d211d]">
              {roastFilterOptions.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setRoastFilter(filter)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition ${
                    roastFilter === filter
                      ? 'bg-moss text-paper'
                      : 'text-ink/70 hover:bg-moss/5 dark:text-paper/70 dark:hover:bg-white/5'
                  }`}
                >
                  {filter === 'all' ? 'Semua' : filter}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 rounded-full border border-moss/15 bg-white p-1 dark:border-white/10 dark:bg-[#1d211d]">
              {beanFilterOptions.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setBeanFilter(filter)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition ${
                    beanFilter === filter
                      ? 'bg-moss text-paper'
                      : 'text-ink/70 hover:bg-moss/5 dark:text-paper/70 dark:hover:bg-white/5'
                  }`}
                >
                  {filter === 'all' ? 'Semua' : filter}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <motion.article key={product.id} whileHover={{ y: -4 }} className="glass-card overflow-hidden">
                <div className="relative">
                  <img src={product.image} alt={product.name} className="h-64 w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => toggleComparison(product)}
                    className="absolute right-4 top-4 rounded-full bg-paper/90 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink shadow-sm dark:bg-[#202521]/90 dark:text-paper"
                  >
                    {comparison.some((entry) => entry.id === product.id) ? 'Bandingkan' : 'Bandingkan'}
                  </button>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-moss/70 dark:text-leaf/80">{product.beanType}</p>
                      <h3 className="mt-2 text-2xl font-semibold">{product.name}</h3>
                    </div>
                    {product.stock && (
                      <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-700">
                        Ready
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-sm text-ink/65 dark:text-paper/70">
                    <MapPin size={14} />
                    {product.origin}
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-semibold text-moss dark:text-leaf">{formatPrice(product.price)}</p>
                      <p className="text-xs uppercase tracking-[0.18em] text-ink/55 dark:text-paper/55">{product.weight}</p>
                    </div>
                    <span className="rounded-full border border-moss/15 px-3 py-1 text-xs font-medium text-ink/70 dark:border-white/10 dark:text-paper/70">
                      {product.roastLevel}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-ink/70 dark:text-paper/70">{product.description}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {product.tastingNotes.map((note) => (
                      <span key={note} className="rounded-full bg-moss/5 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-moss dark:bg-white/5 dark:text-leaf">
                        {note}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedProduct(product)}
                      className="flex-1 rounded-full border border-moss/20 px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-moss dark:border-white/10 dark:text-paper"
                    >
                      Detail
                    </button>
                    <button
                      type="button"
                      onClick={() => addToCart(product)}
                      className="flex-1 rounded-full bg-moss px-4 py-2.5 text-sm font-semibold text-paper transition hover:bg-moss/90"
                    >
                      + Keranjang
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="glass-card mt-8 p-8 text-center text-ink/70 dark:text-paper/70">
              Produk yang Anda cari tidak tersedia. Coba ubah kata kunci atau filter.
            </div>
          )}

          <div className="mt-12 rounded-[2rem] border border-moss/10 bg-[#f6f1e7] p-6 dark:border-white/10 dark:bg-[#1d211d]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-moss dark:text-leaf">Bandingkan</p>
                <h3 className="mt-2 font-display text-3xl">Pilih sampai 3 produk</h3>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-moss/10 bg-white px-3 py-2 text-sm text-ink dark:border-white/10 dark:bg-[#1b1e1c] dark:text-paper">
                <SlidersHorizontal size={16} />
                {comparison.length}/{3}
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {comparisonItems.map((product) => (
                <div key={product.id} className="glass-card p-4">
                  <img src={product.image} alt={product.name} className="h-40 w-full rounded-2xl object-cover" />
                  <h4 className="mt-4 text-lg font-semibold">{product.name}</h4>
                  <p className="mt-1 text-sm text-ink/65 dark:text-paper/65">{product.origin}</p>
                  <div className="mt-4 grid gap-2 text-sm text-ink/75 dark:text-paper/75">
                    <p><span className="font-semibold">Roast:</span> {product.roastLevel}</p>
                    <p><span className="font-semibold">Bean:</span> {product.beanType}</p>
                    <p><span className="font-semibold">Proses:</span> {product.process}</p>
                    <p><span className="font-semibold">Harga:</span> {formatPrice(product.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="articles" className="bg-[#f8f6f1] py-20 dark:bg-[#141916]">
        <div className="section-shell">
          <div className="flex items-end justify-between gap-6">
            <div>
              <span className="pill">Artikel</span>
              <h2 className="mt-6 font-display text-4xl text-ink dark:text-paper">Kupas tuntas kopi untuk pengalaman baru</h2>
            </div>
            <a href="#contact" className="hidden items-center gap-2 text-sm font-semibold text-moss dark:text-leaf md:inline-flex">
              Tanyakan kebutuhan Anda <ChevronRight size={16} />
            </a>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {articles.map((article) => (
              <article key={article.slug} className="glass-card overflow-hidden">
                <img src={article.image} alt={article.title} className="h-56 w-full object-cover" />
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.18em] text-moss dark:text-leaf">
                    <span>{article.category}</span>
                    <span>{article.date}</span>
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold leading-snug">{article.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-ink/70 dark:text-paper/70">{article.excerpt}</p>
                  <a href="#contact" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-moss dark:text-leaf">
                    Baca lebih lanjut <ArrowRight size={16} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20">
        <div className="section-shell text-center">
          <span className="pill">Testimoni</span>
          <h2 className="mt-6 font-display text-4xl text-ink dark:text-paper">Apa kata pelanggan kami</h2>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {testimonials.map((item) => (
              <div key={item.name} className="glass-card p-6 text-left">
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: item.rating }).map((_, index) => (
                    <Star key={`${item.name}-${index}`} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="mt-5 text-base leading-7 text-ink/80 dark:text-paper/80">“{item.quote}”</p>
                <div className="mt-5 border-t border-moss/10 pt-4 dark:border-white/10">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-ink/60 dark:text-paper/60">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="bg-[#f7f3ee] py-20 dark:bg-[#171b18]">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="pill">FAQ</span>
            <h2 className="mt-6 font-display text-4xl text-ink dark:text-paper">Pertanyaan yang sering ditanyakan</h2>
            <p className="mt-4 max-w-lg text-lg leading-8 text-ink/70 dark:text-paper/70">
              Kami bantu Anda memahami proses roasting, pengiriman, dan kebutuhan kopi harian.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((item) => (
              <div key={item.question} className="glass-card p-5">
                <h3 className="text-lg font-semibold">{item.question}</h3>
                <p className="mt-2 text-sm leading-7 text-ink/70 dark:text-paper/70">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20">
        <div className="section-shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="pill">Kontak</span>
            <h2 className="mt-6 font-display text-4xl text-ink dark:text-paper">Mari buat rasa kopi Anda lebih konsisten</h2>
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3 text-ink/75 dark:text-paper/75">
                <MapPin className="mt-1 text-moss dark:text-leaf" size={18} />
                <span>{config.contact.address}</span>
              </div>
              <div className="flex items-start gap-3 text-ink/75 dark:text-paper/75">
                <Phone className="mt-1 text-moss dark:text-leaf" size={18} />
                <span>{config.contact.phone}</span>
              </div>
              <div className="flex items-start gap-3 text-ink/75 dark:text-paper/75">
                <Mail className="mt-1 text-moss dark:text-leaf" size={18} />
                <span>{config.contact.email}</span>
              </div>
              <div className="flex items-start gap-3 text-ink/75 dark:text-paper/75">
                <Clock3 className="mt-1 text-moss dark:text-leaf" size={18} />
                <span>
                  Senin - Jumat {config.operationalHours.weekdays} <br />
                  Sabtu {config.operationalHours.saturday} <br />
                  Minggu {config.operationalHours.sunday}
                </span>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-moss dark:text-leaf">Checkout</p>
                <h3 className="mt-2 text-2xl font-semibold">Keranjang Anda</h3>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-moss/10 text-moss dark:bg-leaf/10 dark:text-leaf">
                <ShoppingCart size={20} />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {cart.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-moss/20 p-6 text-center text-sm text-ink/65 dark:border-white/10 dark:text-paper/70">
                  Keranjang masih kosong. Tambahkan produk favorit Anda.
                </div>
              ) : (
                cart.map((item) => {
                  const product = products.find((entry) => entry.id === item.productId)
                  if (!product) return null
                  return (
                    <div key={item.productId} className="flex items-center gap-4 rounded-2xl border border-moss/10 p-3 dark:border-white/10">
                      <img src={product.image} alt={product.name} className="h-20 w-20 rounded-2xl object-cover" />
                      <div className="flex-1">
                        <p className="font-semibold">{product.name}</p>
                        <p className="text-sm text-ink/60 dark:text-paper/60">{formatPrice(product.price)} / {product.weight}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <button type="button" className="rounded-full border p-1.5" onClick={() => updateCartQuantity(product.id, -1)}>
                            <Minus size={14} />
                          </button>
                          <span className="min-w-6 text-center text-sm font-semibold">{item.quantity}</span>
                          <button type="button" className="rounded-full border p-1.5" onClick={() => updateCartQuantity(product.id, 1)}>
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                      <p className="font-semibold">{formatPrice(product.price * item.quantity)}</p>
                    </div>
                  )
                })
              )}
            </div>

            <div className="mt-6 border-t border-moss/10 pt-4 dark:border-white/10">
              <div className="flex items-center justify-between text-sm text-ink/70 dark:text-paper/70">
                <span>Jumlah item</span>
                <span>{totalItems}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm text-ink/70 dark:text-paper/70">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-lg font-semibold">
                <span>Total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappCheckoutLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-moss px-5 py-3 text-sm font-semibold text-paper transition hover:bg-moss/90"
              >
                <MessageCircle size={18} />
                Checkout WhatsApp
              </a>
              <a
                href={`https://wa.me/${config.contact.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-moss/20 px-5 py-3 text-sm font-semibold text-ink transition hover:border-moss dark:border-white/10 dark:text-paper"
              >
                <Phone size={18} />
                Hubungi kami
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-moss/10 bg-[#f1eee5] py-10 dark:border-white/10 dark:bg-[#111613]">
        <div className="section-shell flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-moss text-sm font-bold text-paper">Z</div>
              <div>
                <p className="font-display text-xl">ZIKHA ROASTERY</p>
                <p className="text-xs uppercase tracking-[0.25em] text-moss/70 dark:text-leaf">Growing Goodness Through Coffee</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-ink/70 dark:text-paper/70">
            <a href="#about" className="hover:text-moss dark:hover:text-leaf">Tentang</a>
            <a href="#services" className="hover:text-moss dark:hover:text-leaf">Layanan</a>
            <a href="#products" className="hover:text-moss dark:hover:text-leaf">Produk</a>
            <a href="#faq" className="hover:text-moss dark:hover:text-leaf">FAQ</a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-moss dark:hover:text-leaf">
              <Instagram size={16} />
              Instagram
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-moss dark:hover:text-leaf">
              <Facebook size={16} />
              Facebook
            </a>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] bg-paper dark:bg-[#171d1b]"
            >
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-paper text-ink shadow-sm dark:bg-[#1d211d] dark:text-paper"
                aria-label="Tutup detail produk"
              >
                <X size={18} />
              </button>

              <div className="grid gap-0 md:grid-cols-2">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="h-full min-h-[320px] w-full object-cover" />
                <div className="p-6 md:p-8">
                  <p className="text-xs uppercase tracking-[0.2em] text-moss dark:text-leaf">{selectedProduct.beanType}</p>
                  <h3 className="mt-3 font-display text-4xl text-ink dark:text-paper">{selectedProduct.name}</h3>
                  <div className="mt-4 flex items-center gap-3 text-sm text-ink/65 dark:text-paper/65">
                    <MapPin size={16} />
                    {selectedProduct.origin}
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-4 border-y border-moss/10 py-4 dark:border-white/10">
                    <div>
                      <p className="text-3xl font-semibold text-moss dark:text-leaf">{formatPrice(selectedProduct.price)}</p>
                      <p className="text-xs uppercase tracking-[0.18em] text-ink/55 dark:text-paper/55">{selectedProduct.weight}</p>
                    </div>
                    <span className="rounded-full border border-moss/15 px-3 py-1 text-xs font-medium text-ink/70 dark:border-white/10 dark:text-paper/70">
                      {selectedProduct.roastLevel}
                    </span>
                  </div>

                  <p className="mt-5 text-base leading-7 text-ink/75 dark:text-paper/75">{selectedProduct.description}</p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-moss/5 p-3 dark:bg-white/5">
                      <p className="text-xs uppercase tracking-[0.18em] text-moss dark:text-leaf">Proses</p>
                      <p className="mt-2 font-medium">{selectedProduct.process}</p>
                    </div>
                    <div className="rounded-2xl bg-moss/5 p-3 dark:bg-white/5">
                      <p className="text-xs uppercase tracking-[0.18em] text-moss dark:text-leaf">Status</p>
                      <p className="mt-2 font-medium">{selectedProduct.stock ? 'Ready stock' : 'Pre order'}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {selectedProduct.tastingNotes.map((note) => (
                      <span key={note} className="rounded-full bg-moss/5 px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] text-moss dark:bg-white/5 dark:text-leaf">
                        {note}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex gap-3">
                    <button
                      type="button"
                      onClick={() => addToCart(selectedProduct)}
                      className="flex-1 rounded-full bg-moss px-5 py-3 text-sm font-semibold text-paper transition hover:bg-moss/90"
                    >
                      Tambahkan ke keranjang
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedProduct(null)}
                      className="rounded-full border border-moss/20 px-5 py-3 text-sm font-semibold text-ink dark:border-white/10 dark:text-paper"
                    >
                      Tutup
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
