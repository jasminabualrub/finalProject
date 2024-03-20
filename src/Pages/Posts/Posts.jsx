
import { Link } from 'react-router-dom'
function Posts({products}) {
  return (
    <div className='ProductsInfo'>
{products.length > 0 ? (
        products.map((e) => (
          <div className="product" key={e._id}>
            <img src={e.mainImage.secure_url.slice(0,4)} alt={e.name} />
			<h6>{e.name.slice(0,4)}</h6>
			<p>${e.price.slice(0,4)}</p>
			<Link to={`/productdetail/${e._id}`}>
				<button className="btn-style">View More</button>
			</Link>
          </div>
        ))
      ) : (
        <h2> No Products Found</h2>
      )}

</div>
  )
}

export default Posts