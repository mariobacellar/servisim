![Servisim](logo.jpg)
[![Build Status](https://travis-ci.org/mariobacellar/servisim.svg?branch=master)](https://travis-ci.org/mariobacellar/servisim)
![Codacy Badge](https://api.codacy.com/project/badge/Grade/2cd2d9c4edc24cacbdabb69cd9165a43)
[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)

# Servisim - Service Simulator v0.1 
## Description
It is not a <b>sinful</b> server. But you can't forget to disconnect it from your website. It's so simple to use. You will not even want to talk to the API anymore: <b>It is a sin!</b><p>
It is a Javascript builded to <b>mock APis calls</b>.<p>
Basically, it persist JSON files and when something hits the endpoint, it returns the related JSON.
It is very simple to adapt. Just follow the <b>'client'</b> or <b>'product'</b> logic inner.<p>
Into <b>./servisim_db</b> folder you have samples of some fakes JSON.<p>
You must adapt the <b>'servisim.js'</b> file to you endpoint: (i.e: /cliente/select/1).<p>
I used <b>Restify</b> (http://restify.com) but, you can change the web service framework to your favorite into <b>'servisim.js'</b> file.<p>

**Install**<p>
`npn install`

**Run**<p>
`node servisim`

**Test**<p>
`curl http://localhost:8089/api/client/select/1`

**Author**
<p><i><u>Mario da Costa Bacellar</u></i> is <i>SME System Integration</i> as <i>Solution Architect</i>  and postgraduate at 2015 by Universidade Federal do Rio de Janeiro in Computer Engineering and Systems, MBA. He has +19 years experience in Enterprise IT Solutions and <u>SOA Governance</u>.
<p>

**Get in touch:**
<li>mario.bacellar@gmail.com</li>
<li>https://www.linkedin.com/in/mariobacellar<https://www.linkedin.com/in/mariobacellar></li>

<p>

**Aplicação tá pronta. Mas e as APIs? Salvo pelo Node. (Node e Oracle?)**
<li>https://www.linkedin.com/pulse/aplica%C3%A7%C3%A3o-t%C3%A1-pronta-mas-e-apis-salvo-pelo-nodejs-mais-mario-bacellar</li>

____
©2019 No Copyright, You can share!
