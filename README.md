![Servsim](logo.jpg)
     
# Servsim - Server Simulator v0.1 
## Mario da Costa Bacellar
###### https://www.linkedin.com/in/mariobacellar

## Description
- It is a program builded to <b>mock APis calls</b>.<p>
- Basically it persists JSON's files to return to applications that need to consume JSON from APIs that are not yet ready.<p>
- It is very simple to adapt. Just follow the <b>'client'</b> or <b>'product'</b> logic inner.<p>
- Into <b>./servsim_db</b> folder you have samples of some fakes JSON.<p>
- You must adapt the <b>'servisim.js'</b> file to you endpoint: (i.e: /cliente/select/1).<p>
- I used <b>Restify</b> (http://restify.com/) but, you can change the web service framework to your favorite into <b>'servisim.js'</b> file.<p>



## Install
- npn install

## Run
- node servsim

## Test
- curl http://localhost:8089/client/select/1
