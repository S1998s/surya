"use client";

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with Next.js 15",
      excerpt:
        "A comprehensive guide to building modern web applications with Next.js 15 and its latest features.",
      date: "March 15, 2025",
      category: "Tutorial",
      readTime: "8 min read",
      image: "📝",
    },
    {
      id: 2,
      title: "Best Practices for React Performance",
      excerpt:
        "Learn optimization techniques to improve your React application's performance and user experience.",
      date: "March 10, 2025",
      category: "Performance",
      readTime: "12 min read",
      image: "⚡",
    },
    {
      id: 3,
      title: "Building RESTful APIs with Node.js",
      excerpt:
        "Deep dive into creating scalable and maintainable REST APIs using Express and Node.js.",
      date: "March 5, 2025",
      category: "Backend",
      readTime: "10 min read",
      image: "🔧",
    },
    {
      id: 4,
      title: "Web Design Trends 2025",
      excerpt:
        "Exploring the latest design trends, animations, and user interface patterns shaping modern web.",
      date: "February 28, 2025",
      category: "Design",
      readTime: "7 min read",
      image: "🎨",
    },
  ];

  return (
    <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-bg">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-white">Latest Articles</h2>
        <div className="h-1 w-20 bg-blue-400 mb-12"></div>

        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-dark-surface rounded-xl overflow-hidden border border-dark-border hover:border-blue-400 transition-all duration-300 group cursor-pointer"
            >
              {/* Image */}
              <div className="h-40 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-5xl group-hover:scale-105 transition-transform">
                {post.image}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-blue-400 bg-blue-600/20 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-dark-muted">{post.readTime}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>

                <p className="text-dark-muted text-sm mb-4">{post.excerpt}</p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-dark-muted">{post.date}</span>
                  <a
                    href="#"
                    className="text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    Read More →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a
            href="/blog"
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            View All Articles
          </a>
        </div>
      </div>
    </section>
  );
}
