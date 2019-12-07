function displayAllProducts() {
  const Url='http://localhost:3000/products';
  $.ajax({
      url: Url,
      method:"GET",
      success: result => {
          $('#tbody tr').remove();
          $.each(result.products, (i, item) => {
              var eachrow = "<tr>"
                          + "<td>" + item.product.name + "</td>"
                          + "<td>" + item.product.price + "</td>"
                          + "<td>" + item.product._id + "</td>"
                          + "</tr>";
              $('#tbody').append(eachrow);
          })
      },
      error: error =>{
          console.log(`Error ${error}`)
      }
  });
};

function displaySpecificProduct() {
  document.getElementById("prodSelect").addEventListener("click", function(event){
      event.preventDefault()
  });
  var id = document.getElementById('ProductID').value
  const Url2='http://localhost:3000/products/' + id;
  $.ajax({
      url: Url2,
      method:"GET",
      success: result => {
          console.log(result);
          document.getElementById("prodSelect").reset();
      },
      error: error =>{
          console.log(`Error ${error}`)
      }
  });
};

function postProduct() {
  document.getElementById("prodSelect").addEventListener("click", function(event){
      event.preventDefault()
  });
  var p = new Product(
      document.getElementById('prodName').value,
      document.getElementById('prodPrice').value
  );
  const Url3='http://localhost:3000/products';
  $.ajax({
      url: Url3,
      method:"POST",
      data: p,
      success: result => {
          console.log(result);
          document.getElementById("prodCreate").reset();
      },
      error: error =>{
          console.log(`Error ${error}`)
      }
  });
}

function Product(pName,pPrice){
  this.name = pName;
  this.price = pPrice;
}
