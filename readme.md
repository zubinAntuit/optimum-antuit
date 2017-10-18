## Use Azure app service editor

1. make code change in the online editor

Your code changes go live as the code changes are saved.

## Use Visual Studio Code

### Build and debug
1. download source code zip and extract source in local folder
2. open the source folder in  Visual Studio Code
3. make code changes
4. download and run [botframework-emulator](https://emulator.botframework.com/)
5. connect the emulator to https://optimum-antuit.azurewebsites.net/api/messages
6. make sure you you ngrok tunneling enabled on your local machine


### Publish back

```
npm run azure-publish
```

## Use continuous integration

If you have setup continuous integration, then your bot will automatically deployed when new changes are pushed to the source repository.



