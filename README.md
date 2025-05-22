> 🔖 Created by [Jaladhanki Aarathi](mailto:jvsaarathi@gmail.com) • MIT Licensed • Credit required


NGO-Volunteer-Dashboard


NGO-Volunteer Dashboard is a platform where NGOs can post projects and hire volunteers. It allows NGOs to manage volunteer applications and helps volunteers find and apply to meaningful opportunities that match their interests and skills.

NGO-Volunteer Dashboard – Project Setup
📦 Server Setup:

cd server
npm i
npm run dev

Client Setup:

cd client
npm i
npm run dev


⚠️ Environment Variables
Make sure to update the .env file in the server/ directory with your own API keys and credentials:


```MONGO_URI=""
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
```

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


ScreenShots:
HomePage:
![image](https://github.com/user-attachments/assets/b6cb5da8-4036-410d-8cb6-8bc784dd18f5)

Authentication 
![image](https://github.com/user-attachments/assets/cbfeff19-3794-48d8-a685-17225dd64cbf)
![image](https://github.com/user-attachments/assets/964eb428-bee0-42cf-8471-d1cbcda21243)

Home:
![image](https://github.com/user-attachments/assets/3d69abeb-2b94-4443-abe7-5077013d88c5)

FindWork:
![image](https://github.com/user-attachments/assets/176c6ffe-3050-4dbf-9729-da45d39eb9bf)

ApplyJobs:
![image](https://github.com/user-attachments/assets/38ee07ea-e726-4da6-8ec5-eae960f8987a)

Post ajob:
![image](https://github.com/user-attachments/assets/af733d28-e8b3-4991-bc7d-1d5fdb45781f)

MyJobs:
![image](https://github.com/user-attachments/assets/a95bec15-6671-4aef-870a-e599339dcedb)

post A Project:
![image](https://github.com/user-attachments/assets/4c4d7d2c-b9d7-4234-b5d9-f895285f557c)
![image](https://github.com/user-attachments/assets/71facbe2-9989-4842-b922-bf255329c0c5)

UpdateProfile:
![image](https://github.com/user-attachments/assets/05fd1560-4a19-4141-9cb7-39edfe4595b1)
![image](https://github.com/user-attachments/assets/299868f2-c708-4bae-a63e-e5b8ef6b45e0)

🚧 Status
✅ The code posted so far is fully working.
🚀 The project is still under development and can be further enhanced — for example, by adding PhonePe integration to enable users to donate directly to NGO projects.


## Attribution
This project was created by Jaladhanki Venkata Sai Aarathi. If you use or modify this project, please provide proper credit.

## 🔧 Hire Me
I'm open for freelance work or collaboration. Contact me at: jvsaarathi@gmail.com


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.










