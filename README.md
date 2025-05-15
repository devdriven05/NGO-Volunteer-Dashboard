NGO-Volunteer-Dashboard
NGO-Volunteer Dashboard is a platform where NGOs can post projects and hire volunteers. It allows NGOs to manage volunteer applications and helps volunteers find and apply to meaningful opportunities that match their interests and skills.
NGO-Volunteer Dashboard – Project Setup
📦 Server Setup:

cd server
npm i
npm run dev
💻 Client Setup:
cd client
npm i
npm run dev
⚠️ Environment Variables
Make sure to update the .env file in the server/ directory with your own API keys and credentials:

env
Copy code
MONGO_URI=""
SESSION_SECRET=your_secure_secret
FRONTEND_URL=http://localhost:5173
PORT=4000
NODE_ENV=development

TWILIO_SID=""
TWILIO_PHONE_NUMBER=""
TWILIO_AUTH_TOKEN=""

SMTP_HOST=smtp.gmail.com
SMTP_SERVICE=gmail
SMTP_PORT=465
SMTP_SECURE=true
SMTP_MAIL=""
SMTP_PASSWORD=""

JWT_EXPIRE=7d
JWT_SECRET_KEY=""

COOKIE_EXPIRE=7

GEMINI_API_KEY=""

CLOUD_NAME=""
API_KEY=""
API_SECRET=""

Functionalities of NGO-Volunteer Dashboard
🔐 Authentication
Secure login and signup for NGOs and volunteers.

Role-based access (NGO, Volunteer, Admin).

JWT & session-based authentication.

📌 NGO Features
Post new volunteer projects (with title, description, category, location, and deadline).

View, edit, and delete posted projects.

View applications submitted by volunteers for each project.

Accept or reject volunteer applications.

Manage NGO profile.

👤 Volunteer Features
Create and manage personal profiles (skills, experience, availability).

Browse and search NGO projects.

Apply for projects with a custom message.

View applied projects and their statuses.
C:\Users\jvsaa\OneDrive\Documents\NGO-Volunteer-Dashboard\client\src\JobPost
🛠️ Admin Features
Manage all NGO and volunteer accounts.

Remove inappropriate projects or users.

Monitor dashboard statistics and activity logs.

🔔 Additional Features
Email/SMS notifications using Gmail SMTP and Twilio.

Responsive UI with a modern dashboard layout.

Upload images via Cloudinary.

Gemini API integration for suggestions/recommendations (e.g., matching volunteers to projects).

Password reset via email.

Screenshots:
Home :
![Screenshot 2025-05-15 135552](https://github.com/user-attachments/assets/15683a8d-e587-4706-9201-de4efc2713f3)

Login and Register:
![Screenshot 2025-05-15 135608](https://github.com/user-attachments/assets/ee4b095c-0a71-473e-9188-724c601afcbf)
![Screenshot 2025-05-15 135614](https://github.com/user-attachments/assets/d6ad1123-0007-4264-ae23-7b08f7466925)

Dashboard:
![Screenshot 2025-05-15 135633](https://github.com/user-attachments/assets/18373ca9-fa1e-4885-9fe9-e61b598ddcc0)

findWork:
![Screenshot 2025-05-15 135643](https://github.com/user-attachments/assets/813724f0-75e6-4e9c-9cc2-b91ad529c3ff)

Post work:

![Screenshot 2025-05-15 135649](https://github.com/user-attachments/assets/d5a588e6-6a68-4855-bda3-f142d5a91af5)

MyJobs and saved Jobs:
![Screenshot 2025-05-15 135649](https://github.com/user-attachments/assets/7fb8e894-7688-48ac-a289-181fda17b975)

Update profile:
![Screenshot 2025-05-15 135724](https://github.com/user-attachments/assets/a0176898-3cc2-46a5-865c-bd463ea5c722)
![Screenshot 2025-05-15 135736](https://github.com/user-attachments/assets/47c119a7-c09e-476d-8ff0-62d3fa835d30)

Ngo-project:
![Screenshot 2025-05-15 135712](https://github.com/user-attachments/assets/20ba27ed-0ad6-439a-a440-101e3dc759e5)

Applied Jobs:
![Screenshot 2025-05-15 135753](https://github.com/user-attachments/assets/dac08043-f7f0-46c2-8d49-85dfa1aa7101)

🚧 Status
✅ The code posted so far is fully working.
🚀 The project is s
till under development and can be further enhanced — for example, by adding PhonePe integration to enable users to donate directly to NGO projects.
