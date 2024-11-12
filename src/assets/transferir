from flask import Flask, render_template_string, request
from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq
from dotenv import load_dotenv, find_dotenv
import os

# Inicializando o Flask
app = Flask(__name__)

# Carregando variáveis de ambiente do .env
load_dotenv(find_dotenv())
api_key = os.getenv("GROQ_API_KEY")

# Inicializando o modelo de chat
chat = ChatGroq(api_key=api_key, temperature=0, model_name="llama3-8b-8192")

# HTML embutido como string
html_content = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chat with AI</title>
</head>
<body>
    <h1>Chat with AI</h1>
    <form action="/chat" method="post">
        <label for="text">Your Message:</label>
        <input type="text" id="text" name="text" required>
        <button type="submit">Send</button>
    </form>

    {% if response %}
        <h2>Response:</h2>
        <p>{{ response }}</p>
    {% endif %}
</body>
</html>
"""

# Rota principal para exibir o formulário
@app.route("/")
def index():
    return render_template_string(html_content)

# Rota para processar a mensagem e exibir a resposta
@app.route("/chat", methods=["POST"])
def chat_with_ai():
    # Obter o texto enviado pelo usuário
    user_input = request.form["text"]
    
    # Criar o prompt
    prompt = ChatPromptTemplate.from_messages(
        [("system", "You are a personal assistant, so you must provide truthful information in portuguese."),
         ("human", "{text}")]
    )
    
    # Formatar o prompt com o input do usuário
    prompt_input = prompt.format(text=user_input)
    
    # Obter a resposta do modelo
    response = chat.invoke(prompt_input)
    
    # Renderizar a resposta no HTML
    return render_template_string(html_content, response=response.content)

# Executar o servidor
if __name__ == "__main__":
    app.run(debug=True)
