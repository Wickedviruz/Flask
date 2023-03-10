from flask import Flask, jsonify, request, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    message = data['message']
    response = {
        'message': f'You said: "{message}"'
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
