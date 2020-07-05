const xlabels = [];
const ytemps = [];
async function drawIt()
{
    //WAIT for Data, then proceed with drawing:
   await  getData();
const ctx = document.getElementById('myChart').getContext('2d');

const myChart = new Chart(ctx, {
   type: 'line',
   data: {
       labels: xlabels,
       datasets: [{
           label: 'Combined Land-Surface Air and Sea-Surface Water Temperature Anomalies in C°',
           data: ytemps,
           fill: false,
           backgroundColor: 
               'rgba(255, 99, 132, 0.2)'
           ,
           borderColor: 
               'rgba(255, 99, 132, 1)'
           ,
           borderWidth: 2,
           
       }]
   },
   options: {
scales: {
   yAxes: [{
       ticks: {
           // Include a degree sign in the ticks
           callback: function(value, index, values) {
               return '°' + value;
           }
       }
   }]
}
}
});}
//Call Drawing Function:
drawIt();


async function getData (){
    //Fetch data from csv file.
   const resp = await fetch('ZonAnn.Ts+dSST.csv');
   //Converting data to text.
   const data = await resp.text();
   //Splittubg data based on line breaker then removing table header:
   const table = data.split('\n').slice(1);
//Loop over the table:
  table.forEach((row)=>{
       const columns = row.split(',');
       const year = columns[0];
       const temp = columns[1];
       xlabels.push(year);
       //Add 14 which is the avg declared by NASA docs. to correct data:
       ytemps.push(parseFloat(temp) + 14);
       
  })
}