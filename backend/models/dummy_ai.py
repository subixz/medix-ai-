import random
import os

def predict_disease(filepath, scan_type, symptoms):
    # Mocking multimodal prediction based on scan type and symptoms text inputs
    # Simulate a robust decision tree handling various inputs
    
    results = {
        'X-Ray': [
            {"label": "Pneumonia", "confidence": "0.942", "risk_level": "High", "recommendations": ["Antibiotics course", "Rest", "Consult Pulmonologist"]},
            {"label": "Tuberculosis", "confidence": "0.891", "risk_level": "High", "recommendations": ["Isolation", "TB Medication Course"]},
            {"label": "Normal File", "confidence": "0.985", "risk_level": "Low", "recommendations": ["Maintain healthy lifestyle", "Routine checkups"]},
            {"label": "COVID-19", "confidence": "0.875", "risk_level": "Critical", "recommendations": ["Quarantine", "Monitor Oxygen"]}
        ],
        'MRI': [
            {"label": "Brain Tumor (Glioma)", "confidence": "0.918", "risk_level": "Critical", "recommendations": ["Immediate Oncology Consultation", "Surgery Planning"]},
            {"label": "Mild Cognitive Impairment", "confidence": "0.824", "risk_level": "Moderate", "recommendations": ["Cognitive Therapy", "Neurologist Follow-up"]}
        ],
        'CT Scan': [
            {"label": "Lung Nodule", "confidence": "0.870", "risk_level": "Moderate", "recommendations": ["Biopsy", "Regular Monitoring"]},
            {"label": "Hemorrhage", "confidence": "0.956", "risk_level": "Critical", "recommendations": ["Emergency Surgery", "ICU Admission"]}
        ]
    }
    
    options = results.get(scan_type, results['X-Ray'])
    
    # Simple semantic trick with "symptoms"
    if "cough" in symptoms.lower():
        # Force a respiratory issue for demo sake
        if scan_type == 'X-Ray':
            return results['X-Ray'][0] # Pneumonia
    if "headache" in symptoms.lower():
        if scan_type == 'MRI':
            return results['MRI'][0] # Brain Tumor

    return random.choice(options)

import numpy as np
from PIL import Image, ImageDraw

def generate_heatmap(filepath):
    # Load original image
    try:
        img = Image.open(filepath).convert("RGB")
    except Exception as e:
        print("Error opening image:", e)
        return ""

    width, height = img.size
    
    # Create a dummy "heatmap" (radial gradient or blobs)
    heatmap = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    d = ImageDraw.Draw(heatmap)
    
    # Draw a random hot spot (red/yellow blob)
    center_x = random.randint(int(width * 0.2), int(width * 0.8))
    center_y = random.randint(int(height * 0.2), int(height * 0.8))
    radius = min(width, height) // 4
    
    # Simple radial gradient simulation for the hot spot
    for r in range(radius, 0, -5):
        alpha = int(255 * (1 - r/radius))
        # Blue/Green/Red heatmap colors: hot center
        color = (255, max(0, 255 - int(255 * (r/radius))), 0, alpha)
        d.ellipse([center_x - r, center_y - r, center_x + r, center_y + r], fill=color)
    
    # Blend the original image and the heatmap
    img = img.convert("RGBA")
    blended = Image.alpha_composite(img, heatmap).convert("RGB")
    
    # Save the new Grad-CAM image
    base, ext = os.path.splitext(filepath)
    heatmap_filepath = f"{base}_gradcam.jpg"
    blended.save(heatmap_filepath, 'JPEG')
    
    return os.path.basename(heatmap_filepath)
