# 使用 TensorFlow 映像作為基底映像
FROM tensorflow/tensorflow:latest-gpu

# 設定工作目錄
WORKDIR /app

# 將應用程式代碼複製到映像中
COPY . /app

# 安裝所需的 Python 套件
# RUN python3 -m pip install --upgrade pip
RUN pip install --ignore-installed -U Flask

# 檢查 GPU 可用性的程序
# RUN python -c "import tensorflow as tf; print('GPU is available.' if tf.config.list_physical_devices('GPU') else 'No GPU available. Exiting.');"

# 開放容器的 5000 端口（Flask 的默認端口）
EXPOSE 5000

# 啟動 Flask 應用程式
CMD ["python", "main.py"]
