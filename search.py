from flask import Flask, request, jsonify
import openai

app = Flask(__name__)

openai.api_key = "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"

@app.route('/')
def index():
    return 'Welcome to the GPT-3 Search Engine'

@app.route('/search', methods=['POST'])
def search():
    query = request.json['query']
    response = openai.Completion.create(engine="text-davinci-002", prompt=f"{query}", max_tokens=2048, n=1,stop=None,temperature=0.7)
    return jsonify(response.choices[0].text)

if __name__ == '__main__':
    app.run(debug=True)
