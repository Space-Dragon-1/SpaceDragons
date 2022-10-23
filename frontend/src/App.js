import data from './data';

function App() {
  return (
    <div>
      <header>
        <a href="/">Space Shop</a>
      </header>
      <main>
        <h1>Productos destacados</h1>
        {data.products.map((product) => (
          <div key={product.slug}>
            <img src={product.image} alt={product.name} />
            <p>{product.name}</p>
            <p>{product.price}</p>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
