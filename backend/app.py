import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename
from models.dummy_ai import predict_disease, generate_heatmap
import datetime

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
@app.route('/uploads/<path:filename>')
def serve_uploads(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# Users/Auth mock database
users_db = []
appointments_db = []

@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.json
    users_db.append(data)
    return jsonify({"message": "User registered successfully", "user": data}), 201

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json
    for user in users_db:
        if user.get('email') == data.get('email') and user.get('password') == data.get('password'):
            return jsonify({"message": "Login successful", "user": {"email": user.get('email'), "role": user.get('role', 'Patient')}}), 200
    return jsonify({"error": "Invalid credentials"}), 401

@app.route('/api/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
        
    symptoms = request.form.get('symptoms', '')
    scan_type = request.form.get('scanType', 'X-Ray')

    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)

    # Dummy AI Prediction
    prediction = predict_disease(filepath, scan_type, symptoms)
    
    # Dummy Heatmap generation
    heatmap_filename = generate_heatmap(filepath)
    heatmap_url = f"http://localhost:5000/uploads/{heatmap_filename}" if heatmap_filename else ""

    explanation = f"The MediX AI engine analyzed the {scan_type} scan and correlated it with the provided patient symptoms ('{symptoms}'). Key regions of interest were identified in the visual heatmap (Grad-CAM activation highlights), indicating consistent pathological markers associated with {prediction['label']}. Clinical confidence stands at {prediction['confidence']}."

    return jsonify({
        "diagnosis": prediction['label'],
        "confidence": prediction['confidence'],
        "heatmap": heatmap_url,
        "explanation": explanation,
        "risk_level": prediction['risk_level'],
        "recommendations": prediction['recommendations']
    })

@app.route('/api/appointments', methods=['POST'])
def book_appointment():
    data = request.json
    data['id'] = len(appointments_db) + 1
    appointments_db.append(data)

    return jsonify({
        "message": "Appointment booked successfully.",
        "appointment": data
    }), 201

@app.route('/api/appointments', methods=['GET'])
def get_appointments():
    return jsonify(appointments_db), 200

if __name__ == '__main__':
    print("Starting MediX AI Backend Server on Port 5000...")
    app.run(debug=True, port=5000)
