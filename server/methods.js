Meteor.methods({
  updateIncCart: function (cartId, productId) {
    Carts.update({_id: cartId, 'products._id': productId}, { $inc: { 'products.$.quantity': 1} });
  },

  updateCart: function(cartId, productData){
    Carts.update({_id: cartId}, { $push: { products: productData } });
  },

  updateRemoveProductCart: function (cartId, productId) {
    Carts.update({_id: cartId, 'products._id': productId}, { $pull: { products: { _id: productId } } });
  },

  updateQuantityProductCart: function(cartId, productId, newQuantity){
    console.log(newQuantity);
    Carts.update({_id: cartId, 'products._id': productId}, { $set: { 'products.$.quantity': newQuantity} });
  },

  editProfile: function (userId, completeName) {
  	Meteor.users.update({_id: userId}, {$set: {'profile.completeName': completeName}});
  },

  newOrder: function (userId, products) {
    var user = Meteor.users.findOne({_id: userId});
    _.map(products, function(product){
      Products.update({_id: product._id}, {$inc: {quantity: -(product.quantity)}});
    });
    return Orders.insert({userId: user._id, userCompleteName: user.profile.completeName, products: products});
  }
});
