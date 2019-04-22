# AngularBaulderdashRealGame

The client project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.4.

The server is written in python


Used Flask and CORS to create a cross domain python web server, after waitress was implemented CORS becomes obsolete.

## Development setup

To develop and debug the angular application start the angular development server with a proxy that forwards to python server using this command: 
```sh
ng serve --proxyConfig proxy.conf.json 
```
The angular dev server only accepts request on localhost and runs on port 4200 by default.  add the --port flag to change it

Used a proxy configuration in development so that the angular development server forwards api requests to the python server and we can debug both angular and python.   

## Deploying

The angular development server and flask python server only work on localhost so to allow other players to use their own machines we need a different deploy.

For angular we do a production build to produce the html and javacript files for the angular application.   These files get served from the production python web application (waitress)

The command to build the production version of angular application

```sh
ng build --prod --outputPath C:\Users\leroy\OneDrive\Documents\hello_flask\client --baseHref /
```


To quickly test the build you skip the --prod flag and the build is much faster

Used waitress as a production web server to serve to other machines

