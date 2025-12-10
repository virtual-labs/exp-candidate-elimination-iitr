
const myContainer = document.getElementById('box');
// myContainer.style.padding="0px";

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var modalBtn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var closeBtn = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
modalBtn.addEventListener("click", function () {
  modal.style.display = "block";
});

// When the user clicks on <span> (x), close the modal
closeBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});



var flag_pre=0;var flag_custom=0;

function table_alert()
{
    Swal.fire({
        icon:'info',
        title: 'Set Trained Data!',
        html: `<b style="color:#004E86;text-align:left">Select an option for trained data:</b><br><br>
          <input type="radio" id="option1" name="option" value="Pre-defined Table">
          <label for="option1">Predefined Table</label><br><br>
          <input type="radio" id="option2" name="option" value="Custom Table">
          <label for="option2">Custom Table (create your own dataset)</label><br>
         
        `,
        customClass: {
            container: "position-absolute",
                popup: "swal-popup",
                title: "swal-title",
                content: "swal2-content",
                confirmButton: "btn",
        },
        target: '.container',
            didOpen: () => {
             
                const container = document.querySelector('.position-absolute');
                const containerWidth = container.offsetWidth;
                const containerHeight = container.offsetHeight;

                // Change font size based on container size
                if (containerWidth >= 1000 && containerHeight >= 672) {
                    container.style.fontSize = '24px';
                } else {
                    container.style.fontSize = '16px';
                }

                // Adjust dimensions and position of the Swal container
                container.style.position = 'absolute';
                container.style.width = '100%';
                container.style.height = '100%';
                container.style.top = '0';
                container.style.left = '0';
                container.style.padding = '0';

                document.querySelector('.swal2-content').style.textAlign='left';
                document.querySelector('.btn').style.borderRadius='20px'
            },
    showCloseButton: false, // Disable the close button
    allowOutsideClick: false, // Prevent closing by clicking outside the modal
    allowEscapeKey: false,
    confirmButtonText: `<b style="color:#FFC000">SUBMIT</b>`,
        preConfirm: () => {
          const selectedOption = document.querySelector('input[name="option"]:checked');
          if (!selectedOption) {
            Swal.showValidationMessage('Please select an option');
          } else {
            return selectedOption.value;
          }
        }
      }).then((result) => {
        if (result.isConfirmed) {
            if(result.value=='Pre-defined Table')
            {
              alerts('success','Dataset Added!!','Now, please click the <b style="color:#004E86">NEXT</b> button to execute the algorithm on the dataset..');
                flag_pre=1;
                document.getElementById('predefined-data-table').style.display='block';
                document.getElementById('dataSetTable').style.display='none';

                f=document.getElementById("add-button")
                f.style.cursor="not-allowed";
                f.disabled = true;

                ne = document.getElementById("NEXT")
                ne.disabled=false;
                ne.style.cursor="pointer";

                var drop=document.getElementsByClassName("input-control");
    for(i=0;i<drop.length;i++)
    {
      drop[i].disabled = true;
      drop[i].style.cursor="not-allowed";
    }
                
                document.getElementById('reset').disabled=false;
              
            }
         
          else if(result.value=='Custom Table')
          {
            alerts('info','Create the dataset!!','Choose a value for each attribute using the dropdown menu, and then click the <b style="color:#004E86">ADD</b> button.');
          flag_custom=1;
          }
          
        }
      });
}


function alerts(icon,title,html)
{
  Swal.fire({
    icon: icon,
    title: title,
    html: html,
    allowOutsideClick: false,
    target: '.container',
    customClass: {                      // <------ customClass is an object!
      container: 'position-absolute',
  
    },     
  });
}

// table
let index = 1;
let count = 0;

