# React ChatBot

**To run the ChatBot clone this repository to your local machine. Then navigate to the ReactChat directory and run the following commands.**
```
npm install
```
Ensure that the application runs on the port : [localhost://5173](http://localhost:5173/) to ensure that the login feature API works (CORS origins).

```
npm run dev
```
Run your version of Google Colab [Notebook](https://colab.research.google.com/drive/1BkL7zYVYtn0JPYKMPJ0tJmK-zMtINx0P?usp=sharing). Ensure that the cloudflare server runs, then copy the streaming server public url. Put your link the the Api Endpoint box below and submit.

![Screenshot of ChatBot UI](https://github.com/YashTote/run-your-gpt-respct/blob/main/ReactChat/src/assets/Screenshot%20from%202023-08-24%2017-50-52.png)

You can ask the question to the bot from the 'Prompt Box'. Currently the messages are limited to 25.
Most of the functional edits of the application can be done through chatbox.jsx file. You may edit the message request limit by editing the ```msgLimit``` variable.

Instead of using the provided python file, I converted the Python code into Js compatible one. The websockets from the Javascript then communicate with the AI Model to send the prompt and receive the response. This saves us a unnecessary overhead and routing the api call through python file.

The entire request - response cycle works like 
``` ChatBot -> CloudFlared API ->ChatBot ``` . 
Instead of ``` ChatBot-> Flask App (Python) -> CloudFlared APi -> Flask App -> ChatBot ```
