import './App.css';

function App() {
  const posts = [
    {
      title: "The Resilient Beauty of Sunflowers",
      author: "Me",
      date: "2024-01-06 15:48",
      description: "In a world of fleeting moments, the sunflower stands tall as a symbol of resilience and hope. Discover the fascinating journey of these golden blooms, from their origins in ancient cultures to their modern-day significance. Explore the deep connection between sunflowers and the human spirit, and how their bright petals inspire us to find strength and beauty in every season of life.",
      imgSrc: "https://cdn.stocksnap.io/img-thumbs/960w/macro-yellow_SRX6B3DNYA.jpg"
    },
  ];


  return (
    <main>
      <header>
        <a href="/" className="logo">Blog</a>
        <nav>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </nav>
      </header>
      {posts.map((post, index) => (
        <div className="post" key={index}>
          <div className="image">
            <img src={post.imgSrc} alt={post.title} />
          </div>
          <div className="content">
            <h2>{post.title}</h2>
            <p className="info">
              <a href="#" className="author">{post.author}</a>
              <time>{post.date}</time>
            </p>
            <p className="description">{post.description}</p>
          </div>
        </div>
      ))}
    </main>
  );
}

export default App;
