$(function(){
  var peerCanvas = $('#peer-review')[0]
  var peerContext = peerCanvas.getContext('2d')
  var colors = [
    'yellow',
    'purple',
    'silver',
    'green',
    'red',
    'blue',
    'orange',
    'fuschia',
    'cyan'
  ]

  peerContext.fillText("Peer Review", 90, 10)
  for(i=0; i<11; i++){
    peerContext.fillText(10-i, 10, 30 + (i*20))
    peerContext.moveTo(25, 30 + i*20)
    peerContext.lineTo(90, 30 + i*20)
  }
  peerContext.stroke()

  //draw peer review bars
  $.ajax({
    url: '/peerReview.json',
    dataType: 'json',
    success: function(data) {
      var categories = Object.keys(data)
      // draw bars
      categories.forEach(function(category, index){
        var value = data[category]
        var y = 30 + (10 - value) * 20
        var x = 30 + (10 * index)
        peerContext.fillStyle = colors[index]
        peerContext.fillRect(x, y, 5, value * 20)
        //draw categories
        peerContext.fillRect(100, 80 + 20 * index, 10, 10)
        peerContext.strokeText(category, 120, 90 + 20 * index)
      });
    }
  });

  var pointCanvas = $('#point-dist')[0]
  var pointContext = pointCanvas.getContext('2d')
  $.ajax({
    url: '/pointDistribution.json',
    dataType: 'json',
    success: function(data){
      var people = Object.keys(data)
      var total = Object.values(data).reduce(function(acc, value) {
        return acc + value
      }, 0);
      var angle = 0
      people.forEach(function(person, index){
        var percent = data[person] / total
        pointContext.arc(100, 100, 80, angle, angle + percent * 2 * Math.PI)
      })
    }
  });
});
