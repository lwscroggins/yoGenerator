'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var LarrygeneratorGenerator = yeoman.generators.Base.extend({
  promptUser: function() {
      var done = this.async();

      // have Yeoman greet the user
      console.log(this.yeoman);

      var prompts = [{
          name: 'appName',
          message: 'What is your app\'s name ?'
      },{
          type: 'confirm',
          name: 'addDemoSection',
          message: 'Would you like to generate a demo section ?',
          default: true
      }];

      this.prompt(prompts, function (props) {
          this.appName = props.appName;
          this.addDemoSection = props.addDemoSection;

          done();
      }.bind(this));
  },

  scaffoldFolders: function(){
    this.mkdir("app");
    this.mkdir("app/css");
    this.mkdir("app/sections");
    this.mkdir("build");
  },

  copyMainFiles: function(){
    this.copy("_footer.html", "app/footer.html");
    this.copy("_gruntfile.js", "Gruntfile.js");
    this.copy("_package.json", "package.json");
    this.copy("_main.css", "app/css/main.css");    
 
    var context = { 
        site_name: this.appName 
    };
 
    this.template("_header.html", "app/header.html", context);
  },

  generateDemoSection: function() {
      if (this.addDemoSection) {
          var done = this.async();
          this.invoke("larrygenerator:section", {args: ["Demo Section"]}, function(){
              done();
          });
      } else {
          this.write( "app/menu.html", "");
      }
  },


  runNpm: function(){
    var done = this.async();
    this.npmInstall("", function(){
        console.log("\nEverything Setup !!!\n");
        done();
    });
  }
});

module.exports = LarrygeneratorGenerator;
