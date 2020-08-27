
const fs = require('fs');
const path = require('path');

const rootPath = require('../util/path');
const { deepStrictEqual } = require('assert');

const p = path.join(rootPath, 'data', 'cart.json');

module.exports = class Cart {

    static addProduct(id, productPrice){

        // Fetch cart from file / will be a database
        fs.readFile(p, (err, fileContent) => {
            
            let cart = {products: [], totalPrice: 0};

            if (!err) {
                cart = JSON.parse(fileContent);
            }

            // Analyse
            const existingProductIndex = cart.products.findIndex(p => p.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;

            // Add product
            if (existingProduct) {
                updatedProduct = {...existingProduct};
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            }
            else {
                updatedProduct = {id: id, qty: 1};
                cart.products = [...cart.products, updatedProduct];
            }

            cart.totalPrice = cart.totalPrice + +productPrice;

            // write back to file
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err);
            });
        });
    }

    static deleteProduct(id, price) {

        fs.readFile(p, (err, fileContent) => { 
            
            if(err) {
                return;
            }

            const updatedCart = { ...JSON.parse(fileContent) };
            const product = updatedCart.products.find(prod => prod.id === id);

            if(!product){
                return;
            }

            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - (price * product.qty);
      
            fs.writeFile(p, JSON.stringify(updatedCart), err => {
              console.log(err);
            });
        });
    }

    static getCart(cb) {

        fs.readFile(p, (err, fileContent) => {
            const cart = JSON.parse(fileContent);

            if (err) {
                cb(null);
            }
            else{
                cb(cart);
            }
        });
    }
};