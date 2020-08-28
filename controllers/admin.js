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
  Product.create({
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    imageUrl: req.body.imageUrl

  }).then(result => {
    console.log(result);
    res.redirect('/admin/product-list');
  }).catch(err => {
    console.log(err);
  });
};

exports.getEditProduct = (req, res, next) => {

  const editMode = req.query.edit;
  const productId = req.params.productId;

  if (!editMode) {
    return res.redirect('/');
  }

  Product.findByPk(productId).then(product => {

    if (!product) {
      return res.redirect("/");
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    }).catch(err => {
      console.log(err);
    });
  });
};

exports.postEditProduct = (req, res, next) => {

  Product.findByPk(req.body.productId).then(product => {
    product.title = req.body.title;
    product.description = req.body.description;
    product.price = req.body.price;
    product.imageUrl = req.body.imageUrl;

    return product.save();
  }).then(result => {
    console.log("Updated product")
    res.redirect("/admin/product-list");
  }).catch(err => {
    console.log(err);
  });
}

exports.getProducts = (req, res, next) => {
  Product.findAll().then(products => {
    res.render('admin/product-list', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/product-list'
    });
  }).catch(err => {
    console.log(err);
  });
};


exports.postDeleteProduct = (req, res, next) => {

    Product.findByPk(req.body.productId).then(product => {
      return product.destroy();
    }).then(() => {
      res.redirect("/admin/product-list");
    }).catch(err => { console.log(err) });
};