# GSES2_BTC_application

# Info

You can get find out the current exchange rate of bitcoin (BTC) in hryvnia (UAH) with this application
You can add emails and then send info about current price of BTC

# Instruction

1. Install and run Docker(www.docker.com)
2. Go to the program folder
3. Run `docker build . -t genesis_application` to build docker image
4. Run `docker run --rm -e PORT=3000 -e USERNAME=*YOUR_EMAIL* -e PASSWORD=*YOUR_PASSWORD* -p 3000:3000 -d genesis_application` to start docker container
If you want, you can create app password for this application in your Google account / Security / Signing in to Google / App passwords
5. Go to http://localhost:3000/api-docs
