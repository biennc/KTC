import './App.css'
import Cart from './components/Cart'
import Products from './components/Products'
import ShoppingCart from './components/ShoppingCart'

function App() {

  return (
    <>
      <div style={{ marginBottom: '20px', backgroundColor: '#f0f0f0', padding: '10px' }}>
        <Cart />
      </div>
      <ShoppingCart />
      <hr style={{ margin: '20px 0', border: '1px solid #eee' }} />
      <Products />    </>
  )
}

export default App
