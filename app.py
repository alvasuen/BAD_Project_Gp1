# from http import server
# import logging
import boto3
# import express

BUCKET_NAME = "karaoke-gcat"
AWS_REGION_NAME = "ap-southeast-1"
client_s3 = boto3.client("s3", region_name=AWS_REGION_NAME)
resource_s3 = boto3.resource("s3", region_name=AWS_REGION_NAME)

# List all buckets
for bucket in resource_s3.buckets.all():
    pass
    print (bucket.name)

# List all objects in a bucket
# bucket = resource_s3.Bucket(BUCKET_NAME)

# Upload file
# try:
resource_s3.meta.client.upload_file('./uploads/k4V3Mo61fJM.mp4', BUCKET_NAME, 'k4V3Mo61fJM.mp4')

# except logging.error as e:
#     logging.error(e)
    # return False
# return True



# for obj in bucket.objects.all():
#     pass
    # print(obj.key)

#Generate a presigned URL for the S3 object
# presignedURL = client_s3.generate_presigned_url('get_object',Params={'Bucket': BUCKET_NAME,'Key': 'k4V3Mo61fJM.mp4'},ExpiresIn=3600)
# print(presignedURL)


# urlRoute = presignedURL
# urlRoute = __path__.send(server.ts)

# # S3 sql query
# resp = client_s3.select_object_content(
#     Bucket=BUCKET_NAME,
#     Key='hello.txt',
#     Expression="SELECT * FROM s3object s",
#     ExpressionType='SQL',
#     InputSerialization= {'CSV': {'FileHeaderInfo': 'Use'}},
#     OutputSerialization={'CSV': {}}
# )
# # print(resp)
# # print(resp['ResponseMetadata'])
# # print(resp['Payload'])

# for event in resp['Payload']:
#     if 'Records' in event:
#         records = event['Records']['Payload'].decode('utf-8')
#         print(records)