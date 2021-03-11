#FROM amazon/aws-lambda-nodejs:12
FROM public.ecr.aws/lambda/nodejs:12
COPY handler.js package*.json ./
#RUN apt-get update && apt-get install bash
RUN npm install
CMD [ "handler.test1" ]
