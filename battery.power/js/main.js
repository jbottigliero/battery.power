

var Application =  {

  demo: true,

  storage: false,

  init: function() {

    // it's a demo.
    if(this.demo) this.setHighscore(1);

    var self = this;
    this.initView();

    navigator.battery.addEventListener('levelchange', function () {

      navigator.vibrate(0);

      var level = navigator.battery.level;

      if(level < self.getHighscore()){
        self.newHighscore(level);
      }
    }, false);

    navigator.battery.addEventListener('chargingchange', function(){
      if(navigator.battery.charging) {
        self.chargin();
      }
    });

  },

  chargin: function(){
    $('#newhighscore').remove();
    this.initView('Welp, you\'re charging now so that\'s no fun.');
  },

  newHighscore: function(score){
    this.setHighscore(score);
    this.initView(
      $('<section id="newhighscore"></section>')
        .append('<img src="assets/images/batty.gif" />')
        .append('<img src="assets/images/batty.gif" />')
        .append('<img src="assets/images/batty.gif" />')
        .append('<img src="assets/images/batty.gif" />')
        .append('<img src="assets/images/batty.gif" />')
        .append('<br/><h1><marquee><blink>new highscore!</blink></marquee></h1>')
        .append('<img src="assets/images/batty.gif" />')
        .append('<img src="assets/images/batty.gif" />')
        .append('<img src="assets/images/batty.gif" />')
        .append('<img src="assets/images/batty.gif" />')
        .append('<img src="assets/images/batty.gif" />')
    );
    
    document.getElementsByTagName('audio')[0].play();
    
    // while(true)   
    //   navigator.vibrate(10);

  },

  setHighscore: function(score) {
    localStorage.setItem('highscore', score);
  },

  getHighscore: function(){
    var score = localStorage.getItem('highscore');
    if(!score) {
      score = navigator.battery.level;
      this.setHighscore(score);
    }
    return score;
  },

  initView: function(message){
    $('#content')
      .html(message)
      .append('<h3>your latest highscore: '+(this.getHighscore() * 100) + '%</h3>');
  },
}

$(document).ready(function(){
  Application.init();
});