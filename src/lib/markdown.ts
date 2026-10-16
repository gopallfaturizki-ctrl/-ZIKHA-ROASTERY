import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import type { AboutContent, Article, Product, Service, SiteConfig } from './types'

const contentPath = path.join(process.cwd(), 'content')

function readFrontmatter<T>(filePath: string): T {
  const source = fs.readFileSync(path.join(contentPath, filePath), 'utf8')
  return matter(source).data as T
}

export function getSiteContent() {
  const config = readFrontmatter<SiteConfig>('config.md')
  const about = readFrontmatter<AboutContent>('about.md')
  const services = readFrontmatter<{ services: Service[] }>('services.md').services
  const productFiles = ['light-roast.md', 'medium-roast.md', 'dark-roast.md']
  const products = productFiles.flatMap((file) =>
    readFrontmatter<{ products: Product[] }>(path.join('products', file)).products,
  )
  const articles = fs.readdirSync(path.join(contentPath, 'articles')).filter((file) => file.endsWith('.md')).map((file) => {
    const source = fs.readFileSync(path.join(contentPath, 'articles', file), 'utf8')
    const { data, content } = matter(source)
    return { ...data, slug: file.replace(/\.md$/, ''), body: content } as Article
  })
  return { config, about, services, products, articles }
}

export async function renderMarkdown(source: string) {
  return (await remark().use(html).process(source)).toString()
}
