function displayAllJournals() {
  const Url='http://localhost:3000/journals';
  $.ajax({
      url: Url,
      method:"GET",
      success: result => {
          //$('#jbody').remove();
          $.each(result.journals, (i, item) => {

              var eachrow = "</br>"
                + item.journal._id + "</br>"            
                + item.journal.date + "</br>"
                    + "What happened today? : " + item.journal.p1 + "</br>"
                    + "What challenges did I face today? : " + item.journal.p2 + "</br>"
                    + "How did I take care of myself today? : " + item.journal.p3 + "</br>"
                    + "What am I grateful for? : " + item.journal.p4 + "</br>"
                    + "Do I have any other thoughts about today? : " + item.journal.p5 + "</br>"
                    + "What goals do I have for tomorrow? : " + item.journal.p6 + "</br>" 
                        + "Mood : " + item.journal.mood + "</br>" + "</br>";
              $('#jbody').append(eachrow);
          })
      },
      error: error =>{
          console.log(`Error ${error}`)
      }
  });
};

function displaySpecificJournals() {
  document.getElementById("journalSelect").addEventListener("click", function(event){
      event.preventDefault()
  });
  var id = document.getElementById('JournalID').value
  const Url2='http://localhost:3000/journals/' + id;
  $.ajax({
      url: Url2,
      method:"GET",
      success: result => {
          console.log(result);
          document.getElementById("journalSelect").reset();
      },
      error: error =>{
          console.log(`Error ${error}`)
      }
  });
};

function deleteJournal() {
    /*document.getElementById("journalDeletee").addEventListener("click", function(event){
        event.preventDefault()
    });*/
    var id = document.getElementById('d_id').value
    const Url2='http://localhost:3000/journals/' + id;
    $.ajax({
        url: Url2,
        method:"DELETE",
        success: result => {
            console.log(result);
            document.getElementById("journalDelete").reset();
        },
        error: error =>{
            console.log(`Error ${error}`)
        }
    });
  };

  function updateJournal() {
    /*document.getElementById("journalSelect").addEventListener("click", function(event){
        event.preventDefault()
    });*/

    var p = new Journal(
        document.getElementById('p1').value,
        document.getElementById('p2').value,
        document.getElementById('p3').value,
        document.getElementById('p4').value,
        document.getElementById('p5').value,
        document.getElementById('p6').value,
        document.getElementById('mood').value
    );

    const Url3='http://localhost:3000/journals/' + id;
    $.ajax({
        url: Url3,
        method:"PATCH",
        data: p,
        success: result => {
            console.log(result);
            document.getElementById("journalUpdate").reset();
            $('#jbody').remove();
        },
        error: error =>{
            console.log(`Error ${error}`)
        }
    });
  }

function postJournal() {
  /*document.getElementById("journalSelect").addEventListener("click", function(event){
      event.preventDefault()
  });*/
  var p = new Journal(
      document.getElementById('p1').value,
      document.getElementById('p2').value,
      document.getElementById('p3').value,
      document.getElementById('p4').value,
      document.getElementById('p5').value,
      document.getElementById('p6').value,
      document.getElementById('mood').value
  );
  const Url4='http://localhost:3000/journals';
  $.ajax({
      url: Url4,
      method:"POST",
      data: p,
      success: result => {
          console.log(result);
          document.getElementById("journalCreate").reset();
          $('#jbody').remove();
      },
      error: error =>{
          console.log(`Error ${error}`)
      }
  });
}

function Journal(p1, p2, p3, p4, p5, p6, mood){
    this.date = Date.now;
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    this.p4 = p4;
    this.p5 = p5;
    this.p6 = p6;
    this.mood = mood;
}
