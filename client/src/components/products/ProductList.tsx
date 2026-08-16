import ProductCard from "./ProductCard"

const products = [
    {
        id : 1,
        name : "T-shirt-1",
        price : 250,
        category : "Man",
        size : ["S","M","XL"],
        colors : ["Blue","Black","White"],
        rating : 5,
        images : [
            {
            url : "https://static.vecteezy.com/system/resources/thumbnails/051/866/612/small_2x/back-view-of-black-plain-t-shirt-mockup-png.png",
            },
                {
            url : "https://static.vecteezy.com/system/resources/thumbnails/051/866/612/small_2x/back-view-of-black-plain-t-shirt-mockup-png.png",
                }
                ]
    },
    {
        id : 2,
        name : "T-shirt-2",
        price : 200,
        category : "Man",
        size : ["S","M","XL"],
        colors : ["Blue","Black","White"],
        rating : 4,
        images : [
            {
            url : "https://static.vecteezy.com/system/resources/thumbnails/051/866/612/small_2x/back-view-of-black-plain-t-shirt-mockup-png.png",
            },
                {
            url : "https://static.vecteezy.com/system/resources/thumbnails/051/866/612/small_2x/back-view-of-black-plain-t-shirt-mockup-png.png",
                }
        ]
    },
    {
        id : 3,
        name : "T-shirt-3",
        price : 230,
        category : "Man",
        size : ["S","M","XL"],
        colors : ["Blue","Black","White"],
        rating : 4,
        images : [
            {
            url : "https://static.vecteezy.com/system/resources/thumbnails/051/866/612/small_2x/back-view-of-black-plain-t-shirt-mockup-png.png",
            },
                {
            url : "https://static.vecteezy.com/system/resources/thumbnails/051/866/612/small_2x/back-view-of-black-plain-t-shirt-mockup-png.png",
                }
        ]
    },
    {
        id : 4,
        name : "T-shirt-4",
        price : 300,
        category : "Man",
        size : ["S","M","XL"],
        colors : ["Blue","Black","White"],
        rating : 5,
        images : [
            {
            url : "https://static.vecteezy.com/system/resources/thumbnails/051/866/612/small_2x/back-view-of-black-plain-t-shirt-mockup-png.png",
            },
                {
            url : "https://static.vecteezy.com/system/resources/thumbnails/051/866/612/small_2x/back-view-of-black-plain-t-shirt-mockup-png.png",
                }
        ]
    }
]

const ProductList = () => {
  return (
    <main className="grid grid-cols-4 gap-6 mt-4">
        {products.map((product)=> <ProductCard name={product.name} price={product.price} image={product.images[0].url} rating={product.rating}/>)}</main>
  )
}

export default ProductList