function addDataToTable() {

  const dataPointsTable = document.getElementById("dataSetTable");
  const tbody = dataPointsTable.getElementsByTagName("tbody")[0];

  let sky = (document.getElementById("sky"));
  let temperature = (document.getElementById("temperature"));
  let humid = (document.getElementById("humid"));
  let wind = (document.getElementById("wind"));
  let water = (document.getElementById("water"));
  let forest = (document.getElementById("forest"));
  let output = (document.getElementById("output"));
  
if ( sky.value!='NULL' && temperature.value!='NULL' && humid.value!='NULL' && wind.value!='NULL' && water.value!='NULL' && forest.value!='NULL' && output.value!='NULL'){
  const row = document.createElement("tr");
  row.classList.add("toCheck")
    rl=document.getElementsByClassName("toCheck")
    console.log(rl)
    console.log(rl.length)
    let count_rows=0
    des=true;
    for (var j = 0; j < rl.length; j++) {
     if(rl[j].cells[1].innerHTML==sky.value && rl[j].cells[2].innerHTML==temperature.value && rl[j].cells[3].innerHTML==humid.value && rl[j].cells[4].innerHTML==wind.value && rl[j].cells[5].innerHTML==water.value && rl[j].cells[6].innerHTML==forest.value){
      count_rows=count_rows+1
      
      if(count_rows==1){
        alerts('error','Duplicate Row!!','The table already contains identical attribute values; kindly choose alternative values');
        des=false;
        break;
      }
     }
     }


     if(des==true){
      d= document.getElementById('reset');
      if(d.disabled)
      {
        d.disabled=false;
      }
      row.innerHTML = `
      <td>${index}</td>
      <td>${sky.value}</td>
      <td>${temperature.value}</td>
      <td>${humid.value}</td>
      <td>${wind.value}</td>
      <td>${water.value}</td>
      <td>${forest.value}</td>
      <td>${output.value}</td>
      <td><input type="button" class="delete-button" value="Delete" onClick="deleteRow(this)"></td>

    `;


  tbody.appendChild(row);
  index++;
  count++;
  sky.value='NULL'
  temperature.value='NULL'
  humid.value='NULL'
 wind.value='NULL'
 water.value='NULL'
 forest.value='NULL'
 output.value='NULL'

sky.style.border=""
temperature.style.border=""
humid.style.border=""
wind.style.border=""
water.style.border=""
forest.style.border=""
output.style.border=""

     }
}
else
  {
    let countFof=0
    let a=""
    if(sky.value=='NULL'){
      countFof=countFof+1
      sky.style.border="2px solid red"
    }
    else{
      sky.style.border=""
    }
    if(temperature.value=='NULL'){
       countFof=countFof+1
      temperature.style.border="2px solid red"
    }
    else{
      temperature.style.border=""
    }
    if(humid.value=='NULL'){
      countFof=countFof+1
      humid.style.border="2px solid red"
    }
    else{
      humid.style.border=""
    }
    if(wind.value=='NULL'){
      countFof=countFof+1
      wind.style.border="2px solid red"
    }
    else{
      wind.style.border=""
    }

    if(water.value=='NULL'){
      countFof=countFof+1
      water.style.border="2px solid red"
    }
    else{
      water.style.border=""
    }

    if(forest.value=='NULL'){
       countFof=countFof+1
       forest.style.border="2px solid red"
     }
     else{
       forest.style.border=""
     }

     if(output.value=='NULL'){
       countFof=countFof+1
       output.style.border="2px solid red"
     }
     else{
       output.style.border=""
     }

    if(countFof>0){
      g='MISSING VALUE'
        a=`Select the value for highlighted cell.`
    }
   

    Swal.fire({
      icon: 'error',
      title: g,
      text: a,
      allowOutsideClick: false,
      target: '.container',
      customClass: {                      // <------ customClass is an object!
        container: 'position-absolute',
        popup:"swal2-popup",
        title: "swal-title",
        content: "swal2-content",
      },     
    });

  }
  if (count === 4) {
    var drop=document.getElementsByClassName("input-control");
    for(i=0;i<drop.length;i++)
    {
      drop[i].disabled = true;
      drop[i].style.cursor="not-allowed";
    }
  data=document.getElementById('dataSetTable');
  f=document.getElementById("add-button");
  f.style.cursor="not-allowed";
  f.disabled = true;  
    let count_lastColumn=0;
    for(var j = 1; j < 5; j++)
    {
      var rows=data.rows.item(j).cells;
      console.log(rows.item(7).innerHTML);

     if(rows.item(7).innerHTML==='No')
     {
      count_lastColumn=count_lastColumn+1
      console.log(count_lastColumn)
     }
    }

    if(count_lastColumn==4 || count_lastColumn==3 || count_lastColumn==2){
      alerts('warning','Only 1 negative (i.e. Enjoy sport: No) example allowed!!','If there are too many negative examples,\
       utilize the <b style="color:red">Delete</b> button to remove them, and then try adding a positive examples.');   
      return;
     }
     else if(count_lastColumn==0){
      alerts('warning','All positive (i.e. Enjoy sport: Yes) examples not allowed!!',
      'Utilize the <b style="color:red">Delete</b> button to remove any one row, and then try adding a negative example.');   
      return;
     }
  
    Swal.fire({
        showCancelButton: true,
      title: "Do you want to delete any row?",
      icon: "warning",
      allowOutsideClick: false,
      cancelButtonText: "NO",
      cancelButtonColor : "red",
      confirmButtonText: "YES",
      target: '.container',
      customClass: {                      // <------ customClass is an object!
        container: 'position-absolute'
      }, 
      
    }).then((result) => {
      if (result.isConfirmed) {
        const ne = document.getElementById("NEXT")
          ne.disabled=false;
          ne.style.cursor="pointer";
          ne.onclick=function(){toCheckTheNextFunc()}
        
        ;}  
        else{
            f=document.getElementById("add-button")
            f.style.cursor="not-allowed";
            f.disabled = true;
            for(let i =3;i>=0;i--){
              const del=document.getElementsByClassName("delete-button")
              del[i].disabled=true;
              del[i].style.opacity=0.5
              del[i].style.cursor="not-allowed";
            }
            
       
          const ne = document.getElementById("NEXT")
          ne.disabled=false;
          ne.style.cursor="pointer"
          
          Swal.fire({
            icon: 'success',
            html: `Now, click on the <b style="color: #004E86">NEXT</b> button to execute the algorithm on the dataset.`,
            allowOutsideClick: false,
            target: '.container',
            customClass: {                      // <------ customClass is an object!
              container: 'position-absolute'
            },     
  
      
    });

    var next = document.getElementById("NEXT")
    next.disabled=false;
    next.style.cursor="pointer";
        }
      
    });
  
  }
}

