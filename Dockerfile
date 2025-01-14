# Sử dụng hình ảnh Python chính thức
FROM python:3.13.0-slim

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép file yêu cầu vào thư mục làm việc
COPY requirements.txt .

# Cài đặt các gói yêu cầu
RUN pip install --no-cache-dir -r requirements.txt

# Sao chép toàn bộ mã nguồn vào thư mục làm việc
COPY . .

# Chạy ứng dụng FastAPI
CMD ["uvicorn", "test:app", "--host", "0.0.0.0", "--port", "8000"]