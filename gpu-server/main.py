from flask import Flask
import tensorflow as tf
import sys

app = Flask(__name__)

def check_gpu_availability():
    # 檢查是否有可用的 GPU
    if tf.config.list_physical_devices('GPU'):
        print("GPU is available.")
    else:
        print("No GPU available. Exiting.")
        sys.exit(1)
    

# 處理根路徑的請求
@app.route('/')
def index():
    return "Hello, this is your Flask web application!"

if __name__ == '__main__':
    check_gpu_availability()
    app.run(debug=True)

