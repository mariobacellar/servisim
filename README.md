![Servsim](logo.jpg)

# Servsim - Server Simulator v0.1 
## Mario da Costa Bacellar
###### https://www.linkedin.com/in/mariobacellar

## Description
- It is not a <b>sinful</b> server. But you can't forget to disconnect it from your website. It's so fun to use it that you will not even want to talk to the API anymore: It is a sin!<p>
- It is a Javascript builded to <b>mock APis calls</b>.<p>
- Basically, it persist JSON files and when something hits the endpoint, it returns the related JSON.
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
