# Ghi chú:
- Nhánh main là nhánh tổng hợp cho các nhánh của dự án chúng em. Trong các nhánh khác main branch, bạn BE có duy trì 2 nhánh là be (bản có thực hiện phân quyền) và be-no-auth (bản không thực hiện phân quyền). 
- Do bạn FE có chút trục trặc trong phân quyền nên để gọi api thành công, main branch sẽ chứa nhánh be-no-auth thay vì be (bạn BE tạo tài liệu API theo nhánh này). Rất mong nhận được sự thông cảm từ thầy ạ.

1. Giới thiệu
Mục đích: Hướng dẫn cài đặt 
Công nghệ sử dụng: ReactJS (Frontend), FastAPI (Backend), MongoDB (Cơ sở dữ liệu), Docker, Docker Compose.

2. Yêu cầu hệ thống
Docker: Phiên bản 27.x hoặc mới hơn.
Docker Compose: Phiên bản 2.29 hoặc mới hơn.
Git: Để quản lý mã nguồn.
Telnet: Để kiểm tra kết nối mạng

3. Cài đặt môi trường phát triển

3.1. Clone repository
Clone repository:
git clone <repository-url>
cd <repository-directory>

3.2. Cấu trúc thư mục
frontend/admin: Chứa mã nguồn ReactJS cho admin
frontend/frontend_user: Chứa mã nguồn ReactJS cho user
app/: Chứa mã nguồn FastAPI.
docker-compose.yml: File cấu hình Docker Compose.

3.3. Cài đặt Docker và Docker Compose
Cài đặt Docker: Tải và cài đặt từ trang chủ Docker.
Cài đặt Docker Compose: Thường đi kèm với Docker Desktop, nếu không, có thể cài đặt từ trang chủ Docker Compose.

3.4. Bật Telnet
3.4.1. Trên hệ điều hành Windows:

Mở Control Panel.
Chọn Programs > Programs and Features.
Chọn Turn Windows features on or off.
Tích chọn Telnet Client và nhấn OK.
3.4.2. Trên hệ điều hành Linux:

Cài đặt Telnet bằng lệnh:
sudo apt-get install telnet  # Trên Ubuntu/Debian
sudo yum install telnet  # Trên CentOS/RHEL
3.4.3.Trên hệ điều hành macOS:

Cài đặt Telnet bằng Homebrew:
brew install telnet

3.5. Tạo biến môi trường 
cd ./app
tạo 1 file .env với nội dung:

DB_NAME="DATABASE_NAME"
MONGO_URI="mongodb://mongodb:27017"
DISCOUNT_RATE_FOR_SHIPPERS=0.0  # Giá trị mẫu: 0.0 (0%)
SECRET_KEY="YOUR_SECRET_KEY"
ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES=30  # Giá trị mẫu: 30 phút
EMAIL_SERVER="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_TIMEOUT=60  # Giá trị mẫu: 60 giây
SENDER_EMAIL="your_email@example.com"
SENDER_PASSWORD="your_email_password"

3.6. Chạy ứng dụng với Docker Compose
Xây dựng và chạy các container:
docker-compose up --build

3.7. Truy cập ứng dụng
Frontend: 
	user: Truy cập http://localhost:5174 để sử dụng giao diện người dùng dành cho khách hàng (customer) và người giao hàng (shipper).
	admin: Truy cập http://localhost:5173 để sử dụng giao diện người dùng dành cho chủ nhà hàng/quản lí.

Backend: Truy cập http://localhost:8000/docs (hoặc link postman bên dưới) để xem tài liệu API.

Kết nối với cơ sở dữ liệu (dành cho nhà phát triển)
MongoDB: Có thể kết nối với MongoDB bằng cách sử dụng công cụ như MongoDB Compass hoặc dòng lệnh MongoDB.
URL kết nối: mongodb://localhost:27017

3.8 Tài liệu api
Truy cập link postman: 