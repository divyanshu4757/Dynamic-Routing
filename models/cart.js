
const fs = require('fs')
const path = require('path')



const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'Cart.json'
  );


module.exports = class Cart{
  
    static addProduct(id , productPrice){
        //fetch the previous cart

        fs.readFile(p , (err , fileContent)=>{
            let cart = {products:[] , totalPrice:0};
            if(!err){
                cart = JSON.parse(fileContent);

            }
             //analyse the cart = find exisiting product

        //add the product to the cart

        
            const exisitingProductIndex= cart.products.findIndex(prod => prod.id ===id)
            const exisitingProduct = cart.products[exisitingProductIndex]
            let updatedProduct;

            if(exisitingProduct){
   updatedProduct = {...exisitingProduct};

   updatedProduct.quantity++;

   cart.products = [...cart.products, updatedProduct];

   cart.products[exisitingProductIndex] = updatedProduct;

            }

            else{
                updatedProduct = {
                    id:id,
                    qty:1,
                    price:0
                }
          cart.products = {...cart.products , updatedProduct}

            }
          cart.totalPrice = cart.totalPrice +productPrice;

          fs.writeFile(p, JSON.stringify(cart), (err)=>{
            console.log(err);
        })

        
        })
    }}