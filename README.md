# React + Vite

- Create a Vite + React project
- Removes unnecessary files and create a hello world app
- Install Tailwind CSS
- Install Daisy UI
- Add navbar component to the app.jsx
- Create Navbar.jsx separate component file
- Install react-router-dom for routing 
- Craete BrowserRouter > Routes > Route = / Body > RouteChilder
- Create a outelet in your Body.jsx Component 
- Create a footer component
- Create a Login Page
- Intall Axios
- Cors - install cors in backend => add middleware to with configuration:origin , credentials:true
- Whenever  you are making Api call so pass axios=> {withcredentials:true} 
- Install Redux Toolkit 
- Install react-redux + @reduxjs/toolkit =>
-  configureStore => Provider  => createSlice => add reducer to store 
- Add Redux devtools in chrome
- Login and see if your data coming properly in store 
- Navbar is update as user is login 
- Refactor our code to add constant file + create a  folder Components 
- You should not acess the other router without login
- if token is not present , redirect to the login
- Logout Feature
- Get the feed and add the feed in redux store
- Build the user card on feed
- Edit Profile Feature
- Show toast message feature on save profile details
- See all my connections 
- Feature- Accept/Reject connection request
- Send/Ignone the userCadrs from the feed 
- Signup new User




Body
    Navbar
    Route = / > Feed
    Route= /login > Login
    Route = /profile > Profile


# Deployment
- Signup on AWS
- Launch Instance
- chmod 400 "devtinder.pem"
- ssh -i "devtinder.pem" ubuntu@ec2-54-167-254-238.compute-1.amazonaws com
- inSTALL Node 
- git clone 
Frontend -
    - npm install 
    - npm run build
    - sudo apt update
    - sudo apt install nginx
    - sudo systemctl start nginx
    - sudo systemctl enable nginx
    - copy code from dist(build folder) to /var/www/html/
    - sudo scp -r  /dist/* /var/www/html/

Backend-
    - npm install
    - npm install pm2 -g
    - pm2 start npm --start
    or
    - pm2 start npm --name "devtinder-backend" -- start
    
    - pm2 logs
    - pm2 list , pm2 flush <name> 
    - pm2 stop <name>, pm2 delete <name>
# Nginx configuration 
    config ngnix - proxy pass 3000 == /api
    -sudo nano /etc/nginx/sites-available/default

    # Proxy API requests to Node.js
    server_name _; add server name
    location /api/ {
        proxy_pass http://localhost:3000;

        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    - sudo system restart neginx

# Update base URL
    - upadate base_url to "/api" in frontend
    - git pull in ubuntu server
    - npm run build
    again deployed
    - sudo scp -r  /dist/* /var/www/html/
