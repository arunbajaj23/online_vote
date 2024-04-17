# online_vote

## Setup

Follow these steps to set up the project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/arunbajaj23/online_vote.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd online_vote
   ```

3. **Install dependencies:**
   ```bash
   npm install
   
4. **Set up database configuration:**
   - Make sure MySQL is already installed on your system.
   - Open the `config/config.json` file.
   - Find the `development` object.
   - Add the following keys and fill in the necessary values:
     ```json
     {
       "development": {
         "username": "your_database_username",
         "password": "your_database_password",
         "host": "your_database_host"
       }
     }
     ```
   - Replace `"your_database_username"`, `"your_database_password"`, and `"your_database_host"` with your actual database credentials and host.

6. **Start the development server:**
   ```bash
   npm start
   ```

7. **Open the project in your browser:**
   ```
   http://localhost:3000
   ```
