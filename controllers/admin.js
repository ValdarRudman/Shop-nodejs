const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.postAddProduct = (req, res, next) => {
  
  const product = new Product(null, req.body.title, req.body.imageUrl, req.body.description, req.body.price);
  product.save();

  res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {

  const editMode = req.query.edit;
  const productId = req.params.productId;
  
  if (!editMode) {
    return res.redirect('/');
  }

  Product.findById(productId, (product) => {

    if(!product){
      return res.redirect("/");
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  });
};

exports,this.postEditProduct = (req, res, next) => {

  const product = new Product(req.body.productId, req.body.title, req.body.imageUrl, req.body.description, req.body.price);
  product.save();
  
  res.redirect("/admin/product-list");
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/product-list', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/product-list'
    });
  });
};


exports.postDeleteProduct = (req, res, next) => {

    Product.deletebtId(req.body.productId);
    res.redirect("/admin/products");
};