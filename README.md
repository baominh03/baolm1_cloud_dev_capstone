## Option 2

Update project 4 to game models
add feature add game, rename, delete game
api_url: https://xy8g2q4blf.execute-api.us-east-1.amazonaws.com/dev/games

## BE deployment
```
cd backend
npm install --save-dev
sls config credentials --provider aws --key <ACCESS_KEY> --secret <SECRET_KEY> --profile serverless
serverless login
sls deploy --verbose --aws-profile serverless
```
after BE completedly done deployment -> get appid
### FE run locally

```
cd client
npm install --save-dev
npm run start
```

## Evidence

### Get game list:
![image](https://github.com/baominh03/baolm1_cloud_dev_capstone/assets/39981269/25924978-cdea-44e4-a56a-ad15196284c3)

### add new game image:
![image](https://github.com/baominh03/baolm1_cloud_dev_capstone/assets/39981269/ccbffc7c-0b34-4334-a262-6e8f0431133c)

### Delete game:
![image](https://github.com/baominh03/baolm1_cloud_dev_capstone/assets/39981269/419996bb-6d2e-4b3f-b7f8-cfa948881248)
