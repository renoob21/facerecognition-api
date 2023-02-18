const {ClarifaiStub, grpc} =  require("clarifai-nodejs-grpc");
// const { response } = require("express");
const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set('authorization', 'Key 957cf272b51e42aabcd09c28329e9aa7')

const handleAPICall = (req, res) => {
    const {image_url} = req.body;
    stub.PostModelOutputs(
        {
            user_app_id: {
                "user_id": 'renoob',
                "app_id": 'my-first-application'
            },
            model_id: 'face-detection',
            inputs: [
                {
                    data: {
                        image: {
                            url: image_url
                        }
                    }
                }
            ]
        }, metadata, (err, response) => {
            if (err) {
                res.status(400).json('API Call Failed');
                return;
            }
            if (response.status.code !== 10000) {
                res.status(400).json('API Call Failed');
                return;
            }
    
            res.json(response)
        }
    )
}

module.exports = {
    handleAPICall: handleAPICall
}