function deleteRow(button) {

  // Traverse up the DOM to find the table row (tr) element
  var row = button.parentNode.parentNode;

  // Remove the row from the table
  row.parentNode.removeChild(row);

  // Update the serial numbers
  updateSerialNumbers();
  f=document.getElementById("add-button")
    f.style.cursor="pointer";
    f.disabled = false;
    const ne = document.getElementById("NEXT")
    ne.disabled=true;
    ne.style.cursor="not-allowed"
    var drop=document.getElementsByClassName("input-control");
    for(i=0;i<drop.length;i++)
    {
      drop[i].disabled = false;
      drop[i].style.cursor="pointer";
    }

}

function updateSerialNumbers() {
  index--;
  count--;
  var table = document.getElementById('dataSetTable');
  var rows = table.getElementsByTagName('tr');

  // Start the serial number from 1
  var serialNumber = 1;

  // Loop through each row (skip the header row)
  for (var i = 1; i < rows.length; i++) {
    var row = rows[i];

    // Update the serial number cell
    var sNoCell = row.cells[0];
    sNoCell.textContent = serialNumber;

    // Increment the serial number for the next row
    serialNumber++;
  }
}




function theNextButton(){
  var tableData = [];let tbody;
  if(flag_custom)
  {
     tbody = document.getElementById("for11");
     location.href = "compute.html";

     for (var i = 0; i < tbody.rows.length; i++) {
       var rowData = [];
       var cells = tbody.rows[i].cells;
     
       // Iterate through each cell of the row
       for (var j = 0; j < cells.length-1; j++) {
        // var columnName = tbody.rows[0].cells[j].textContent; 
         var cellValue = cells[j].textContent;
     
         rowData[j] = cellValue;
       }
     
       tableData.push(rowData);
     }
  }
  else{
    tbody = document.getElementById("for_pre");
    location.href = "compute.html";

    for (var i = 0; i < tbody.rows.length; i++) {
      var rowData = [];
      var cells = tbody.rows[i].cells;
    
      // Iterate through each cell of the row
      for (var j = 0; j < cells.length; j++) {
       // var columnName = tbody.rows[0].cells[j].textContent; 
        var cellValue = cells[j].textContent;
    
        rowData[j] = cellValue;
      }
    
      tableData.push(rowData);
    }
  }


  
  var serializedData1 = JSON.stringify(tableData); // Convert data to a string format
  
  localStorage.setItem('objectToPass', serializedData1); 

}


function toCheckTheNextFunc(){
  rl=document.getElementsByClassName("toCheck");
  if(rl.length==4){
    theNextButton()
  }
  }

/*
  var rainyCount=0;var sunnyCount=0;
  var coldCount=0;var warmCount=0;
  var normalCount=0;var highCount=0;
  var strongCount=0;var high2Count=0;
  var warm2Count=0;var coolCount=0;
  var sameCount=0;var changeCount=0;
  countAttributes();

  function countAttributes()
  {
      for(i=0;i<4;i++)
  {
      for(j=1;j<7;j++)
      {
          data=rl[i].cells[j].innerHTML;
          if(j==1)
          {
              
       if(data=='Rainy')
       {
          rainyCount++
       }
       else{
          sunnyCount++;
       }
          }
  
          else if(j==2)
          {
             
       if(data=='Cold')
       {
          coldCount++
       }
       else{
          warmCount++;
       }
          }
  
          else if(j==3)
          {
             
       if(data=='Normal')
       {
          normalCount++
       }
       else{
          highCount++;
       }
          }
  
          else if(j==4)
          {
           
       if(data=='Strong')
       {
          strongCount++
       }
       else{
          high2Count++;
       }
          }
  
          else if(j==5)
          {
            
       if(data=='Warm')
       {
          warm2Count++
       }
       else{
          coolCount++;
       }
          }
  
          else if(j==6)
          {
             
       if(data=='Same')
       {
          sameCount++
       }
       else{
          changeCount++;
       }
          }
      }
      
  }
  
  }
  */